import { PageComponent } from '@/lib/types/component';

/**
 * Secure client-side wrapper for AI generation
 * Calls serverless API route instead of directly calling Gemini
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

export async function generateLayoutSecure({
  prompt,
  existingComponents = [],
}: GenerateLayoutRequest): Promise<GenerateLayoutResponse> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        existingComponents,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to generate layout',
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}
