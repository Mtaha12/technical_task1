import { generateContent } from '@/lib/mockApi';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, style, aspectRatio, quality, type } = body;

    if (!prompt || prompt.trim() === '') {
      return new Response(
        JSON.stringify({ success: false, error: 'A creative prompt is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await generateContent({
      prompt,
      style,
      aspectRatio,
      quality,
      type
    });

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'An internal generation error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
