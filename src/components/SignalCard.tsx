import React from 'react';
import { Droplet, Users, Wallet } from 'lucide-react';
import type { SignalItem } from '../types';

interface SignalCardProps {
  signal: SignalItem;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const { title, status, statusColor, value, sparkline, iconName } = signal;

  const renderIcon = () => {
    switch (iconName) {
      case 'droplet':
        return <Droplet className="w-4 h-4 text-brand-purpleBright" />;
      case 'users':
        return <Users className="w-4 h-4 text-brand-greenNeon" />;
      case 'wallet':
        return <Wallet className="w-4 h-4 text-brand-purpleBright" />;
      default:
        return <Droplet className="w-4 h-4 text-brand-greenNeon" />;
    }
  };

  // Generate SVG path from sparkline array
  const width = 110;
  const height = 36;
  const maxVal = Math.max(...sparkline);
  const minVal = Math.min(...sparkline);
  const range = maxVal - minVal || 1;

  const points = sparkline.map((val, idx) => {
    const x = (idx / (sparkline.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = statusColor === 'green' ? '#00F58A' : '#D946EF';
  const glowShadow = statusColor === 'green' 
    ? 'drop-shadow-[0_0_8px_rgba(0,245,138,0.8)]' 
    : 'drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]';

  const cardBorderClass = statusColor === 'green' ? 'glass-panel-green' : 'glass-panel-purple';
  const statusTextClass = statusColor === 'green' 
    ? 'text-brand-greenNeon drop-shadow-[0_0_10px_rgba(0,245,138,0.6)]' 
    : 'text-brand-purpleLight drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]';

  return (
    <div className={`${cardBorderClass} rounded-3xl p-6 min-h-[145px] flex items-center justify-between gap-5 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden`}>
      
      {/* Subtle background glow pill */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl pointer-events-none ${statusColor === 'green' ? 'bg-brand-greenNeon/10' : 'bg-brand-purple/15'}`} />

      {/* Left Details */}
      <div className="flex flex-col gap-2 z-10 my-auto">
        <div className="flex items-center gap-2.5 text-slate-300 text-xs font-mono tracking-wider">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            {renderIcon()}
          </div>
          <span className="font-bold">{title}</span>
        </div>

        <div className={`text-2xl sm:text-3xl font-bold font-display tracking-tight leading-none ${statusTextClass}`}>
          {status}
        </div>

        <div className="text-xs font-mono text-slate-400 font-medium">
          {value}
        </div>
      </div>

      {/* Right Stylized Sparkline Chart */}
      <div className="w-28 h-10 flex items-center justify-end z-10 my-auto">
        <svg width={width} height={height} className={`overflow-visible ${glowShadow}`}>
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>

    </div>
  );
};
