import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';

interface AndroidStatusBarProps {
  isDark?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ isDark = false }) => {
  const [time, setTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const textColor = isDark ? 'text-zinc-100' : 'text-zinc-800';

  return (
    <div className={`h-8 px-6 flex items-center justify-between text-xs select-none ${textColor} transition-colors z-20`}>
      {/* Time & Camera Hole Spacing */}
      <div className="font-semibold tracking-tight w-14">
        {time}
      </div>

      {/* Front camera punch hole simulated in center */}
      <div className="w-3.5 h-3.5 rounded-full bg-black/90 ring-1 ring-zinc-700/50 shadow-inner" />

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 w-14 justify-end">
        <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <div className="flex items-center gap-0.5">
          <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};
