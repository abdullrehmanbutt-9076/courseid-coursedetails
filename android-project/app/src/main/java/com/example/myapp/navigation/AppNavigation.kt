package com.example.myapp.navigation

import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.core.tween
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.myapp.screens.CourseDetailsScreen
import com.example.myapp.screens.CoursesScreen
import com.example.myapp.screens.DashboardScreen
import com.example.myapp.screens.LoginScreen
import com.example.myapp.screens.ProfileScreen
import com.example.myapp.screens.SettingsScreen
import com.example.myapp.screens.SignupScreen
import com.example.myapp.viewmodel.AuthViewModel

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Signup : Screen("signup")
    object Dashboard : Screen("dashboard")
    object Courses : Screen("courses")
    object CourseDetails : Screen("course/{courseId}") {
        fun createRoute(courseId: String): String = "course/$courseId"
    }
    object Profile : Screen("profile")
    object Settings : Screen("settings")
}

@Composable
fun AppNavigation(
    navController: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel
) {
    val startDestination = if (authViewModel.isLoggedIn.value) {
        Screen.Dashboard.route
    } else {
        Screen.Login.route
    }

    NavHost(
        navController = navController,
        startDestination = startDestination,
        enterTransition = {
            slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Start, tween(300))
        },
        exitTransition = {
            slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Start, tween(300))
        },
        popEnterTransition = {
            slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.End, tween(300))
        },
        popExitTransition = {
            slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.End, tween(300))
        }
    ) {
        // 1. Login Screen
        composable(route = Screen.Login.route) {
            LoginScreen(
                navController = navController,
                authViewModel = authViewModel,
                onNavigateToSignup = {
                    navController.navigate(Screen.Signup.route)
                },
                onLoginSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                }
            )
        }

        // 2. Signup Screen
        composable(route = Screen.Signup.route) {
            SignupScreen(
                navController = navController,
                authViewModel = authViewModel,
                onNavigateToLogin = {
                    navController.popBackStack()
                }
            )
        }

        // 3. Dashboard Screen
        composable(route = Screen.Dashboard.route) {
            DashboardScreen(
                navController = navController,
                authViewModel = authViewModel,
                onNavigateToCourses = {
                    navController.navigate(Screen.Courses.route)
                },
                onNavigateToCourseDetails = { courseId ->
                    navController.navigate(Screen.CourseDetails.createRoute(courseId))
                },
                onNavigateToProfile = {
                    navController.navigate(Screen.Profile.route)
                },
                onNavigateToSettings = {
                    navController.navigate(Screen.Settings.route)
                },
                onLogout = {
                    authViewModel.logout()
                    navController.navigate(Screen.Login.route) {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }

        // 5. Courses Screen
        composable(route = Screen.Courses.route) {
            CoursesScreen(
                navController = navController,
                onNavigateToCourseDetails = { courseId ->
                    navController.navigate(Screen.CourseDetails.createRoute(courseId))
                },
                onBack = {
                    navController.popBackStack()
                }
            )
        }

        // 7. Dynamic Navigation Route: course/{courseId}
        composable(
            route = Screen.CourseDetails.route,
            arguments = listOf(
                navArgument("courseId") {
                    type = NavType.StringType
                }
            )
        ) { backStackEntry ->
            val courseId = backStackEntry.arguments?.getString("courseId") ?: ""
            CourseDetailsScreen(
                courseId = courseId,
                navController = navController,
                onBack = {
                    navController.popBackStack()
                }
            )
        }

        // Profile Screen
        composable(route = Screen.Profile.route) {
            ProfileScreen(
                navController = navController,
                authViewModel = authViewModel,
                onBack = {
                    navController.popBackStack()
                }
            )
        }

        // Settings Screen
        composable(route = Screen.Settings.route) {
            SettingsScreen(
                navController = navController,
                authViewModel = authViewModel,
                onBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}
