import React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

interface AlertProps {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ title, message, type = 'info', onClose }) => {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400'
  };

  const Icon = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle
  }[type];

  return (
    <div className={`p-4 rounded-xl border flex gap-3 ${styles[type]}`}>
      <Icon size={20} className="shrink-0" />
      <div className="flex-1">
        {title && <div className="font-bold text-sm uppercase tracking-wider mb-1">{title}</div>}
        <div className="text-sm opacity-90">{message}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <XCircle size={16} />
        </button>
      )}
    </div>
  );
};
