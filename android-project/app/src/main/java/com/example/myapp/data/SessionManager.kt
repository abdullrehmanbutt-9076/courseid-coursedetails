package com.example.myapp.data

data class UserSession(
    val fullName: String,
    val email: String,
    val phoneNumber: String,
    val studentId: String = "STU-88294",
    val isLoggedIn: Boolean = false
)

object SessionManager {
    private var currentUserSession: UserSession? = UserSession(
        fullName = "Abdullah",
        email = "abdullah@example.com",
        phoneNumber = "+1 (555) 349-8201",
        studentId = "STU-88294",
        isLoggedIn = true
    )

    fun getUser(): UserSession? = currentUserSession

    fun saveUser(user: UserSession) {
        currentUserSession = user
    }

    fun clearSession() {
        currentUserSession = null
    }

    fun isLoggedIn(): Boolean = currentUserSession?.isLoggedIn == true
}
