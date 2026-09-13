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
  gradient = 'from-blue-500 to-indigo-600',
  badge
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 p-5 flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
      {/* Top ambient color glow on hover */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}></div>

      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">{value}</h3>
          </div>
          {icon && (
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm shadow-slate-200 transition-transform group-hover:scale-105`}>
              {icon}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100/80">
        {trend ? (
          <div className="flex items-center space-x-1.5">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md font-bold text-[11px] ${
              trend.isPositive !== false 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                : 'bg-rose-50 text-rose-700 border border-rose-200/60'
            }`}>
              {typeof trend.value === 'number' 
                ? `${trend.isPositive !== false ? '↑ +' : '↓ -'}${Math.abs(trend.value)}%` 
                : trend.value}
            </span>
            <span className="text-slate-400 text-[11px]">trend vs last period</span>
          </div>
        ) : (
          <span className="text-slate-400 text-[11px]">Real-time synchronized</span>
        )}

        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
