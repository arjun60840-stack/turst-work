import React from 'react';
import { useThemeStore } from '../store/themeStore';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number | string; isPositive?: boolean };
  gradient?: string;
  badge?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  gradient = 'from-cyan-500 to-blue-600',
  badge
}) => {
  const { theme } = useThemeStore();
  const isLight = theme === 'light';

  return (
    <div className={`group rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden ${
      isLight 
        ? 'bg-white border border-slate-200 shadow-sm hover:border-blue-400' 
        : 'tech-glass-card hover:border-cyan-500/50 hover:shadow-cyan-500/5'
    }`}>
      {/* Ambient Top Glow Line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}></div>

      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {title}
            </p>
            <h3 className={`text-2xl font-black font-mono mt-1.5 tracking-tight transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-cyan-300'
            }`}>
              {value}
            </h3>
          </div>
          {icon && (
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
          )}
        </div>
      </div>

      <div className={`mt-4 flex items-center justify-between text-xs pt-3 border-t ${
        isLight ? 'border-slate-100' : 'border-slate-800/80'
      }`}>
        {trend ? (
          <div className="flex items-center space-x-1.5 font-mono">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] ${
              trend.isPositive !== false 
                ? (isLight ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30')
                : (isLight ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-rose-950/80 text-rose-400 border border-rose-500/30')
            }`}>
              {typeof trend.value === 'number' 
                ? `${trend.isPositive !== false ? '▲ +' : '▼ -'}${Math.abs(trend.value)}%` 
                : trend.value}
            </span>
            <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>vs benchmark</span>
          </div>
        ) : (
          <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>LIVE SYNCED</span>
        )}

        {badge && (
          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
            isLight 
              ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' 
              : 'bg-slate-800 text-cyan-400 border border-slate-700/60'
          }`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
