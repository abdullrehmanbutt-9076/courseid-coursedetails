import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, ShieldCheck, BookOpen, Edit3, Check } from 'lucide-react';
import { UserSession } from '../../types/navigation';
import { SAMPLE_COURSES } from '../../data/courses';

interface ProfileScreenProps {
  user: UserSession;
  onUpdateUser: (updated: UserSession) => void;
  onBack: () => void;
  onNavigateToCourseDetails: (courseId: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onBack,
  onNavigateToCourseDetails
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phoneNumber);

  const enrolledCourses = SAMPLE_COURSES.filter(c => user.enrolledCourseIds.includes(c.courseId));

  const handleSave = () => {
    onUpdateUser({
      ...user,
      fullName: fullName.trim() || user.fullName,
      phoneNumber: phone.trim() || user.phoneNumber
    });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Top App Bar */}
      <div className="h-14 px-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Back Arrow"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900">Student Profile</h1>
        </div>

        <button
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition cursor-pointer"
          title={isEditing ? 'Save Profile' : 'Edit Profile'}
        >
          {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-2xs">
          <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3 shadow-md shadow-indigo-100">
            {user.fullName.charAt(0) || 'A'}
          </div>

          {isEditing ? (
            <div className="space-y-2 max-w-xs mx-auto text-left">
              <div>
                <label className="text-[10px] text-slate-500 font-semibold">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold mt-2 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-base font-bold text-slate-900">{user.fullName}</h2>
              <p className="text-xs text-indigo-600 font-mono font-medium mt-0.5">ID: {user.studentId}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Student</span>
              </div>
            </>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 mb-1">Contact Details</h3>

          <div className="flex items-center gap-3 text-xs text-slate-700">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] text-slate-400">Email Address</div>
              <div className="font-medium text-slate-800">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Phone Number</div>
              <div className="font-medium text-slate-800">{user.phoneNumber}</div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900">Enrolled Courses ({enrolledCourses.length})</h3>
          </div>

          {enrolledCourses.length === 0 ? (
            <p className="text-xs text-slate-500 py-3 text-center">No enrolled courses yet.</p>
          ) : (
            <div className="space-y-2">
              {enrolledCourses.map((c) => (
                <div
                  key={c.courseId}
                  onClick={() => onNavigateToCourseDetails(c.courseId)}
                  className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-indigo-50/50 rounded-xl transition cursor-pointer border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{c.title}</div>
                      <div className="text-[10px] font-mono text-slate-500">{c.courseId} • {c.duration}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600">View →</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
