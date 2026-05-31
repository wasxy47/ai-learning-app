import { Module } from '@/types';

export const MODULES: Module[] = [
  // ─── 1. Python Basics ────────────────────────────────────────────────────
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Learn the fundamentals of Python programming — variables, loops, functions, and more.',
    icon: '🐍',
    color: 'from-emerald-500 to-lime-600',
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

  // ─── 2. Web Development ────────────────────────────────────────────────
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Master HTML, CSS, and JavaScript to build beautiful, interactive websites.',
    icon: '🌐',
    color: 'from-sky-500 to-cyan-700',
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

  // ─── 3. AI Fundamentals ────────────────────────────────────────────────
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Explore the core concepts of Artificial Intelligence, machine learning, and neural networks.',
    icon: '🤖',
    color: 'from-rose-500 to-amber-600',
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

  // ─── 4. Data Structures & Algorithms ──────────────────────────────────
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    description: 'Master arrays, linked lists, stacks, queues, trees, and essential algorithms for coding interviews.',
    icon: '🧮',
    color: 'from-violet-500 to-purple-700',
    lessons: [
      {
        id: 'dsa-lesson-1',
        title: 'Arrays & Linked Lists',
        content: `Arrays and Linked Lists are the two most fundamental data structures.

**Arrays:**
\`\`\`python
# Array (Python list)
arr = [10, 20, 30, 40, 50]
print(arr[0])    # Access: O(1) → 10
arr.append(60)   # Insert at end: O(1)
arr.pop(2)       # Delete at index: O(n)

# Common operations
arr.sort()       # Sort: O(n log n)
arr.reverse()    # Reverse: O(n)
print(len(arr))  # Length: O(1)
\`\`\`

**Time Complexity of Arrays:**
| Operation | Time |
|-----------|------|
| Access    | O(1) |
| Search    | O(n) |
| Insert    | O(n) |
| Delete    | O(n) |

**Linked Lists:**
Each node stores data and a pointer to the next node.
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
\`\`\`

**When to Use What:**
- **Array:** Need fast random access, fixed size data
- **Linked List:** Frequent insertions/deletions, dynamic size`,
      },
      {
        id: 'dsa-lesson-2',
        title: 'Stacks, Queues & Hash Maps',
        content: `These structures are used in countless real-world problems.

**Stack (LIFO — Last In, First Out):**
\`\`\`python
stack = []
stack.append(1)    # Push → [1]
stack.append(2)    # Push → [1, 2]
stack.append(3)    # Push → [1, 2, 3]
top = stack.pop()  # Pop → 3, stack = [1, 2]
print(stack[-1])   # Peek → 2
\`\`\`
*Use cases:* Undo/redo, browser history, function call stack

**Queue (FIFO — First In, First Out):**
\`\`\`python
from collections import deque

queue = deque()
queue.append(1)       # Enqueue → [1]
queue.append(2)       # Enqueue → [1, 2]
front = queue.popleft()  # Dequeue → 1, queue = [2]
\`\`\`
*Use cases:* Task scheduling, BFS, print queues

**Hash Map / Dictionary:**
\`\`\`python
# O(1) average for all operations
phone_book = {}
phone_book["Alice"] = "555-0101"   # Insert
phone_book["Bob"] = "555-0102"     # Insert
print(phone_book["Alice"])          # Access → "555-0101"
del phone_book["Bob"]               # Delete

# Check existence
if "Alice" in phone_book:
    print("Found!")

# Common pattern: frequency count
def count_chars(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq
\`\`\`

Hash Maps are O(1) average for insert, delete, and lookup — extremely powerful!`,
      },
      {
        id: 'dsa-lesson-3',
        title: 'Sorting & Searching Algorithms',
        content: `Understanding sorting and searching is essential for algorithm design.

**Binary Search — O(log n):**
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid        # Found!
        elif arr[mid] < target:
            left = mid + 1    # Search right half
        else:
            right = mid - 1   # Search left half
    return -1  # Not found

# Array MUST be sorted
arr = [1, 3, 5, 7, 9, 11]
print(binary_search(arr, 7))   # → 3 (index)
print(binary_search(arr, 4))   # → -1 (not found)
\`\`\`

**Sorting Algorithms Comparison:**
| Algorithm     | Best    | Average   | Worst   | Space |
|---------------|---------|-----------|---------|-------|
| Bubble Sort   | O(n)    | O(n²)     | O(n²)   | O(1)  |
| Merge Sort    | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort    | O(n log n) | O(n log n) | O(n²)  | O(log n) |
| Python sort() | O(n)    | O(n log n) | O(n log n) | O(n) |

**Merge Sort (divide and conquer):**
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

**Big O Notation Quick Reference:**
- O(1) — Constant: Best possible
- O(log n) — Logarithmic: Binary search
- O(n) — Linear: Single loop
- O(n log n) — Linearithmic: Efficient sorting
- O(n²) — Quadratic: Nested loops`,
      },
    ],
    quiz: [
      {
        id: 'dsa-q1',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctIndex: 2,
      },
      {
        id: 'dsa-q2',
        question: 'Which data structure follows the FIFO (First In, First Out) principle?',
        options: ['Stack', 'Queue', 'Array', 'Hash Map'],
        correctIndex: 1,
      },
      {
        id: 'dsa-q3',
        question: 'What is the time complexity of Binary Search on a sorted array?',
        options: ['O(n)', 'O(n²)', 'O(1)', 'O(log n)'],
        correctIndex: 3,
      },
    ],
  },

  // ─── 5. React.js Fundamentals ─────────────────────────────────────────
  {
    id: 'react-fundamentals',
    title: 'React.js Fundamentals',
    description: 'Build modern user interfaces with React — components, state, hooks, and the component lifecycle.',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-600',
    lessons: [
      {
        id: 'react-lesson-1',
        title: 'Components & JSX',
        content: `React is a JavaScript library for building user interfaces using reusable components.

**Your First Component:**
\`\`\`jsx
// Function Component (modern approach)
function Welcome({ name, age }) {
  return (
    <div className="card">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Usage
function App() {
  return (
    <div>
      <Welcome name="Alice" age={25} />
      <Welcome name="Bob" age={30} />
    </div>
  );
}
\`\`\`

**JSX Rules:**
1. Always return a single root element (or use \`<></>\` Fragment)
2. Use \`className\` instead of \`class\`
3. Self-close empty tags: \`<img />\`, \`<input />\`
4. JavaScript expressions go in \`{}\`

**Props (Properties):**
\`\`\`jsx
function Button({ label, color = "blue", onClick }) {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Usage
<Button label="Click Me" color="purple" onClick={() => alert("Clicked!")} />
\`\`\`

Props flow **down** from parent to child — this is called "one-way data flow".`,
      },
      {
        id: 'react-lesson-2',
        title: 'useState & useEffect Hooks',
        content: `Hooks let you add state and lifecycle features to function components.

**useState — Managing State:**
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);  // Initial value: 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
\`\`\`

**useState with Objects:**
\`\`\`jsx
function UserForm() {
  const [user, setUser] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,                    // Keep other fields
      [e.target.name]: e.target.value  // Update changed field
    }));
  };

  return (
    <form>
      <input name="name" value={user.name} onChange={handleChange} />
      <input name="email" value={user.email} onChange={handleChange} />
    </form>
  );
}
\`\`\`

**useEffect — Side Effects:**
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Runs after render when userId changes
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));

    // Cleanup function (runs before re-render or unmount)
    return () => {
      // Cancel requests, clear timers, etc.
    };
  }, [userId]);  // Dependency array

  if (!user) return <p>Loading...</p>;
  return <p>{user.name}</p>;
}
\`\`\`

**useEffect Dependency Array:**
- \`[]\` — Run once after first render
- \`[value]\` — Run when \`value\` changes
- No array — Run after every render`,
      },
      {
        id: 'react-lesson-3',
        title: 'Lists, Conditionals & Event Handling',
        content: `Rendering dynamic content is core to React development.

**Rendering Lists:**
\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Always use a unique key prop!
const todos = [
  { id: 1, text: "Learn React", done: true },
  { id: 2, text: "Build a project", done: false },
];
\`\`\`

**Conditional Rendering:**
\`\`\`jsx
function Greeting({ isLoggedIn, username }) {
  // Method 1: Ternary
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}

      {/* Method 2: && operator (show if true) */}
      {isLoggedIn && <button>Log Out</button>}
    </div>
  );
}
\`\`\`

**Event Handling:**
\`\`\`jsx
function Form() {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload
    console.log('Submitted:', value);
    setValue('');  // Clear input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

React events use camelCase: \`onClick\`, \`onChange\`, \`onSubmit\`, \`onKeyDown\`.`,
      },
    ],
    quiz: [
      {
        id: 'react-q1',
        question: 'What hook is used to add state to a functional component in React?',
        options: ['useEffect', 'useContext', 'useState', 'useReducer'],
        correctIndex: 2,
      },
      {
        id: 'react-q2',
        question: 'What is the correct attribute to use instead of "class" in JSX?',
        options: ['class', 'cssClass', 'className', 'styleClass'],
        correctIndex: 2,
      },
      {
        id: 'react-q3',
        question: 'What does an empty dependency array [] in useEffect mean?',
        options: [
          'Run after every render',
          'Run once after the first render',
          'Never run',
          'Run only when the component unmounts',
        ],
        correctIndex: 1,
      },
    ],
  },

  // ─── 6. Database & SQL ─────────────────────────────────────────────────
  {
    id: 'database-sql',
    title: 'Database & SQL',
    description: 'Learn relational databases, SQL queries, joins, indexes, and data modeling with real examples.',
    icon: '🗄️',
    color: 'from-orange-500 to-red-600',
    lessons: [
      {
        id: 'sql-lesson-1',
        title: 'SQL Basics & CRUD Operations',
        content: `SQL (Structured Query Language) is used to manage and query relational databases.

**Creating Tables:**
\`\`\`sql
-- Create a users table
CREATE TABLE users (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    age        INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a posts table
CREATE TABLE posts (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(200) NOT NULL,
    content    TEXT,
    user_id    INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

**CRUD Operations:**
\`\`\`sql
-- CREATE: Insert data
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 28);

INSERT INTO users (name, email, age) VALUES
    ('Bob',   'bob@example.com',   32),
    ('Carol', 'carol@example.com', 25);

-- READ: Query data
SELECT * FROM users;                    -- All columns
SELECT name, email FROM users;         -- Specific columns
SELECT * FROM users WHERE age > 25;   -- Filter
SELECT * FROM users ORDER BY age DESC; -- Sort
SELECT * FROM users LIMIT 10;          -- Limit results

-- UPDATE: Modify data
UPDATE users SET age = 29 WHERE name = 'Alice';
UPDATE users SET email = 'new@email.com' WHERE id = 1;

-- DELETE: Remove data
DELETE FROM users WHERE id = 3;
DELETE FROM users WHERE age < 18;  -- Be careful with WHERE!
\`\`\`

**Filtering with WHERE:**
\`\`\`sql
-- Comparison operators
SELECT * FROM users WHERE age >= 25 AND age <= 35;
SELECT * FROM users WHERE name = 'Alice' OR name = 'Bob';
SELECT * FROM users WHERE name LIKE 'A%';   -- Starts with A
SELECT * FROM users WHERE email IS NOT NULL;
\`\`\``,
      },
      {
        id: 'sql-lesson-2',
        title: 'JOINs & Relationships',
        content: `JOINs combine data from multiple tables — the most powerful SQL feature.

**Types of JOINs:**
\`\`\`sql
-- INNER JOIN: Only matching rows from both tables
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN: All users, even those without posts
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- Multiple JOINs
SELECT
    u.name AS author,
    p.title AS post_title,
    c.content AS comment
FROM users u
JOIN posts p ON u.id = p.user_id
JOIN comments c ON p.id = c.post_id
WHERE u.id = 1;
\`\`\`

**Aggregation Functions:**
\`\`\`sql
-- COUNT, SUM, AVG, MIN, MAX
SELECT COUNT(*) FROM users;                    -- Total users
SELECT AVG(age) FROM users;                    -- Average age
SELECT MAX(age), MIN(age) FROM users;          -- Age range

-- GROUP BY: Aggregate per group
SELECT user_id, COUNT(*) AS post_count
FROM posts
GROUP BY user_id
ORDER BY post_count DESC;

-- HAVING: Filter after grouping
SELECT user_id, COUNT(*) AS post_count
FROM posts
GROUP BY user_id
HAVING COUNT(*) > 5;  -- Only users with more than 5 posts
\`\`\`

**Subqueries:**
\`\`\`sql
-- Find users who have at least one post
SELECT name FROM users
WHERE id IN (
    SELECT DISTINCT user_id FROM posts
);

-- Find the most active user
SELECT name FROM users
WHERE id = (
    SELECT user_id FROM posts
    GROUP BY user_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);
\`\`\``,
      },
      {
        id: 'sql-lesson-3',
        title: 'Indexes, Transactions & Best Practices',
        content: `Optimize your database for performance and reliability.

**Indexes — Speed Up Queries:**
\`\`\`sql
-- Without index: Full table scan O(n)
SELECT * FROM users WHERE email = 'alice@example.com';

-- Create an index (speeds up lookup to O(log n))
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Composite index (for queries using both columns)
CREATE INDEX idx_name_age ON users(name, age);

-- View indexes
SHOW INDEXES FROM users;

-- Drop an index
DROP INDEX idx_users_email ON users;
\`\`\`

**Transactions — Ensure Data Integrity:**
\`\`\`sql
-- Transfer money between accounts safely
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- Debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- Credit

-- If everything is OK, commit
COMMIT;

-- If anything goes wrong, rollback
ROLLBACK;
\`\`\`

**Database Design Best Practices:**
1. **Normalization** — Avoid duplicate data
   - 1NF: Each column has atomic values
   - 2NF: All non-key columns depend on the whole primary key
   - 3NF: No transitive dependencies

2. **Always use indexes** on:
   - Primary keys (automatic)
   - Foreign keys
   - Columns used in WHERE, JOIN, ORDER BY

3. **Use appropriate data types:**
\`\`\`sql
-- Good
age     TINYINT UNSIGNED    -- Saves space for 0-255
price   DECIMAL(10, 2)      -- Exact for money
is_active BOOLEAN           -- True/False

-- Avoid
age     VARCHAR(10)         -- Wrong type for numbers
price   FLOAT               -- Imprecise for money
\`\`\`

4. **Use transactions** for multi-step operations
5. **Never store passwords** in plain text — use hashing (bcrypt)`,
      },
    ],
    quiz: [
      {
        id: 'sql-q1',
        question: 'Which SQL keyword is used to filter results based on a condition?',
        options: ['FILTER', 'WHERE', 'HAVING', 'CONDITION'],
        correctIndex: 1,
      },
      {
        id: 'sql-q2',
        question: 'Which JOIN type returns all rows from the left table, even if there is no match in the right table?',
        options: ['INNER JOIN', 'RIGHT JOIN', 'FULL JOIN', 'LEFT JOIN'],
        correctIndex: 3,
      },
      {
        id: 'sql-q3',
        question: 'What is the purpose of an INDEX in a database?',
        options: [
          'To create a backup of the table',
          'To enforce unique constraints',
          'To speed up data retrieval queries',
          'To link two tables together',
        ],
        correctIndex: 2,
      },
    ],
  },

  // ─── 7. Git & Version Control ─────────────────────────────────────────
  {
    id: 'git-version-control',
    title: 'Git & Version Control',
    description: 'Master Git for tracking code changes, collaborating with teams, and managing project history.',
    icon: '🔀',
    color: 'from-slate-500 to-gray-700',
    lessons: [
      {
        id: 'git-lesson-1',
        title: 'Git Basics & Core Concepts',
        content: `Git is a distributed version control system that tracks changes in your code over time.

**Core Concepts:**
- **Repository (repo)** — A folder tracked by Git
- **Commit** — A snapshot of your code at a point in time
- **Branch** — An independent line of development
- **Remote** — A copy of the repo on a server (e.g., GitHub)

**Setup & First Repository:**
\`\`\`bash
# Configure Git (one time setup)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Initialize a new repository
git init my-project
cd my-project

# Clone an existing repository
git clone https://github.com/user/repo.git
\`\`\`

**The Three States of Git:**
\`\`\`
Working Directory → Staging Area → Repository (History)
    (modified)          (staged)       (committed)
\`\`\`

**Basic Workflow:**
\`\`\`bash
# Check status of your files
git status

# Stage specific files
git add index.html
git add src/

# Stage ALL changes
git add .

# Commit with a message
git commit -m "Add navigation menu"

# See commit history
git log --oneline
\`\`\`

**Writing Good Commit Messages:**
\`\`\`bash
# ✅ Good commits (clear and specific)
git commit -m "Add user authentication with JWT"
git commit -m "Fix: button click not working on mobile"
git commit -m "Update: improve performance of search query"

# ❌ Bad commits (vague)
git commit -m "fix"
git commit -m "changes"
git commit -m "asdf"
\`\`\``,
      },
      {
        id: 'git-lesson-2',
        title: 'Branches & Merging',
        content: `Branches let you work on features independently without breaking the main code.

**Working with Branches:**
\`\`\`bash
# List all branches (* = current)
git branch

# Create a new branch
git branch feature/login

# Switch to a branch
git checkout feature/login

# Create AND switch in one command (modern)
git checkout -b feature/signup
# or
git switch -c feature/payment

# See which branch you're on
git status
\`\`\`

**Merging Branches:**
\`\`\`bash
# Switch to the branch you want to merge INTO
git checkout main

# Merge your feature branch
git merge feature/login

# Delete the branch after merging
git branch -d feature/login
\`\`\`

**Merge Conflicts:**
When two branches change the same line, Git shows a conflict:
\`\`\`
<<<<<<< HEAD (your current branch)
const color = "blue";
=======
const color = "red";
>>>>>>> feature/login (the branch being merged)
\`\`\`

To resolve: Edit the file → keep the correct version → stage and commit:
\`\`\`bash
# After resolving the conflict in the file:
git add conflicted-file.js
git commit -m "Resolve merge conflict in color variable"
\`\`\`

**Branch Naming Conventions:**
\`\`\`
main / master     → Production code
develop           → Integration branch
feature/login     → New feature
fix/bug-123       → Bug fix
hotfix/crash      → Emergency fix
release/v2.0      → Release preparation
\`\`\``,
      },
      {
        id: 'git-lesson-3',
        title: 'GitHub & Remote Collaboration',
        content: `GitHub is a cloud platform to host Git repositories and collaborate with teams.

**Working with Remotes:**
\`\`\`bash
# Add a remote (usually done once)
git remote add origin https://github.com/user/repo.git

# See all remotes
git remote -v

# Push code to remote
git push origin main
git push origin feature/login   # Push a feature branch

# Pull latest changes
git pull origin main

# Fetch without merging
git fetch origin
\`\`\`

**The Pull Request (PR) Workflow:**
1. **Fork** or clone the repository
2. Create a **feature branch**
3. Make your changes and **commit**
4. **Push** the branch to GitHub
5. Open a **Pull Request** on GitHub
6. Team reviews and **merges** the PR

\`\`\`bash
# Full workflow example
git checkout -b feature/dark-mode
# ... make changes ...
git add .
git commit -m "Add dark mode toggle"
git push origin feature/dark-mode
# → Open Pull Request on GitHub
\`\`\`

**Undoing Mistakes:**
\`\`\`bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) ⚠️ Destructive!
git reset --hard HEAD~1

# Revert a specific commit (safe for shared branches)
git revert abc1234

# Unstage a file
git restore --staged filename.js

# Discard local changes to a file
git restore filename.js

# Stash changes temporarily
git stash
git stash pop   # Restore stashed changes
\`\`\`

**Useful Git Commands:**
\`\`\`bash
git log --oneline --graph --all  # Visual branch history
git diff                          # See unstaged changes
git diff --staged                 # See staged changes
git blame filename.js             # See who changed each line
git shortlog -s -n                # Commit count per author
\`\`\``,
      },
    ],
    quiz: [
      {
        id: 'git-q1',
        question: 'What Git command stages all changes in the current directory?',
        options: ['git commit -a', 'git stage .', 'git add .', 'git push .'],
        correctIndex: 2,
      },
      {
        id: 'git-q2',
        question: 'What is a "Pull Request" in GitHub?',
        options: [
          'Downloading code from a remote repository',
          'A request to merge your branch into another branch for review',
          'Pulling the latest changes from main',
          'A request to delete a branch',
        ],
        correctIndex: 1,
      },
      {
        id: 'git-q3',
        question: 'Which command creates AND switches to a new branch in one step?',
        options: ['git branch new-branch', 'git switch new-branch', 'git checkout -b new-branch', 'git new new-branch'],
        correctIndex: 2,
      },
    ],
  },

  // ─── 8. TypeScript Basics ─────────────────────────────────────────────
  {
    id: 'typescript-basics',
    title: 'TypeScript Basics',
    description: 'Add type safety to your JavaScript — interfaces, generics, union types, and TypeScript best practices.',
    icon: '📘',
    color: 'from-blue-500 to-indigo-700',
    lessons: [
      {
        id: 'ts-lesson-1',
        title: 'Types, Interfaces & Type Aliases',
        content: `TypeScript is a superset of JavaScript that adds static type checking.

**Why TypeScript?**
- Catch errors at compile time (before runtime)
- Better IDE autocomplete and IntelliSense
- Self-documenting code
- Easier refactoring

**Primitive Types:**
\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;
let score: number | null = null;  // Union type

// Type inference (TypeScript figures it out)
let city = "London";  // TypeScript infers: string
let count = 0;        // TypeScript infers: number
\`\`\`

**Arrays & Tuples:**
\`\`\`typescript
const nums: number[] = [1, 2, 3];
const names: string[] = ["Alice", "Bob"];
const mixed: (string | number)[] = ["hello", 42];

// Tuple: fixed-length array with specific types
const point: [number, number] = [10, 20];
const user: [string, number, boolean] = ["Alice", 25, true];
\`\`\`

**Interfaces vs Type Aliases:**
\`\`\`typescript
// Interface (preferred for objects/classes)
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;       // Optional property
  readonly role: string;  // Cannot be changed after creation
}

// Type Alias (preferred for unions, primitives)
type Status = "active" | "inactive" | "pending";
type ID = string | number;
type Callback = (error: Error | null, data: string) => void;

// Using them
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin"
};

const status: Status = "active";  // ✅
const badStatus: Status = "deleted";  // ❌ Error!
\`\`\``,
      },
      {
        id: 'ts-lesson-2',
        title: 'Functions & Generics',
        content: `TypeScript makes functions type-safe and allows powerful generic programming.

**Typed Functions:**
\`\`\`typescript
// Parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Optional and default parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting ?? "Hello"}, \${name}!\`;
}

// Arrow functions
const multiply = (x: number, y: number): number => x * y;

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4));  // → 10
\`\`\`

**Function Overloads:**
\`\`\`typescript
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "number") return value.toFixed(2);
  return value.trim();
}
\`\`\`

**Generics — Reusable Type-Safe Code:**
\`\`\`typescript
// Generic function
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirst([1, 2, 3]);     // Type: number
const firstName = getFirst(["a", "b"]);  // Type: string

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success"
};

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25 };
const name = getProperty(user, "name");  // ✅ "Alice"
const bad  = getProperty(user, "phone"); // ❌ Error!
\`\`\``,
      },
      {
        id: 'ts-lesson-3',
        title: 'Classes, Enums & Utility Types',
        content: `TypeScript enhances classes and provides powerful built-in utility types.

**Classes with Types:**
\`\`\`typescript
class Animal {
  // Access modifiers
  public  name: string;
  private age: number;
  protected species: string;
  readonly id: number;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.id = Math.random();
  }

  // Method with return type
  describe(): string {
    return \`\${this.name} is a \${this.species}\`;
  }

  // Getter / Setter
  get animalAge(): number { return this.age; }
  set animalAge(value: number) {
    if (value < 0) throw new Error("Age cannot be negative");
    this.age = value;
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "dog");
  }

  bark(): void {
    console.log(\`\${this.name} says: Woof!\`);
  }
}
\`\`\`

**Enums:**
\`\`\`typescript
enum Direction { Up, Down, Left, Right }
enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }

const move = Direction.Up;         // → 0
const status = Status.Active;      // → "ACTIVE"
\`\`\`

**Built-in Utility Types:**
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial — all fields optional
type UpdateUser = Partial<User>;

// Required — all fields required (opposite of Partial)
type StrictUser = Required<User>;

// Pick — select specific fields
type PublicUser = Pick<User, "id" | "name">;

// Omit — remove specific fields
type SafeUser = Omit<User, "password">;

// Readonly — prevent mutation
type ImmutableUser = Readonly<User>;

// Record — key-value mapping
type UserMap = Record<string, User>;

// ReturnType — get a function's return type
function getUser() { return { id: 1, name: "Alice" }; }
type UserResult = ReturnType<typeof getUser>;
\`\`\``,
      },
    ],
    quiz: [
      {
        id: 'ts-q1',
        question: 'What TypeScript utility type makes all properties of an interface optional?',
        options: ['Optional<T>', 'Partial<T>', 'Nullable<T>', 'Maybe<T>'],
        correctIndex: 1,
      },
      {
        id: 'ts-q2',
        question: 'What does the "?" mean after a property name in a TypeScript interface?',
        options: [
          'The property is readonly',
          'The property is required',
          'The property is optional',
          'The property can be null',
        ],
        correctIndex: 2,
      },
      {
        id: 'ts-q3',
        question: 'What is a Generic in TypeScript?',
        options: [
          'A type that can only be used with classes',
          'A reusable component that works with multiple types',
          'A built-in TypeScript data type',
          'A way to make all types optional',
        ],
        correctIndex: 1,
      },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}
