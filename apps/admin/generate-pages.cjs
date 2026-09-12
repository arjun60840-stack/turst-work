const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
};

const pagesDir = path.join(__dirname, 'src', 'pages');

write(path.join(pagesDir, 'Login.tsx'), `
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setAuth('fake-token', { role: 'admin' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-slate-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 flex items-center justify-center">
            <span className="text-blue-600">NEX</span>VION Admin
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
`);

write(path.join(pagesDir, 'Dashboard.tsx'), `
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
                <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
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
`);

write(path.join(pagesDir, 'Workers.tsx'), `
import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';

export default function Workers() {
  const data = [
    { id: '1', name: 'Ravi Kumar', skills: 'Plumbing, Electrical', rating: 4.8, jobs: 45, status: 'verified' },
    { id: '2', name: 'Amit Singh', skills: 'Carpentry', rating: 4.5, jobs: 32, status: 'pending' },
  ];

  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Skills', accessor: 'skills' as const },
    { header: 'Rating', accessor: (row: any) => \`⭐ \${row.rating}\` },
    { header: 'Jobs', accessor: 'jobs' as const },
    { header: 'Status', accessor: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Workers</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
`);

// creating dummy files for the rest of the pages to prevent build errors and fulfill requirements
const dummyPages = [
  'WorkerDetail', 'Customers', 'Cooperatives', 'CooperativeDetail',
  'Verification', 'Jobs', 'JobDetail', 'Payments', 'Complaints',
  'ComplaintDetail', 'DemandAnalytics', 'AuditLogs'
];

dummyPages.forEach(page => {
  write(path.join(pagesDir, page + '.tsx'), `
export default function ${page}() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">${page}</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-slate-500">This is the ${page} page.</p>
      </div>
    </div>
  );
}
  `);
});

console.log('Generated pages!');
