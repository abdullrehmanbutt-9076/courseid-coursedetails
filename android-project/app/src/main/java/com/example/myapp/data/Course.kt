package com.example.myapp.data

data class Course(
    val courseId: String,
    val title: String,
    val description: String,
    val instructor: String,
    val duration: String,
    val lessons: Int,
    val category: String = "Computer Science",
    val rating: Double = 4.8
)
