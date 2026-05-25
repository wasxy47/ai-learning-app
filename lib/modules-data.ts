import { Module } from '@/types';

export const MODULES: Module[] = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Learn the fundamentals of Python programming — variables, loops, functions, and more.',
    icon: '🐍',
    color: 'from-emerald-500 to-teal-600',
    lessons: [
      {
        id: 'python-basics-lesson-1',
        title: 'Variables & Data Types',
        content: `Python is a dynamically-typed language — you don't need to declare variable types.

**Core Data Types:**
- \`int\` — whole numbers: \`age = 25\`
- \`float\` — decimals: \`price = 9.99\`
- \`str\` — text: \`name = "Alice"\`
- \`bool\` — True/False: \`is_active = True\`
- \`list\` — ordered collection: \`fruits = ["apple", "banana"]\`
- \`dict\` — key-value pairs: \`person = {"name": "Alice", "age": 25}\`

**Type Conversion:**
\`\`\`python
x = "42"
y = int(x)   # Convert string to int
z = float(x) # Convert string to float
\`\`\`

Python uses \`type()\` to check the type of any variable. Dynamic typing makes Python beginner-friendly and highly flexible.`,
      },
      {
        id: 'python-basics-lesson-2',
        title: 'Loops & Control Flow',
        content: `Control flow directs how your program executes.

**If / Elif / Else:**
\`\`\`python
score = 85
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")
\`\`\`

**For Loops:**
\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

**While Loops:**
\`\`\`python
count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`

Use \`break\` to exit early and \`continue\` to skip to the next iteration.`,
      },
      {
        id: 'python-basics-lesson-3',
        title: 'Functions & Modules',
        content: `Functions are reusable blocks of code that perform specific tasks.

**Defining Functions:**
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))         # Hello, Alice!
print(greet("Bob", "Hi"))     # Hi, Bob!
\`\`\`

**Lambda Functions:**
\`\`\`python
square = lambda x: x ** 2
print(square(5))  # 25
\`\`\`

**Modules:**
\`\`\`python
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...

from datetime import datetime
now = datetime.now()
print(now.strftime("%Y-%m-%d"))
\`\`\`

Create your own modules by saving Python code in a \`.py\` file and importing it.`,
      },
    ],
    quiz: [
      {
        id: 'python-q1',
        question: 'Which data type would you use to store the value 3.14?',
        options: ['int', 'float', 'str', 'bool'],
        correctIndex: 1,
      },
      {
        id: 'python-q2',
        question: 'What does the `range(5)` function produce?',
        options: ['1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'],
        correctIndex: 1,
      },
      {
        id: 'python-q3',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'func', 'def', 'define'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Master HTML, CSS, and JavaScript to build beautiful, interactive websites.',
    icon: '🌐',
    color: 'from-blue-500 to-indigo-600',
    lessons: [
      {
        id: 'web-dev-lesson-1',
        title: 'HTML Structure & Semantics',
        content: `HTML (HyperText Markup Language) is the backbone of every webpage.

**Document Structure:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
  </head>
  <body>
    <header>
      <nav>...</nav>
    </header>
    <main>
      <article>...</article>
    </main>
    <footer>...</footer>
  </body>
</html>
\`\`\`

**Semantic Elements:**
- \`<header>\` — page or section header
- \`<nav>\` — navigation links
- \`<main>\` — primary content
- \`<article>\` — self-contained content
- \`<section>\` — thematic grouping
- \`<footer>\` — page footer

Semantic HTML improves accessibility, SEO, and code readability.`,
      },
      {
        id: 'web-dev-lesson-2',
        title: 'CSS Styling & Layouts',
        content: `CSS (Cascading Style Sheets) controls the visual presentation of HTML.

**Selectors & Properties:**
\`\`\`css
/* Class selector */
.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Pseudo-class */
button:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
\`\`\`

**Flexbox Layout:**
\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* horizontal alignment */
  align-items: center;      /* vertical alignment */
  gap: 16px;
}
\`\`\`

**CSS Grid:**
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
\`\`\`

Modern CSS makes complex layouts simple with Flexbox and Grid.`,
      },
      {
        id: 'web-dev-lesson-3',
        title: 'JavaScript & DOM',
        content: `JavaScript adds interactivity to your web pages.

**Variables & Functions:**
\`\`\`javascript
const title = document.getElementById('title');
title.textContent = 'Hello, World!';
title.style.color = '#7c3aed';
\`\`\`

**Event Listeners:**
\`\`\`javascript
const btn = document.querySelector('#myButton');
btn.addEventListener('click', () => {
  alert('Button clicked!');
});
\`\`\`

**Fetch API (async/await):**
\`\`\`javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

JavaScript's DOM API lets you create dynamic, reactive user interfaces without page reloads.`,
      },
    ],
    quiz: [
      {
        id: 'web-q1',
        question: 'Which HTML element represents the main navigation of a page?',
        options: ['<menu>', '<nav>', '<header>', '<section>'],
        correctIndex: 1,
      },
      {
        id: 'web-q2',
        question: 'Which CSS property is used to arrange children in a row or column?',
        options: ['display: block', 'display: inline', 'display: flex', 'display: grid'],
        correctIndex: 2,
      },
      {
        id: 'web-q3',
        question: 'What method adds an event listener to a DOM element?',
        options: ['element.on()', 'element.listen()', 'element.addEventListener()', 'element.attach()'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Explore the core concepts of Artificial Intelligence, machine learning, and neural networks.',
    icon: '🤖',
    color: 'from-violet-500 to-purple-600',
    lessons: [
      {
        id: 'ai-lesson-1',
        title: 'What is Artificial Intelligence?',
        content: `Artificial Intelligence (AI) refers to computer systems that can perform tasks that typically require human intelligence.

**Key Branches of AI:**
- **Machine Learning (ML)** — Systems that learn from data without explicit programming
- **Deep Learning** — ML using neural networks with many layers
- **Natural Language Processing (NLP)** — Understanding and generating human language
- **Computer Vision** — Interpreting visual information from images/video
- **Robotics** — Autonomous physical systems

**Types of AI by Capability:**
1. **Narrow AI** — Designed for a specific task (e.g., chess, image recognition)
2. **General AI (AGI)** — Human-level intelligence across all domains (not yet achieved)
3. **Superintelligence** — Surpasses human intelligence (theoretical)

**Real-World Applications:**
- Recommendation systems (Netflix, Spotify)
- Virtual assistants (Siri, Alexa, Gemini)
- Medical diagnosis
- Autonomous vehicles
- Fraud detection

AI is transforming every industry by automating complex decision-making.`,
      },
      {
        id: 'ai-lesson-2',
        title: 'Machine Learning Basics',
        content: `Machine Learning enables computers to learn patterns from data.

**Types of Machine Learning:**

**1. Supervised Learning**
The model learns from labeled data (input → output pairs).
- Classification: Is this email spam or not?
- Regression: What will the house price be?

**2. Unsupervised Learning**
The model finds patterns in unlabeled data.
- Clustering: Group similar customers together
- Dimensionality Reduction: Simplify data while preserving structure

**3. Reinforcement Learning**
The model learns by trial and error, receiving rewards for good actions.
- Game playing (AlphaGo, OpenAI Five)
- Robotic control

**The ML Pipeline:**
\`\`\`
Data Collection → Data Preprocessing → Feature Engineering
→ Model Training → Model Evaluation → Deployment
\`\`\`

**Key Metrics:**
- Accuracy, Precision, Recall, F1-Score (classification)
- MSE, RMSE, MAE (regression)

Overfitting occurs when a model memorizes training data but fails on new data.`,
      },
      {
        id: 'ai-lesson-3',
        title: 'Neural Networks & LLMs',
        content: `Neural networks are inspired by the human brain and power modern AI.

**How Neural Networks Work:**
\`\`\`
Input Layer → Hidden Layers → Output Layer
   (data)      (transformations)  (predictions)
\`\`\`

Each neuron computes: \`output = activation(weights · inputs + bias)\`

**Common Activation Functions:**
- ReLU: \`max(0, x)\` — most common in hidden layers
- Sigmoid: \`1/(1+e^-x)\` — for binary classification
- Softmax — for multi-class classification

**Large Language Models (LLMs):**
LLMs like GPT-4, Llama, and Gemini are based on the **Transformer** architecture (2017).

Key concepts:
- **Tokens** — pieces of text the model processes
- **Attention** — the model focuses on relevant parts of input
- **Parameters** — billions of learned weights
- **Fine-tuning** — adapting a pretrained model for specific tasks

**Prompt Engineering:**
\`\`\`
System: "You are a helpful coding assistant..."
User: "Explain recursion with an example"
Assistant: "Recursion is when a function calls itself..."
\`\`\`

LLMs power chatbots, code generation, translation, and summarization at massive scale.`,
      },
    ],
    quiz: [
      {
        id: 'ai-q1',
        question: 'Which type of machine learning uses labeled input-output pairs for training?',
        options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Transfer Learning'],
        correctIndex: 2,
      },
      {
        id: 'ai-q2',
        question: 'What architecture powers modern Large Language Models like GPT and Llama?',
        options: ['Convolutional Neural Network', 'Recurrent Neural Network', 'Transformer', 'Autoencoder'],
        correctIndex: 2,
      },
      {
        id: 'ai-q3',
        question: 'What is "overfitting" in machine learning?',
        options: [
          'When the model is too simple to learn patterns',
          'When the model memorizes training data but fails on new data',
          'When training takes too long',
          'When the dataset is too large',
        ],
        correctIndex: 1,
      },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}
