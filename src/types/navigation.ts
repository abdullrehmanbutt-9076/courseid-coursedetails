export type ScreenRoute = 
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'courses'
  | `course/${string}`
  | 'profile'
  | 'settings';

export interface NavBackStackEntry {
  id: string;
  route: string;
  screenName: string;
  params?: Record<string, string>;
  timestamp: number;
}

export interface UserSession {
  fullName: string;
  email: string;
  phoneNumber: string;
  studentId: string;
  avatarUrl?: string;
  enrolledCourseIds: string[];
  isAuthenticated: boolean;
}

export const DEFAULT_USER: UserSession = {
  fullName: "Abdullah Al-Mansoor",
  email: "abdullah@example.com",
  phoneNumber: "+1 (555) 349-8201",
  studentId: "STU-88294",
  enrolledCourseIds: ["PY101", "WD101"],
  isAuthenticated: true,
};
