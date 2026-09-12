import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartProps {
  title: string;
  children: React.ReactNode;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ title, children, height = 300 }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">{title}</h3>
      <div style={{ height, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as any}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
