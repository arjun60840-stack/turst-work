import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'completed':
      case 'paid':
      case 'resolved':
        return 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-xs shadow-emerald-500/10';
      case 'pending':
      case 'processing':
      case 'under_review':
      case 'requested':
      case 'matching':
        return 'bg-amber-950/80 text-amber-400 border border-amber-500/40 shadow-xs shadow-amber-500/10';
      case 'rejected':
      case 'failed':
      case 'cancelled':
      case 'disputed':
        return 'bg-rose-950/80 text-rose-400 border border-rose-500/40 shadow-xs shadow-rose-500/10';
      case 'active':
      case 'in_progress':
      case 'assigned':
      case 'arriving':
      case 'booked':
        return 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-xs shadow-cyan-500/10';
      default:
        return 'bg-slate-900 text-slate-400 border border-slate-700';
    }
  };

  const formatStatus = (s: string) => {
    return s.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wide inline-flex items-center ${getStyles()}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 opacity-80"></span>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
