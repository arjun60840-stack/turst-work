
import { useQuery } from '@tanstack/react-query';
import { UsersIcon, CheckBadgeIcon, BriefcaseIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function Dashboard() {
  const stats = [
    { title: 'Total Workers', value: '254', icon: <UsersIcon className="w-6 h-6" />, trend: { value: 12, isPositive: true } },
    { title: 'Verified Workers', value: '198', icon: <CheckBadgeIcon className="w-6 h-6" />, trend: { value: 5, isPositive: true } },
    { title: 'Active Jobs', value: '45', icon: <BriefcaseIcon className="w-6 h-6" /> },
    { title: 'Total Revenue', value: '₹1.2M', icon: <CurrencyRupeeIcon className="w-6 h-6" />, trend: { value: 8, isPositive: true } },
  ];

  const pieData = [
    { name: 'Completed', value: 400 },
    { name: 'In Progress', value: 300 },
    { name: 'Pending', value: 300 },
    { name: 'Cancelled', value: 200 },
  ];
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  const barData = [
    { name: 'Electrical', demand: 400 },
    { name: 'Plumbing', demand: 300 },
    { name: 'Carpentry', demand: 200 },
    { name: 'Cleaning', demand: 278 },
    { name: 'Painting', demand: 189 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Jobs by Status">
          <PieChart>
            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Chart>
        
        <Chart title="Demand by Category">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="demand" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </Chart>
      </div>
    </div>
  );
}
