import React from 'react';
import { AndroidStatusBar } from './AndroidStatusBar';
import { AndroidNavBar } from './AndroidNavBar';

interface AndroidDeviceFrameProps {
  children: React.ReactNode;
  onBack: () => void;
  onHome: () => void;
  onOverview?: () => void;
  gestureMode?: boolean;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({
  children,
  onBack,
  onHome,
  onOverview,
  gestureMode = false
}) => {
  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Outer Phone Frame (Google Pixel 8 Pro aesthetic) */}
      <div className="relative w-[340px] sm:w-[370px] h-[720px] sm:h-[750px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20 border-4 border-slate-800 flex flex-col">
        {/* Speaker slit */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-700/80 rounded-full z-30" />

        {/* Physical side buttons */}
        <div className="absolute -right-5 top-28 w-1 h-12 bg-slate-700 rounded-r-md" />
        <div className="absolute -right-5 top-44 w-1 h-20 bg-slate-700 rounded-r-md" />

        {/* Screen Display Container */}
        <div className="relative w-full h-full bg-slate-50 rounded-[40px] overflow-hidden flex flex-col shadow-inner select-none">
          {/* Android Status Bar */}
          <AndroidStatusBar isDark={false} />

          {/* Active Jetpack Compose Screen Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* Android System 3-Button Navigation Bar */}
          <AndroidNavBar
            onBack={onBack}
            onHome={onHome}
            onOverview={onOverview}
            gestureMode={gestureMode}
          />
        </div>
      </div>
    </div>
  );
};
