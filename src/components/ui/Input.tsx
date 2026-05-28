import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-slate-900/50 border ${error ? 'border-red-500' : 'border-white/5'} rounded-lg px-3 py-2 outline-none focus:border-blue-500/50 transition-all text-slate-200 placeholder:text-slate-600 ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] text-red-400 font-bold">{error}</span>}
      {helperText && !error && <span className="text-[10px] text-slate-500">{helperText}</span>}
    </div>
  );
};
