import React, { useState, useCallback } from 'react';
import { 
  Smartphone, 
  Code2, 
  Layers, 
  Download, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { AndroidDeviceFrame } from './components/android/AndroidDeviceFrame';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CoursesScreen } from './components/screens/CoursesScreen';
import { CourseDetailsScreen } from './components/screens/CourseDetailsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { KotlinCodeExplorer } from './components/ide/KotlinCodeExplorer';
import { NavigationStackInspector } from './components/ide/NavigationStackInspector';
import { NavBackStackEntry, UserSession, DEFAULT_USER } from './types/navigation';
import { KOTLIN_PROJECT_FILES } from './data/kotlinFiles';
import JSZip from 'jszip';

type WorkspaceTab = 'split' | 'device' | 'code';

export default function App() {
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>('split');
  const [gestureMode, setGestureMode] = useState(false);

  // Authentication & User Session state (SessionManager)
  const [user, setUser] = useState<UserSession>(DEFAULT_USER);

  // Navigation Compose BackStack
  // Initial destination depends on login state
  const [backStack, setBackStack] = useState<NavBackStackEntry[]>(() => [
    {
      id: 'entry-1',
      route: 'dashboard',
      screenName: 'DashboardScreen',
      timestamp: Date.now()
    }
  ]);

  // Current active route is the top of the backstack
  const currentEntry = backStack[backStack.length - 1] || {
    id: 'entry-fallback',
    route: 'login',
    screenName: 'LoginScreen',
    timestamp: Date.now()
  };

  const currentRoute = currentEntry.route;

  // Navigation action: navController.navigate(route)
  const navigate = useCallback((route: string, popUpToRoot: boolean = false) => {
    let screenName = 'UnknownScreen';
    let params: Record<string, string> | undefined = undefined;

    if (route === 'login') {
      screenName = 'LoginScreen';
    } else if (route === 'signup') {
      screenName = 'SignupScreen';
    } else if (route === 'dashboard') {
      screenName = 'DashboardScreen';
    } else if (route === 'courses') {
      screenName = 'CoursesScreen';
    } else if (route.startsWith('course/')) {
      screenName = 'CourseDetailsScreen';
      const courseId = route.replace('course/', '');
      params = { courseId };
    } else if (route === 'profile') {
      screenName = 'ProfileScreen';
    } else if (route === 'settings') {
      screenName = 'SettingsScreen';
    }

    const newEntry: NavBackStackEntry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      route,
      screenName,
      params,
      timestamp: Date.now()
    };

    setBackStack(prev => {
      if (popUpToRoot) {
        return [newEntry];
      }
      // If navigating to same route as top, ignore duplicate
      if (prev.length > 0 && prev[prev.length - 1].route === route) {
        return prev;
      }
      return [...prev, newEntry];
    });
  }, []);

  // Back Navigation: navController.popBackStack()
  // Handles top bar back arrow AND Android hardware back button
  const popBackStack = useCallback(() => {
    setBackStack(prev => {
      if (prev.length <= 1) {
        return prev; // Root reached
      }
      return prev.slice(0, prev.length - 1);
    });
  }, []);

  // Android Home button
  const handleHome = useCallback(() => {
    if (user.isAuthenticated) {
      navigate('dashboard');
    } else {
      navigate('login', true);
    }
  }, [user.isAuthenticated, navigate]);

  // Logout Flow (Requirement 16: Clear session and wipe stack)
  const handleLogout = useCallback(() => {
    setUser({
      fullName: '',
      email: '',
      phoneNumber: '',
      studentId: '',
      enrolledCourseIds: [],
      isAuthenticated: false
    });
    // popUpTo(0) { inclusive = true }
    navigate('login', true);
  }, [navigate]);

  // Login Success Flow
  const handleLoginSuccess = useCallback((loggedUser: UserSession) => {
    setUser(loggedUser);
    // Navigate to dashboard and pop login
    navigate('dashboard', true);
  }, [navigate]);

  // Signup Success Flow
  const handleSignupSuccess = useCallback((newUser: UserSession) => {
    setUser(newUser);
    navigate('dashboard', true);
  }, [navigate]);

  // Toggle course enrollment
  const handleEnrollToggle = useCallback((courseId: string) => {
    setUser(prev => {
      const exists = prev.enrolledCourseIds.includes(courseId);
      const nextIds = exists
        ? prev.enrolledCourseIds.filter(id => id !== courseId)
        : [...prev.enrolledCourseIds, courseId];
      return { ...prev, enrolledCourseIds: nextIds };
    });
  }, []);

  // Download project as zip
  const handleDownloadFullZip = async () => {
    try {
      const zip = new JSZip();
      KOTLIN_PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.code);
      });
      zip.file(
        "build.gradle.kts",
        `// Top-level build file
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
`
      );
      zip.file(
        "settings.gradle.kts",
        `rootProject.name = "EduPulse"
include(":app")
`
      );
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EduPulse-Android-Compose-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  // Render the active Android Screen inside the Pixel Frame
  const renderScreen = () => {
    if (currentRoute === 'login') {
      return (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => navigate('signup')}
        />
      );
    }

    if (currentRoute === 'signup') {
      return (
        <SignupScreen
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={() => popBackStack()}
        />
      );
    }

    if (currentRoute === 'dashboard') {
      return (
        <DashboardScreen
          user={user}
          onNavigateToCourses={() => navigate('courses')}
          onNavigateToCourseDetails={(id) => navigate(`course/${id}`)}
          onNavigateToProfile={() => navigate('profile')}
          onNavigateToSettings={() => navigate('settings')}
          onLogout={handleLogout}
        />
      );
    }

    if (currentRoute === 'courses') {
      return (
        <CoursesScreen
          onNavigateToCourseDetails={(id) => navigate(`course/${id}`)}
          onBack={popBackStack}
        />
      );
    }

    if (currentRoute.startsWith('course/')) {
      const courseId = currentRoute.replace('course/', '');
      return (
        <CourseDetailsScreen
          courseId={courseId}
          onBack={popBackStack}
          onEnrollToggle={handleEnrollToggle}
          isInitiallyEnrolled={user.enrolledCourseIds.includes(courseId)}
        />
      );
    }

    if (currentRoute === 'profile') {
      return (
        <ProfileScreen
          user={user}
          onUpdateUser={setUser}
          onBack={popBackStack}
          onNavigateToCourseDetails={(id) => navigate(`course/${id}`)}
        />
      );
    }

    if (currentRoute === 'settings') {
      return (
        <SettingsScreen onBack={popBackStack} />
      );
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="font-bold text-slate-800">Screen not found</h3>
        <button onClick={handleHome} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs">
          Return Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased font-sans">
      {/* Top Header Bar */}
      <header className="h-16 px-4 md:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-950">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">EduPulse</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Jetpack Compose Material 3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Android Studio Mobile Application Architecture & Interactive Emulator
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setWorkspaceTab('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              workspaceTab === 'split'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Split View</span>
          </button>

          <button
            onClick={() => setWorkspaceTab('device')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              workspaceTab === 'device'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Device</span>
          </button>

          <button
            onClick={() => setWorkspaceTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              workspaceTab === 'code'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Kotlin Files</span>
          </button>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadFullZip}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-xs transition cursor-pointer"
            title="Download full project zip for Android Studio"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Android Project</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 flex overflow-hidden p-3 md:p-6 gap-6">
        {/* Device View Column (shown in 'device' and 'split' modes) */}
        {(workspaceTab === 'device' || workspaceTab === 'split') && (
          <div className={`flex flex-col items-center justify-start overflow-y-auto ${
            workspaceTab === 'split' ? 'w-full lg:w-[420px] shrink-0' : 'w-full max-w-md mx-auto'
          }`}>
            {/* Quick Emulator Controls Bar */}
            <div className="w-full max-w-[370px] mb-3 flex items-center justify-between text-xs text-slate-400 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">Pixel 8 Pro (API 35)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGestureMode(!gestureMode)}
                  className="hover:text-slate-200 underline text-[11px] cursor-pointer"
                >
                  {gestureMode ? 'Use 3-Button Nav' : 'Use Gesture Bar'}
                </button>
                <span>•</span>
                <button
                  onClick={() => navigate('dashboard', true)}
                  className="hover:text-slate-200 text-[11px] flex items-center gap-1 cursor-pointer"
                  title="Reset to Dashboard"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Android Device Hardware Frame with Active Compose Screen */}
            <AndroidDeviceFrame
              onBack={popBackStack}
              onHome={handleHome}
              gestureMode={gestureMode}
            >
              {renderScreen()}
            </AndroidDeviceFrame>

            {/* Hint below device */}
            <div className="mt-3 text-center text-[11px] text-slate-500 max-w-xs">
              Press the <span className="text-slate-300 font-semibold">Back Arrow ◀</span> on the bottom Android bar or top bar to trigger <code className="text-indigo-400 font-mono">popBackStack()</code>.
            </div>
          </div>
        )}

        {/* Studio / Code & Navigation Stack Column */}
        {(workspaceTab === 'code' || workspaceTab === 'split') && (
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden space-y-4">
            {/* Top row in split mode: Navigation Stack Inspector */}
            {workspaceTab === 'split' && (
              <div className="shrink-0">
                <NavigationStackInspector
                  stack={backStack}
                  currentRoute={currentRoute}
                  onNavigateToCourse={(id) => navigate(`course/${id}`)}
                  onNavigateRoute={(r) => navigate(r)}
                  onPopBackStack={popBackStack}
                  onLogout={handleLogout}
                />
              </div>
            )}

            {/* Kotlin Code Explorer (Android Studio Tree & Syntax Viewer) */}
            <div className="flex-1 min-h-[350px]">
              <KotlinCodeExplorer />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
