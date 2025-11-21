import { NextRequest, NextResponse } from 'next/server';
import { PageComponent } from '@/lib/types/component';

/**
 * PHASE 3.1: Serverless API Route for Secure Gemini Calls
 *
 * This API route handles AI generation requests securely.
 * The API key is stored server-side and never exposed to the client.
 */

export async function POST(request: NextRequest) {
  try {
    const { prompt, existingComponents } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured on server' },
        { status: 500 }
      );
    }

    // System prompt that teaches Gemini about component schemas
    const systemPrompt = generateSystemPrompt();

    const userPrompt = existingComponents && existingComponents.length > 0
      ? `Add to this existing page: ${JSON.stringify(existingComponents)}. User request: ${prompt}`
      : `Create a new page: ${prompt}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUSER REQUEST: ${userPrompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: `Gemini API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json(
        { error: 'No response from Gemini' },
        { status: 500 }
      );
    }

    // Parse and validate the JSON
    const cleanedText = generatedText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const components: PageComponent[] = JSON.parse(cleanedText);

    // Validate components
    if (!Array.isArray(components)) {
      throw new Error('Response is not an array');
    }

    for (const comp of components) {
      if (!comp.id || !comp.type || comp.order === undefined || !comp.props) {
        throw new Error('Invalid component structure');
      }
    }

    return NextResponse.json({
      success: true,
      components,
    });
  } catch (error) {
    console.error('Error in AI generation:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

function generateSystemPrompt(): string {
  return `You are a JSON Generator for a visual website builder. Your ONLY job is to output valid JSON arrays of components.

AVAILABLE COMPONENTS:
- Hero: Main hero section with title, subtitle, CTA buttons
- Navbar: Navigation bar with logo and menu items
- Features: Grid of features with icons and descriptions
- CTA: Call-to-action section
- Footer: Footer with links and social media
- Pricing: Pricing tiers with features
- Form: Contact or signup form
- Testimonials: Customer testimonials
- Stats: Statistics display
- Newsletter: Newsletter signup
- FAQ: Frequently asked questions

RULES:
1. Output ONLY a JSON array of components
2. Each component MUST have: id (unique), type, order (number), props (object)
3. NO explanations, markdown, or text outside JSON
4. Generate IDs like: "hero-1", "navbar-1", etc.
5. Order starts from 0 and increments

EXAMPLE:
[
  {
    "id": "navbar-1",
    "type": "Navbar",
    "order": 0,
    "props": {
      "logo": "Brand",
      "menuItems": "Home,About,Contact",
      "ctaText": "Sign Up",
      "ctaUrl": "#signup",
      "transparent": true
    }
  },
  {
    "id": "hero-1",
    "type": "Hero",
    "order": 1,
    "props": {
      "title": "Welcome",
      "subtitle": "Build amazing things",
      "ctaText": "Get Started",
      "ctaUrl": "#start",
      "align": "center",
      "backgroundStyle": "gradient"
    }
  }
]`;
}
