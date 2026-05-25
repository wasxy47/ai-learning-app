// TypeScript interfaces for AI Learning Assistant

export interface UserData {
  email: string;
  completedLessons: string[];
  weakAreas: string[];
  quizScores: Record<string, number>;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
