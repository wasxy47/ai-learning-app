import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { weakAreas, completedLessons } = await req.json();

    const prompt = `Based on weak areas: ${weakAreas?.length > 0 ? weakAreas.join(', ') : 'none identified yet'} and completed lessons: ${completedLessons?.length > 0 ? completedLessons.join(', ') : 'none completed yet'}, give a 5-point personalized study plan. 

Format your response as exactly 5 numbered points. Each point should be a specific, actionable study recommendation. Be concise and practical. Start each point directly with the recommendation.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert learning coach. Create concise, actionable study plans. Always respond with exactly 5 numbered points. Keep each point to 1-2 sentences.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 });
    }

    const data = await response.json();
    const rawPlan = data.choices?.[0]?.message?.content || '';

    // Parse the numbered points into an array
    const points = rawPlan
      .split('\n')
      .filter((line: string) => line.trim().match(/^\d+\./))
      .map((line: string) => line.trim())
      .slice(0, 5);

    // Fallback if parsing fails
    if (points.length === 0) {
      const fallback = rawPlan
        .split('\n')
        .filter((line: string) => line.trim().length > 20)
        .slice(0, 5);
      return NextResponse.json({ plan: fallback.length > 0 ? fallback : [rawPlan] });
    }

    return NextResponse.json({ plan: points });
  } catch (error) {
    console.error('Study plan API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
