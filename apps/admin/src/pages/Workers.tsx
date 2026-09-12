
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
    { header: 'Rating', accessor: (row: any) => `⭐ ${row.rating}` },
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
