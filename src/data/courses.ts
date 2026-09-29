export interface Course {
  courseId: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  category?: string;
  rating?: number;
  level?: string;
  enrolledStudents?: number;
  syllabus?: string[];
  bannerColor?: string;
  accentColor?: string;
}

export const SAMPLE_COURSES: Course[] = [
  {
    courseId: "PY101",
    title: "Python Programming",
    description: "Learn Python programming from beginner to advanced level. Master syntax, data structures, OOP, functional paradigms, and build real-world automation scripts and backend APIs.",
    instructor: "John Smith",
    duration: "8 Weeks",
    lessons: 40,
    category: "Programming",
    rating: 4.9,
    level: "Beginner to Advanced",
    enrolledStudents: 14200,
    syllabus: [
      "Introduction to Python & Setup",
      "Variables, Data Types & Control Flow",
      "Functions, Lambdas & Modular Code",
      "Object-Oriented Programming (OOP)",
      "File I/O, Error Handling & Logging",
      "Working with APIs & JSON",
      "Final Capstone Project: Automation Suite"
    ],
    bannerColor: "from-blue-600 to-indigo-800",
    accentColor: "blue"
  },
  {
    courseId: "WD101",
    title: "Web Development",
    description: "Learn HTML, CSS, and modern JavaScript from the ground up. Build responsive mobile-friendly layouts, master DOM manipulation, and connect with RESTful backend services.",
    instructor: "David Khan",
    duration: "10 Weeks",
    lessons: 50,
    category: "Web & Mobile",
    rating: 4.8,
    level: "Beginner",
    enrolledStudents: 19850,
    syllabus: [
      "Semantic HTML5 & Modern Web Standards",
      "Modern CSS3, Flexbox & CSS Grid",
      "Responsive Layouts & Mobile First Design",
      "Modern JavaScript (ES6+): Promises & Async/Await",
      "DOM Manipulation & Browser Event Handling",
      "Fetch API, RESTful Integration & State",
      "Deploying Web Apps to Production"
    ],
    bannerColor: "from-emerald-600 to-teal-800",
    accentColor: "emerald"
  },
  {
    courseId: "JV101",
    title: "Java Programming",
    description: "Learn Java programming and object-oriented programming. Deep dive into Java Virtual Machine architecture, collections framework, multi-threading, concurrency, and Spring Boot foundations.",
    instructor: "Ali Ahmed",
    duration: "12 Weeks",
    lessons: 60,
    category: "Enterprise Software",
    rating: 4.7,
    level: "Intermediate",
    enrolledStudents: 11300,
    syllabus: [
      "Java Language Basics & Compilation Model",
      "Object-Oriented Paradigms: Inheritance & Polymorphism",
      "Java Collections Framework (Lists, Sets, Maps)",
      "Exception Handling & Robust Application Design",
      "Multithreading, Threads & Executors",
      "Java I/O & Database Connectivity with JDBC",
      "Building Enterprise Services with Spring Boot"
    ],
    bannerColor: "from-amber-600 to-orange-800",
    accentColor: "amber"
  },
  {
    courseId: "KT201",
    title: "Kotlin & Jetpack Compose",
    description: "Build cutting-edge native Android mobile applications with Kotlin, declarative Jetpack Compose UI, Material 3 theming, Navigation Compose, Coroutines, and ViewModel architecture.",
    instructor: "Alex Chen",
    duration: "7 Weeks",
    lessons: 45,
    category: "Android Mobile",
    rating: 4.95,
    level: "Intermediate to Advanced",
    enrolledStudents: 8750,
    syllabus: [
      "Kotlin Language Fundamentals & Idioms",
      "Declarative UI Architecture with Jetpack Compose",
      "State Management, Remember & MutableStateOf",
      "Navigation Compose & Dynamic Route Arguments",
      "Material 3 Design System & Dynamic Theming",
      "Coroutines, Flow & ViewModel Integration",
      "Publishing to Google Play Store"
    ],
    bannerColor: "from-purple-600 to-violet-800",
    accentColor: "purple"
  },
  {
    courseId: "CS102",
    title: "Data Structures & Algorithms",
    description: "Master essential computer science fundamentals: linked lists, trees, graphs, dynamic programming, and complexity analysis to ace technical software engineering interviews.",
    instructor: "Dr. Sarah Connor",
    duration: "14 Weeks",
    lessons: 72,
    category: "Computer Science",
    rating: 4.9,
    level: "Advanced",
    enrolledStudents: 16500,
    syllabus: [
      "Big-O Asymptotic Analysis & Space Complexity",
      "Arrays, Strings & Linked Lists Algorithms",
      "Stacks, Queues & Priority Queues (Heaps)",
      "Binary Search Trees, AVL Trees & Tries",
      "Graph Traversal (BFS, DFS, Dijkstra, A*)",
      "Dynamic Programming & Memoization Techniques",
      "Mock Technical Coding Interviews"
    ],
    bannerColor: "from-rose-600 to-pink-800",
    accentColor: "rose"
  },
  {
    courseId: "AI201",
    title: "Machine Learning Fundamentals",
    description: "Explore supervised and unsupervised machine learning algorithms, deep learning with neural networks, computer vision, natural language processing, and generative AI foundations.",
    instructor: "Elena Rostova",
    duration: "10 Weeks",
    lessons: 48,
    category: "Artificial Intelligence",
    rating: 4.85,
    level: "Intermediate",
    enrolledStudents: 13900,
    syllabus: [
      "Mathematical Foundations: Linear Algebra & Calculus",
      "Data Preprocessing & Feature Engineering with Pandas",
      "Supervised Learning: Regression & Classification",
      "Unsupervised Learning & Clustering",
      "Introduction to Deep Learning & PyTorch",
      "Convolutional Neural Networks for Vision",
      "Model Evaluation, Validation & Deployment"
    ],
    bannerColor: "from-cyan-600 to-blue-800",
    accentColor: "cyan"
  }
];

export function getCourseById(courseId: string): Course | undefined {
  return SAMPLE_COURSES.find(c => c.courseId.trim().toUpperCase() === courseId.trim().toUpperCase());
}
