import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import ClientLayout from '@/components/ClientLayout';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'LearnAI | Focused Learning Studio',
  description:
    'A focused learning studio for Python, web development, and AI fundamentals with guided lessons, quizzes, and an adaptive tutor.',
  keywords:
    'AI learning, personalized education, Python, Web Development, AI Fundamentals, online tutor',
  openGraph: {
    title: 'LearnAI | Focused Learning Studio',
    description:
      'Guided lessons, quizzes, and adaptive tutoring in one calm learning workspace.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="page-bg min-h-screen text-ink flex" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
