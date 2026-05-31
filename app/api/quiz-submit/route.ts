import { NextRequest, NextResponse } from 'next/server';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { userId, moduleName, score } = await req.json();

    if (!userId || !moduleName || score === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userRef = doc(db, 'users', userId);
    const updateData: Record<string, unknown> = {
      [`quizScores.${moduleName}`]: score,
    };

    // Add to weakAreas if score < 60%
    if (score < 60) {
      updateData.weakAreas = arrayUnion(moduleName);
    }

    await updateDoc(userRef, updateData);

    return NextResponse.json({
      success: true,
      isWeak: score < 60,
      message:
        score < 60
          ? `Score of ${score}% recorded. ${moduleName} added to weak areas for focused study.`
          : `Great job! Score of ${score}% recorded for ${moduleName}.`,
    });
  } catch (error) {
    console.error('Quiz submit API error:', error);
    return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
  }
}
