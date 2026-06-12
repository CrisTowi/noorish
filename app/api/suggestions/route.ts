/**
 * Noorish — AI Smart Shopping Suggestions API Route
 *
 * Secure proxy that keeps ANTHROPIC_API_KEY server-side only.
 * Set ANTHROPIC_API_KEY in Vercel environment variables.
 *
 * The ShopScreen client posts to /api/suggestions; this route
 * forwards the request to the Anthropic API and returns the
 * response. The key never leaves the server.
 */

export const dynamic = 'force-dynamic';

interface AnthropicResponse {
  content?: { text?: string }[];
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as AnthropicResponse;
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { error: 'Failed to contact Anthropic API' },
      { status: 500 }
    );
  }
}
