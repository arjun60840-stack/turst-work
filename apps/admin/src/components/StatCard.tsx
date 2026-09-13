import React from 'react';

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
  return (
    <div className="group tech-glass-card rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
      {/* Ambient Top Glow Line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-70 group-hover:opacity-100 transition-opacity`}></div>

      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-mono font-bold text-slate-400 tracking-wider uppercase">{title}</p>
            <h3 className="text-2xl font-black font-mono text-white mt-1.5 tracking-tight group-hover:text-cyan-300 transition-colors">
              {value}
            </h3>
          </div>
          {icon && (
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-black/40 group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
        {trend ? (
          <div className="flex items-center space-x-1.5 font-mono">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] ${
              trend.isPositive !== false 
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
            }`}>
              {typeof trend.value === 'number' 
                ? `${trend.isPositive !== false ? '▲ +' : '▼ -'}${Math.abs(trend.value)}%` 
                : trend.value}
            </span>
            <span className="text-slate-500 text-[10px]">vs benchmark</span>
          </div>
        ) : (
          <span className="text-slate-500 text-[10px] font-mono">LIVE SYNCED</span>
        )}

        {badge && (
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700/60">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
