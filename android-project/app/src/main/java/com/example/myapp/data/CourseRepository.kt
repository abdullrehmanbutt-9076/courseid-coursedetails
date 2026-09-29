package com.example.myapp.data

object CourseRepository {
    val courses = listOf(
        Course(
            courseId = "PY101",
            title = "Python Programming",
            description = "Learn Python programming from beginner to advanced level. Covers data types, OOP, automation, and backend frameworks.",
            instructor = "John Smith",
            duration = "8 Weeks",
            lessons = 40,
            category = "Programming",
            rating = 4.9
        ),
        Course(
            courseId = "WD101",
            title = "Web Development",
            description = "Learn HTML, CSS, JavaScript, responsive UI design, DOM manipulation, and modern web application development.",
            instructor = "David Khan",
            duration = "10 Weeks",
            lessons = 50,
            category = "Web & Mobile",
            rating = 4.8
        ),
        Course(
            courseId = "JV101",
            title = "Java Programming",
            description = "Learn Java programming, object-oriented concepts, JVM internals, collection frameworks, and concurrent multithreading.",
            instructor = "Ali Ahmed",
            duration = "12 Weeks",
            lessons = 60,
            category = "Enterprise Software",
            rating = 4.7
        ),
        Course(
            courseId = "KT201",
            title = "Kotlin & Jetpack Compose",
            description = "Master native Android app development using Jetpack Compose, Material 3, Navigation Compose, and State Flow.",
            instructor = "Alex Chen",
            duration = "7 Weeks",
            lessons = 45,
            category = "Android Mobile",
            rating = 4.95
        ),
        Course(
            courseId = "CS102",
            title = "Data Structures & Algorithms",
            description = "Master trees, graphs, sorting, searching, dynamic programming, and complexity analysis for engineering interviews.",
            instructor = "Dr. Sarah Connor",
            duration = "14 Weeks",
            lessons = 72,
            category = "Computer Science",
            rating = 4.9
        ),
        Course(
            courseId = "AI201",
            title = "Machine Learning Fundamentals",
            description = "Explore supervised learning, regression, deep neural networks, computer vision, and prompt engineering foundations.",
            instructor = "Elena Rostova",
            duration = "10 Weeks",
            lessons = 48,
            category = "Artificial Intelligence",
            rating = 4.85
        )
    )

    fun getAllCourses(): List<Course> = courses

    fun getCourseById(courseId: String): Course? {
        return courses.find {
            it.courseId.equals(courseId.trim(), ignoreCase = true)
        }
    }

    fun searchCourses(query: String): List<Course> {
        if (query.isBlank()) return courses
        val q = query.trim().lowercase()
        return courses.filter {
            it.title.lowercase().contains(q) || it.courseId.lowercase().contains(q)
        }
    }
}
