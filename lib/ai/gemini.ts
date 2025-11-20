import { PageComponent, ComponentType } from '@/lib/types/component';
import { COMPONENT_REGISTRY } from '@/lib/registry/component-registry';

/**
 * PHASE 2.1: AI Integration for Structured JSON Generation
 *
 * This module integrates with Google Gemini to generate page layouts
 * from natural language descriptions.
 */

interface GenerateLayoutRequest {
  prompt: string;
  existingComponents?: PageComponent[];
}

interface GenerateLayoutResponse {
  success: boolean;
  components?: PageComponent[];
  error?: string;
}

/**
 * System prompt that teaches Gemini about our component schema
 */
const SYSTEM_PROMPT = `You are a JSON Generator for a visual website builder. Your ONLY job is to output valid JSON arrays of components.

AVAILABLE COMPONENTS AND THEIR SCHEMAS:
${JSON.stringify(
  Object.values(COMPONENT_REGISTRY).map((comp) => ({
    type: comp.type,
    description: comp.description,
    properties: comp.properties,
    defaultProps: comp.defaultProps,
  })),
  null,
  2
)}

RULES:
1. You MUST output ONLY a JSON array of components
2. Each component MUST have: id (unique string), type (from available components), order (number), props (matching the schema)
3. DO NOT include explanations, markdown, or any text outside the JSON
4. Generate IDs like: "hero-1", "navbar-1", "features-1", etc.
5. Order numbers should start from 0 and increment
6. Props MUST match the component's schema exactly

EXAMPLE OUTPUT:
[
  {
    "id": "navbar-1",
    "type": "Navbar",
    "order": 0,
    "props": {
      "logo": "Brand Name",
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
      "title": "Welcome to Our Platform",
      "subtitle": "Build amazing things",
      "ctaText": "Get Started",
      "ctaUrl": "#start",
      "align": "center",
      "backgroundStyle": "gradient"
    }
  }
]`;

/**
 * Generate page layout from natural language using Gemini AI
 * In production, this should call a serverless function (Phase 3.1)
 */
export async function generateLayout({
  prompt,
  existingComponents = [],
}: GenerateLayoutRequest): Promise<GenerateLayoutResponse> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: 'Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.',
      };
    }

    const userPrompt = existingComponents.length > 0
      ? `Add to this existing page: ${JSON.stringify(existingComponents)}. User request: ${prompt}`
      : `Create a new page: ${prompt}`;

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
                  text: `${SYSTEM_PROMPT}\n\nUSER REQUEST: ${userPrompt}`,
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
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No response from Gemini');
    }

    // Parse the JSON from the response
    // Clean up any markdown code blocks
    const cleanedText = generatedText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const components: PageComponent[] = JSON.parse(cleanedText);

    // Validate the components
    if (!Array.isArray(components)) {
      throw new Error('Response is not an array');
    }

    for (const comp of components) {
      if (!comp.id || !comp.type || comp.order === undefined || !comp.props) {
        throw new Error('Invalid component structure');
      }
    }

    return {
      success: true,
      components,
    };
  } catch (error) {
    console.error('Error generating layout:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Generate a single component from a description
 */
export async function generateComponent(
  type: ComponentType,
  description: string
): Promise<{ success: boolean; component?: PageComponent; error?: string }> {
  const schema = COMPONENT_REGISTRY[type];
  if (!schema) {
    return { success: false, error: 'Invalid component type' };
  }

  try {
    const prompt = `Generate a single ${type} component with these requirements: ${description}`;
    const result = await generateLayout({ prompt });

    if (!result.success || !result.components || result.components.length === 0) {
      return { success: false, error: result.error || 'Failed to generate component' };
    }

    return {
      success: true,
      component: result.components[0],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
