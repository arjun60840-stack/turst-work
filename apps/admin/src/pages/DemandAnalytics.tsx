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

const COLORS = ['#2563EB', '#059669', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

export default function DemandAnalytics() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Monthly Service Demand" 
          value="1,840 Gigs" 
          icon={<ChartBarIcon className="w-5 h-5 text-blue-600" />} 
          trend={{ value: 29, isPositive: true }} 
        />
        <StatCard 
          title="Kharif Seasonal Surge" 
          value="+42.8%" 
          icon={<ArrowTrendingUpIcon className="w-5 h-5 text-emerald-600" />} 
          trend={{ value: 14, isPositive: true }} 
        />
        <StatCard 
          title="Fulfillment Efficiency" 
          value="93.1%" 
          icon={<SparklesIcon className="w-5 h-5 text-amber-600" />} 
          trend={{ value: 4, isPositive: true }} 
        />
        <StatCard 
          title="Peak District Cluster" 
          value="Nashik & Pune" 
          icon={<MapPinIcon className="w-5 h-5 text-indigo-600" />} 
        />
      </div>

      {/* AI Demand Forecasting Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-900/50">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-blue-600/30 border border-blue-400/30">
            <SparklesIcon className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm">AI Predictive Labor Dispatch (SIH 2026 Engine)</h4>
            <p className="text-xs text-slate-300">
              Forecasting +65% surge in wheat harvesting across Punjab & Haryana next month. Cooperative pre-allocation active.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => alert('AI Forecast recalculated based on satellite weather data and crop harvest calendar.')}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#F1F5F9' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="requests" name="Requested Gigs" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fulfilled" name="Fulfilled by Cooperative" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        {/* Monthly Trend */}
        <Chart title="Monthly Agricultural Labor Volume Trend (2026)">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="demand" name="Total Inbound Demand" stroke="#2563EB" fillOpacity={1} fill="url(#colorDemand)" />
              <Area type="monotone" dataKey="completed" name="Completed Deliveries" stroke="#059669" fillOpacity={1} fill="url(#colorCompleted)" />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
      </div>

      {/* Regional District Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xs border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Regional Geographic Share</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={districtData} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                {districtData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {districtData.map((d, i) => (
              <div key={i} className="flex items-center space-x-1.5 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                <span className="text-slate-600 truncate">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xs border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-800 mb-2">High Demand vs Shortage Analysis</h3>
          <p className="text-xs text-slate-500 mb-4">Real-time cooperative worker allocation recommendations</p>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-800">Combine Harvester Operators (Punjab & Haryana)</span>
                <span className="text-rose-600 font-bold">Deficit: -18% shortfall</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-800">Drip Irrigation Technicians (Maharashtra)</span>
                <span className="text-emerald-600 font-bold">Optimal: 98% balance</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-800">Cold Chain Electricians (Madhya Pradesh)</span>
                <span className="text-blue-600 font-bold">Available: +12% surplus capacity</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-800">Grain Silo Construction Masons (Andhra Pradesh)</span>
                <span className="text-amber-600 font-bold">Moderate: -8% shortfall</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}