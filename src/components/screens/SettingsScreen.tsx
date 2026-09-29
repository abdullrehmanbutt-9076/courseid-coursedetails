import React, { useState } from 'react';
import { ArrowLeft, Bell, Wifi, Play, Moon, Shield, Info, Smartphone } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Top App Bar */}
      <div className="h-14 px-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center gap-2 z-10 shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
          title="Back Arrow"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-900">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Course & Content Preferences */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Preferences</h3>

          {/* Toggle 1: Push Notifications */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800">Push Notifications</div>
                <div className="text-[10px] text-slate-500">Lesson reminders and course announcements</div>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                notifications ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${notifications ? 'translate-x-5' : 'translate-x-0.5'} shadow-xs`} />
            </button>
          </div>

          {/* Toggle 2: Download Wi-Fi only */}
          <div className="flex items-center justify-between py-1 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Wifi className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800">Download over Wi-Fi Only</div>
                <div className="text-[10px] text-slate-500">Prevent cellular mobile data consumption</div>
              </div>
            </div>
            <button
              onClick={() => setWifiOnly(!wifiOnly)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                wifiOnly ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${wifiOnly ? 'translate-x-5' : 'translate-x-0.5'} shadow-xs`} />
            </button>
          </div>

          {/* Toggle 3: Autoplay Next Lesson */}
          <div className="flex items-center justify-between py-1 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Play className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800">Autoplay Next Video</div>
                <div className="text-[10px] text-slate-500">Automatically stream consecutive units</div>
              </div>
            </div>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                autoPlay ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${autoPlay ? 'translate-x-5' : 'translate-x-0.5'} shadow-xs`} />
            </button>
          </div>
        </div>

        {/* Application Information */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">About Application</h3>

          <div className="flex items-center gap-3 text-xs text-slate-700 py-1">
            <Smartphone className="w-4 h-4 text-indigo-600" />
            <div>
              <div className="font-semibold text-slate-900">EduPulse Android Mobile</div>
              <div className="text-[10px] text-slate-500">Kotlin, Jetpack Compose, Material 3</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700 py-1 pt-2 border-t border-slate-100">
            <Info className="w-4 h-4 text-slate-400" />
            <div>
              <div className="font-semibold text-slate-900">Version 1.0.0 (Release)</div>
              <div className="text-[10px] text-slate-500">Navigation Compose with dynamic Course ID stack</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700 py-1 pt-2 border-t border-slate-100">
            <Shield className="w-4 h-4 text-slate-400" />
            <div>
              <div className="font-semibold text-slate-900">Privacy & Terms</div>
              <div className="text-[10px] text-slate-500">Protected student educational record</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
