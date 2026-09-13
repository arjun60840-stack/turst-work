import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

function DataTable<T>({ columns, data, onRowClick, isLoading = false, emptyMessage = 'No records found' }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center space-y-3 bg-[#0B1120] rounded-2xl border border-slate-800">
        <div className="relative w-8 h-8">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        </div>
        <span className="text-xs font-mono text-cyan-400">QUERYING TELEMETRY MESH...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center text-slate-500 bg-[#0B1120] rounded-2xl border border-slate-800 border-dashed text-xs font-mono">
        // {emptyMessage.toUpperCase()}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 border-b border-slate-800">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className={`px-6 py-3.5 font-bold ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => onRowClick?.(row)}
              className={`bg-[#0B1120]/40 hover:bg-slate-800/60 hover:text-white transition-all ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                  {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
