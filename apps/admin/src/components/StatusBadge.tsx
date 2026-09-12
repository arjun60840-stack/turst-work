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
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
      case 'processing':
      case 'under_review':
      case 'requested':
      case 'matching':
        return 'bg-amber-100 text-amber-700';
      case 'rejected':
      case 'failed':
      case 'cancelled':
      case 'disputed':
        return 'bg-rose-100 text-rose-700';
      case 'active':
      case 'in_progress':
      case 'assigned':
      case 'arriving':
      case 'booked':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const formatStatus = (s: string) => {
    return s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStyles()}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
