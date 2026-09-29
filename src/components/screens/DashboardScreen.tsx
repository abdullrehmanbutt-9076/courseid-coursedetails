import React, { useState } from 'react';
import { User, Settings, LogOut, GraduationCap, ArrowRight, BookOpen, Clock, Award } from 'lucide-react';
import { UserSession } from '../../types/navigation';
import { SAMPLE_COURSES } from '../../data/courses';

interface DashboardScreenProps {
  user: UserSession;
  onNavigateToCourses: () => void;
  onNavigateToCourseDetails: (courseId: string) => void;
  onNavigateToProfile: () => void;
  onNavigateToSettings: () => void;
  onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onNavigateToCourses,
  onNavigateToCourseDetails,
  onNavigateToProfile,
  onNavigateToSettings,
  onLogout
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Take top featured courses (Python, Web Dev, Java)
  const dashboardCourses = SAMPLE_COURSES.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Material 3 Top App Bar */}
      <div className="h-14 px-4 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900">EduPulse</span>
          </div>
        </div>

        {/* Action icons: Profile, Settings, Logout */}
        <div className="flex items-center gap-1">
          <button
            onClick={onNavigateToProfile}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Profile"
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={onNavigateToSettings}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition cursor-pointer"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-indigo-200 text-xs font-medium">Welcome back,</div>
            <h2 className="text-xl font-bold tracking-tight mt-0.5">{user.fullName || 'Abdullah'}</h2>
            <p className="text-xs text-indigo-100 mt-1 max-w-[240px] leading-relaxed">
              Explore your active courses and discover new technologies in modern software development.
            </p>

            <button
              onClick={onNavigateToCourses}
              className="mt-4 inline-flex items-center gap-1.5 bg-white text-indigo-900 font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs hover:bg-indigo-50 active:scale-95 transition cursor-pointer"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="absolute -right-4 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Catalog</div>
              <div className="text-sm font-bold text-slate-800">{SAMPLE_COURSES.length} Courses</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Enrolled</div>
              <div className="text-sm font-bold text-slate-800">{user.enrolledCourseIds.length} Active</div>
            </div>
          </div>
        </div>

        {/* Courses Section Header */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900">Featured Courses</h3>
            <button
              onClick={onNavigateToCourses}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Course Cards (clickable cards navigating by Course ID) */}
          <div className="space-y-3">
            {dashboardCourses.map((course) => (
              <div
                key={course.courseId}
                onClick={() => onNavigateToCourseDetails(course.courseId)}
                className="w-full text-left bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99] block"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Course ID: {course.courseId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span>{course.lessons} Lessons</span>
                  </div>

                  <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
                    View Course →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog (Requirement 16) */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <LogOut className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Confirm Logout</h3>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to log out? Your authenticated navigation stack will be cleared.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
