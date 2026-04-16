import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  gradient: string;
  iconBg: string;
}

const StatCard = ({ title, value, icon, change, changeType, gradient, iconBg }: StatCardProps) => {
  const changeColor =
    changeType === 'up' ? 'text-emerald-500' :
    changeType === 'down' ? 'text-red-500' : 'text-gray-400';

  return (
    <div className={`relative rounded-2xl p-5 text-white overflow-hidden shadow-lg ${gradient}`}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 translate-y-6 -translate-x-6" />
      <div className="relative z-10">
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {change && (
          <p className={`text-xs mt-1 font-medium ${changeColor} bg-white/10 rounded-full px-2 py-0.5 inline-block`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
