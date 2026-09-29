import React from 'react';

interface AndroidNavBarProps {
  onBack: () => UnitFunction;
  onHome: () => UnitFunction;
  onOverview?: () => UnitFunction;
  gestureMode?: boolean;
}

type UnitFunction = void;

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  onBack,
  onHome,
  onOverview,
  gestureMode = false,
}) => {
  return (
    <div className="h-10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-around px-8 text-zinc-300 z-20 border-t border-zinc-800/40">
      {gestureMode ? (
        <button
          onClick={onHome}
          className="w-32 h-1 bg-zinc-400 hover:bg-zinc-200 rounded-full transition-all cursor-pointer"
          title="Android Gesture Bar (Swipe up for home)"
        />
      ) : (
        <div className="w-full flex items-center justify-around max-w-xs mx-auto">
          {/* Back Triangle Button (Android Hardware Back Button) */}
          <button
            onClick={onBack}
            className="p-2 hover:text-white active:scale-90 transition-transform cursor-pointer rounded-full hover:bg-white/10"
            title="Android System Back Button (popBackStack)"
            aria-label="Android System Back"
          >
            <svg
              className="w-4 h-4 fill-current rotate-180"
              viewBox="0 0 24 24"
            >
              <polygon points="6,4 18,12 6,20" />
            </svg>
          </button>

          {/* Home Circle Button */}
          <button
            onClick={onHome}
            className="p-2 hover:text-white active:scale-90 transition-transform cursor-pointer rounded-full hover:bg-white/10"
            title="Android System Home Button"
            aria-label="Android Home"
          >
            <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />
          </button>

          {/* Recents Square Button */}
          <button
            onClick={onOverview || onHome}
            className="p-2 hover:text-white active:scale-90 transition-transform cursor-pointer rounded-full hover:bg-white/10"
            title="Android System Overview / Recents"
            aria-label="Android Recents"
          >
            <div className="w-3.5 h-3.5 rounded-xs border-2 border-current" />
          </button>
        </div>
      )}
    </div>
  );
};
