'use client';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatBubble, { TypingIndicator } from '@/components/ChatBubble';
import { useUserData } from '@/hooks/useUserData';
import { getModuleById } from '@/lib/modules-data';
import { ChatMessage } from '@/types';
import { ArrowLeft, Send, Trophy, RefreshCw, Sparkles } from 'lucide-react';

function ChatContent({ moduleId }: { moduleId: string }) {
  const { userData } = useUserData();
  const learningModule = getModuleById(moduleId);

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    learningModule
      ? [
          {
            role: 'assistant',
            content: `Hi! 👋 I'm your **${learningModule.title}** tutor.\n\nI remember everything we discuss in this session, so feel free to ask follow-up questions and I'll build on our conversation.\n\nWhat would you like to learn today?`,
            timestamp: new Date(),
          },
        ]
      : []
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!learningModule) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <h2 className="mb-2 text-xl font-black" style={{ color: 'var(--ink)' }}>Module not found</h2>
          <Link href="/modules" style={{ color: 'var(--primary)' }}>
            Back to modules
          </Link>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Send FULL conversation history so chatbot remembers everything
      const messagesToSend = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messagesToSend,       // Full history with memory
          message: input.trim(),          // Latest message (for backward compat)
          moduleName: learningModule.title,
          completedLessons: userData?.completedLessons || [],
          weakAreas: userData?.weakAreas || [],
        }),
      });

      const data = await res.json();
      const aiResponse: ChatMessage = {
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not connect to the AI service. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi! 👋 I'm your **${learningModule.title}** tutor.\n\nI remember everything we discuss in this session, so feel free to ask follow-up questions and I'll build on our conversation.\n\nWhat would you like to learn today?`,
        timestamp: new Date(),
      },
    ]);
  };

  const completedInModule = learningModule.lessons.filter((l) =>
    (userData?.completedLessons || []).includes(l.id)
  ).length;

  const suggestedQuestions = [
    `Explain the basics of ${learningModule.title}`,
    'Give me a beginner example',
    'What should I focus on first?',
    "Quiz me on what I've learned",
    'What are the most important concepts?',
    'Show me a practical example',
  ];

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: 'var(--background)', paddingTop: '56px' }}
    >
      {/* ── Top Bar ── */}
      <div
        className="border-b px-4 py-3 backdrop-blur-xl sticky top-14 z-10"
        style={{
          background: 'color-mix(in srgb, var(--paper) 95%, transparent)',
          borderColor: 'var(--line)',
        }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/modules"
              className="flex items-center gap-1.5 text-sm font-bold transition hover:opacity-80"
              style={{ color: 'var(--muted)' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="h-4 w-px" style={{ background: 'var(--line)' }} />
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${learningModule.color} text-lg`}
              >
                {learningModule.icon}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-sm font-black" style={{ color: 'var(--ink)' }}>
                  {learningModule.title} Tutor
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {completedInModule}/{learningModule.lessons.length} lessons complete
                  </p>
                  <span
                    className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background: 'color-mix(in srgb, var(--sage) 12%, transparent)',
                      color: 'var(--sage)',
                    }}
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                    Memory ON
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
              style={{
                borderColor: 'var(--line)',
                background: 'var(--paper-soft)',
                color: 'var(--muted)',
              }}
              title="Clear conversation"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <Link
              href={`/quiz/${moduleId}`}
              className="hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-black transition hover:opacity-80 sm:flex"
              style={{
                borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
                background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <Trophy className="h-3.5 w-3.5" />
              Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-5 px-4 py-6">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Suggested Questions ── */}
      {messages.length === 1 && (
        <div className="mx-auto w-full max-w-4xl px-4 pb-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--muted)' }}>
            Quick Start
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
                className="rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:opacity-80 hover:scale-[1.02]"
                style={{
                  borderColor: 'var(--line)',
                  background: 'var(--paper-soft)',
                  color: 'var(--ink)',
                  transition: 'all 0.15s ease',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Memory Indicator (after some messages) ── */}
      {messages.length > 3 && (
        <div className="mx-auto w-full max-w-4xl px-4 pb-2">
          <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
            💬 {messages.length - 1} messages in memory · Tutor remembers your full conversation
          </p>
        </div>
      )}

      {/* ── Input Bar ── */}
      <div
        className="border-t px-4 py-4"
        style={{
          borderColor: 'var(--line)',
          background: 'color-mix(in srgb, var(--paper) 95%, transparent)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="mx-auto flex max-w-4xl items-end gap-3">
          <textarea
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask anything about ${learningModule.title}... (I remember our conversation!)`}
            rows={1}
            className="max-h-32 min-h-[44px] flex-1 resize-none py-3 pr-4 leading-snug"
            style={{ overflow: input.split('\n').length > 3 ? 'auto' : 'hidden' }}
          />
          <button
            id="send-message-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="primary-action flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs" style={{ color: 'var(--muted)' }}>
          Enter to send · Shift+Enter for new line · Tutor remembers full conversation
        </p>
      </div>
    </div>
  );
}

export default function ChatPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  return (
    <ProtectedRoute>
      <ChatContent moduleId={moduleId} />
    </ProtectedRoute>
  );
}
