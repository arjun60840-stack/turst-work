import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartProps {
  title: string;
  children: React.ReactNode;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ title, children, height = 300 }) => {
  return (
    <div className="tech-glass-card p-6 rounded-2xl border border-cyan-500/20 shadow-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
      </div>
      <div style={{ height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as any}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
