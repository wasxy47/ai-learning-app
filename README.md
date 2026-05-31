# 🧠 LearnAI — AI-Powered Learning Studio

An intelligent learning platform where you can study programming and tech through structured lessons, take quizzes, and chat with an AI tutor that **remembers your full conversation** — just like a real tutor.

Built as part of the **Internee.pk Gen AI Tasks** program.

---

## ✨ Features

- 🤖 **AI Tutor with Memory** — Chatbot powered by Groq (Llama 3.3 70B) that remembers the full conversation history, so follow-up questions work naturally
- 📚 **8 Courses** — Structured lessons with real code examples across popular tech stacks
- 🧩 **Quizzes** — Per-course quizzes that track weak areas and personalize your study plan
- 📊 **Progress Tracking** — Firebase-backed progress saved per user (completed lessons, quiz scores, weak areas)
- 🎨 **Dark / Light Mode** — Fully themed UI with smooth transitions
- 🔐 **Authentication** — Firebase Auth (Email/Password)
- 📱 **Responsive** — Works on mobile, tablet, and desktop

---

## 📚 Courses Available

| # | Course | Topics Covered |
|---|--------|----------------|
| 1 | 🐍 Python Basics | Variables, Loops, Functions, Modules |
| 2 | 🌐 Web Development | HTML, CSS, JavaScript, DOM |
| 3 | 🤖 AI Fundamentals | ML, Neural Networks, LLMs, Transformers |
| 4 | 🧮 Data Structures & Algorithms | Arrays, Stacks, Queues, Sorting, Big O |
| 5 | ⚛️ React.js Fundamentals | Components, JSX, useState, useEffect, Events |
| 6 | 🗄️ Database & SQL | CRUD, JOINs, Indexes, Transactions |
| 7 | 🔀 Git & Version Control | Commits, Branches, GitHub, Pull Requests |
| 8 | 📘 TypeScript Basics | Types, Interfaces, Generics, Utility Types |

Each course has **3 lessons** with code examples + **3 quiz questions**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| AI / LLM | [Groq API](https://groq.com) — Llama 3.3 70B |
| Auth & DB | [Firebase](https://firebase.google.com) (Auth + Firestore) |
| Icons | [Lucide React](https://lucide.dev) |
| Markdown | [React Markdown](https://github.com/remarkjs/react-markdown) + remark-gfm |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/wasxy47/ai-learning-app.git
cd ai-learning-app
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Groq AI API Key (get from https://console.groq.com)
GROQ_API_KEY=your_groq_api_key_here

# Firebase Config (get from Firebase Console > Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Getting API Keys

### Groq API Key
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up / Log in
3. Go to **API Keys** → Create new key
4. Copy and paste into `.env.local`

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database**
5. Go to **Project Settings** → Your apps → Web app config
6. Copy the config values into `.env.local`

---

## 📁 Project Structure

```
ai-learning-app/
├── app/
│   ├── api/
│   │   ├── chat/          # AI chatbot API (Groq LLM)
│   │   ├── quiz-submit/   # Quiz scoring API
│   │   └── study-plan/    # Study plan generator API
│   ├── chat/[moduleId]/   # Per-module AI chat page
│   ├── dashboard/         # User dashboard
│   ├── modules/           # All courses listing
│   ├── quiz/[moduleId]/   # Per-module quiz
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── firebase.ts        # Firebase initialization
│   ├── firestore.ts       # Firestore helpers
│   └── modules-data.ts    # All courses & lessons data
└── types/                 # TypeScript type definitions
```

---

## 🤖 How the AI Chatbot Works

The chatbot sends the **full conversation history** to the Groq API on every message — enabling true multi-turn memory:

```
User: "Explain arrays"
Bot:  "Arrays are ordered collections..."

User: "Give me an example of what you explained"
Bot:  ✅ "Building on what I said about arrays..." ← Remembers!
```

Each course has its own dedicated tutor with course-specific context, lesson summaries, and the student's progress (completed lessons + weak areas) injected into the system prompt.

---

## 📄 License

MIT — feel free to use this project for learning or as a base for your own AI learning app.

---

*Built with ❤️ by [wasxy47](https://github.com/wasxy47)*
