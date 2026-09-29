import React from 'react';
import { Layers, ArrowLeft, ArrowRight, CornerDownRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { NavBackStackEntry } from '../../types/navigation';

interface NavigationStackInspectorProps {
  stack: NavBackStackEntry[];
  currentRoute: string;
  onNavigateToCourse: (courseId: string) => void;
  onNavigateRoute: (route: string) => void;
  onPopBackStack: () => void;
  onLogout: () => void;
}

export const NavigationStackInspector: React.FC<NavigationStackInspectorProps> = ({
  stack,
  currentRoute,
  onNavigateToCourse,
  onNavigateRoute,
  onPopBackStack,
  onLogout
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-200 shadow-xl space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Navigation Compose Stack
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800">
          Stack Depth: {stack.length}
        </span>
      </div>

      {/* Live Backstack Visualization */}
      <div className="space-y-1.5">
        <div className="text-[11px] text-slate-400 font-medium">Backstack Entries (Top is Active):</div>
        <div className="flex flex-col-reverse gap-1.5 max-h-48 overflow-y-auto pr-1">
          {stack.map((entry, index) => {
            const isTop = index === stack.length - 1;
            const isDynamicCourse = entry.route.startsWith('course/');

            return (
              <div
                key={entry.id}
                className={`p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                  isTop
                    ? 'bg-indigo-950/70 border-indigo-500/60 text-white shadow-xs'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                    isTop ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-mono font-semibold flex items-center gap-1.5">
                      <span>{entry.route}</span>
                      {isTop && (
                        <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider font-sans font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Screen: {entry.screenName}
                      {entry.params?.courseId && ` • courseId = "${entry.params.courseId}"`}
                    </div>
                  </div>
                </div>

                {isDynamicCourse && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 font-mono">
                    Dynamic Argument
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Triggers to Test Required Navigation Flows */}
      <div className="pt-2 border-t border-slate-800 space-y-2">
        <div className="text-[11px] text-slate-400 font-medium">Test Dynamic Course ID Routes:</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigateToCourse('PY101')}
            className="p-2 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-indigo-500/50 border border-slate-700/60 text-xs transition cursor-pointer"
          >
            <div className="font-semibold text-slate-200">navController.navigate</div>
            <div className="font-mono text-indigo-400 text-[11px] truncate">"course/PY101"</div>
          </button>

          <button
            onClick={() => onNavigateToCourse('WD101')}
            className="p-2 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-indigo-500/50 border border-slate-700/60 text-xs transition cursor-pointer"
          >
            <div className="font-semibold text-slate-200">navController.navigate</div>
            <div className="font-mono text-indigo-400 text-[11px] truncate">"course/WD101"</div>
          </button>

          <button
            onClick={() => onNavigateToCourse('JV101')}
            className="p-2 text-left rounded-xl bg-slate-800/60 hover:bg-slate-800 hover:border-indigo-500/50 border border-slate-700/60 text-xs transition cursor-pointer"
          >
            <div className="font-semibold text-slate-200">navController.navigate</div>
            <div className="font-mono text-indigo-400 text-[11px] truncate">"course/JV101"</div>
          </button>

          <button
            onClick={() => onNavigateToCourse('UNKNOWN99')}
            className="p-2 text-left rounded-xl bg-rose-950/30 hover:bg-rose-950/50 hover:border-rose-500/50 border border-rose-900/40 text-xs transition cursor-pointer"
          >
            <div className="font-semibold text-rose-300">Test 404 Lookup</div>
            <div className="font-mono text-rose-400 text-[11px] truncate">"course/UNKNOWN99"</div>
          </button>
        </div>

        {/* Stack Control Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={onPopBackStack}
            disabled={stack.length <= 1}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>popBackStack()</span>
          </button>

          <button
            onClick={onLogout}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-xs font-semibold text-rose-300 transition cursor-pointer"
          >
            <span>Logout & Clear Stack</span>
          </button>
        </div>
      </div>

      {/* Compliance Highlights */}
      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Dynamic route <code className="font-mono bg-slate-800 px-1 rounded">course/{'{courseId}'}</code> with NavType.StringType</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Single CourseDetailsScreen instance with dynamic lookup</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Android Hardware Back button mapped to <code className="font-mono bg-slate-800 px-1 rounded">popBackStack()</code></span>
        </div>
      </div>
    </div>
  );
};
