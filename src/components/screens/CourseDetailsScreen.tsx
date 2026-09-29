import React, { useState } from 'react';
import { ArrowLeft, Clock, Video, User, Star, CheckCircle, Play, AlertCircle, Share2, Award } from 'lucide-react';
import { getCourseById } from '../../data/courses';

interface CourseDetailsScreenProps {
  courseId: string;
  onBack: () => void;
  onEnrollToggle?: (courseId: string) => void;
  isInitiallyEnrolled?: boolean;
}

export const CourseDetailsScreen: React.FC<CourseDetailsScreenProps> = ({
  courseId,
  onBack,
  onEnrollToggle,
  isInitiallyEnrolled = false
}) => {
  // Requirement 9: Look up course by ID
  const course = getCourseById(courseId);

  const [enrolled, setEnrolled] = useState(isInitiallyEnrolled);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Requirement 9: If the Course ID does not exist, display "Course Not Found" and provide a Back button
  if (!course) {
    return (
      <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
        <div className="h-14 px-3 bg-white border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Back Arrow"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900">Course Lookup</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-xs">
            No course registered with Course ID <span className="font-mono font-bold text-slate-800">"{courseId}"</span>.
          </p>
          <button
            onClick={onBack}
            className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            ← Return to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    const nextState = !enrolled;
    setEnrolled(nextState);
    if (onEnrollToggle) onEnrollToggle(course.courseId);
    setShowToast(nextState ? `Enrolled in ${course.title}!` : `Unenrolled from ${course.title}`);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 overflow-hidden relative">
      {/* Top App Bar with Back Arrow */}
      <div className="h-14 px-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Back Arrow (popBackStack)"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
            {course.title}
          </span>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            setShowToast('Course link copied!');
            setTimeout(() => setShowToast(null), 2500);
          }}
          className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 cursor-pointer"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Course Banner */}
        <div className={`rounded-2xl p-5 text-white shadow-md bg-gradient-to-r ${course.bannerColor || 'from-indigo-600 to-indigo-800'} relative overflow-hidden`}>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="bg-white/20 backdrop-blur-xs font-mono font-bold px-2.5 py-1 rounded-lg">
              Course ID: {course.courseId}
            </span>
            <div className="flex items-center gap-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{course.rating || 4.9}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight">{course.title}</h2>
          <p className="text-xs text-white/80 mt-1">{course.category || 'Computer Science'}</p>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/90">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {course.instructor}
            </span>
            <span>{course.enrolledStudents?.toLocaleString() || '12,400'} Students</span>
          </div>
        </div>

        {/* Course Metrics Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
            <Clock className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
            <div className="text-[10px] text-slate-500">Duration</div>
            <div className="text-xs font-bold text-slate-800">{course.duration}</div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
            <Video className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
            <div className="text-[10px] text-slate-500">Lessons</div>
            <div className="text-xs font-bold text-slate-800">{course.lessons} Units</div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
            <Award className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
            <div className="text-[10px] text-slate-500">Level</div>
            <div className="text-xs font-bold text-slate-800 truncate">{course.level || 'All Levels'}</div>
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
          <h3 className="text-xs font-bold text-slate-900 mb-2">About This Course</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor Section */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              {course.instructor.charAt(0)}
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Lead Instructor</div>
              <div className="text-xs font-bold text-slate-900">{course.instructor}</div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
            Verified
          </span>
        </div>

        {/* Syllabus Overview */}
        {course.syllabus && course.syllabus.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 mb-2.5">Course Curriculum</h3>
            <div className="space-y-2">
              {course.syllabus.map((topic, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 p-2 rounded-xl bg-slate-50 hover:bg-indigo-50/50 transition">
                  <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons (Enroll & Start Course) */}
      <div className="p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center gap-2 z-10 shrink-0">
        <button
          onClick={handleEnroll}
          className={`flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
            enrolled
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {enrolled ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Enrolled</span>
            </>
          ) : (
            <span>Enroll Now</span>
          )}
        </button>

        <button
          onClick={() => setShowVideoModal(true)}
          className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-black text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Course</span>
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1.5 animate-fade-in">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Start Course Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-indigo-600 ml-0.5 fill-indigo-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Launching Module 1</h3>
            <p className="text-xs text-slate-600 mt-1">
              Starting interactive lesson for <span className="font-semibold text-slate-800">{course.title}</span> (Course ID: {course.courseId}).
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowVideoModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setShowToast('Lesson 1 in progress!');
                  setTimeout(() => setShowToast(null), 2500);
                }}
                className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
