import { useState } from 'react';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  MapPinIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const categoryDemandData = [
  { category: 'Harvesting & Farm Crew', requests: 520, fulfilled: 485 },
  { category: 'Agri Electrician & Solar', requests: 340, fulfilled: 322 },
  { category: 'Drip Irrigation & Plumbing', requests: 290, fulfilled: 270 },
  { category: 'Tractor & Machinery Repair', requests: 245, fulfilled: 215 },
  { category: 'Cold Storage Maintenance', requests: 180, fulfilled: 175 },
  { category: 'Masonry & Silo Sealing', requests: 160, fulfilled: 152 },
];

const monthlyTrendData = [
  { month: 'Apr', demand: 420, completed: 390 },
  { month: 'May', demand: 580, completed: 530 },
  { month: 'Jun', demand: 890, completed: 810 },
  { month: 'Jul', demand: 1150, completed: 1060 },
  { month: 'Aug', demand: 1420, completed: 1310 },
  { month: 'Sep', demand: 1840, completed: 1710 },
];

const districtData = [
  { name: 'Nashik, MH', value: 32 },
  { name: 'Pune Rural, MH', value: 24 },
  { name: 'Ludhiana, PB', value: 16 },
  { name: 'Jaipur Rural, RJ', value: 12 },
  { name: 'Guntur, AP', value: 10 },
  { name: 'Indore, MP', value: 6 },
];

const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6'];

export default function DemandAnalytics() {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Monthly Service Demand" 
          value="1,840 Gigs" 
          icon={<ChartBarIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 29, isPositive: true }} 
        />
        <StatCard 
          title="Kharif Seasonal Surge" 
          value="+42.8%" 
          icon={<ArrowTrendingUpIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 14, isPositive: true }} 
        />
        <StatCard 
          title="Fulfillment Efficiency" 
          value="93.1%" 
          icon={<SparklesIcon className="w-5 h-5 text-amber-400" />} 
          trend={{ value: 4, isPositive: true }} 
        />
        <StatCard 
          title="Peak District Cluster" 
          value="Nashik & Pune" 
          icon={<MapPinIcon className="w-5 h-5 text-indigo-400" />} 
        />
      </div>

      {/* AI Demand Forecasting Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-cyan-500/30 tech-glow-blue">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <SparklesIcon className="w-6 h-6 text-cyan-400 animate-spin" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide">AI Predictive Labor Dispatch (Neural Engine)</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Forecasting +65% surge in wheat harvesting across Punjab & Haryana next month. Cooperative pre-allocation active.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => alert('AI Forecast recalculated based on satellite weather data and crop harvest calendar.')}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs transition-all shadow-lg cursor-pointer"
          >
            Re-run Predictive Model
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Demand vs Fulfilled */}
        <Chart title="Demand vs Fulfillment by Trade Category">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryDemandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#334155' }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#334155' }} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#06b6d4', borderRadius: '12px', color: '#fff', fontSize: '11px', fontFamily: 'monospace' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94a3b8' }} />
              <Bar dataKey="requests" name="Requested Gigs" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fulfilled" name="Fulfilled by Cooperative" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        {/* Monthly Trend */}
        <Chart title="Monthly Agricultural Labor Volume Trend (2026)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#334155' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#334155' }} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#06b6d4', borderRadius: '12px', color: '#fff', fontSize: '11px', fontFamily: 'monospace' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94a3b8' }} />
              <Area type="monotone" dataKey="demand" name="Total Inbound Demand" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} />
              <Area type="monotone" dataKey="completed" name="Completed Deliveries" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
      </div>

      {/* Regional District Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 tech-glass-card p-6 rounded-2xl border border-cyan-500/20 shadow-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">Regional Geographic Share</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={districtData} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {districtData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#06b6d4', borderRadius: '12px', color: '#fff', fontSize: '11px', fontFamily: 'monospace' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {districtData.map((d, i) => (
              <div key={i} className="flex items-center space-x-1.5 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                <span className="text-slate-400 truncate">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 tech-glass-card p-6 rounded-2xl border border-cyan-500/20 shadow-2xl">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">High Demand vs Shortage Analysis</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">Real-time cooperative worker allocation recommendations</p>
          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-200">Combine Harvester Operators (Punjab & Haryana)</span>
                <span className="text-rose-400 font-bold">Deficit: -18% shortfall</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-200">Drip Irrigation Technicians (Maharashtra)</span>
                <span className="text-emerald-400 font-bold">Optimal: 98% balance</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-200">Cold Chain Electricians (Madhya Pradesh)</span>
                <span className="text-cyan-400 font-bold">Available: +12% surplus capacity</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-200">Grain Silo Construction Masons (Andhra Pradesh)</span>
                <span className="text-amber-400 font-bold">Moderate: -8% shortfall</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}