import React from 'react';
import { ArrowUpRight, Flame } from 'lucide-react';
import type { FailedToken } from '../types';
import { MOCK_FAILED_TOKENS } from '../data/mockFailedTokens';

interface FailureFeedProps {
  tokens?: FailedToken[];
  onViewAll?: () => void;
}

export const FailureFeed: React.FC<FailureFeedProps> = ({ 
  tokens = MOCK_FAILED_TOKENS,
  onViewAll 
}) => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-purpleBright/20 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(123,63,242,0.15)]">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-greenNeon animate-pulse" />
          <h2 className="text-xl font-bold font-display text-white tracking-tight">
            What Failed?
          </h2>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            — Recent Onchain Telemetry
          </span>
        </div>

        <button 
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-brand-greenNeon hover:text-brand-greenMint transition-colors group cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Stylized Rounded Row Capsules */}
      <div className="flex flex-col gap-3.5">
        {tokens.slice(0, 3).map((item) => (
          <div 
            key={item.id}
            className="rounded-2xl p-4 sm:p-5 bg-white/[0.02] border border-white/5 hover:border-brand-greenNeon/40 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-between gap-4 group"
          >
            {/* Token & Rank */}
            <div className="flex items-center gap-4 min-w-0">
              <span className="font-mono text-xs text-slate-500 font-bold w-4">
                #{item.rank}
              </span>
              <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 p-0.5"
                loading="lazy"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-white font-display text-base group-hover:text-brand-greenNeon transition-colors truncate">
                  {item.name}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {item.symbol}
                </span>
              </div>
            </div>

            {/* Chain Badge */}
            <div className="hidden sm:flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-slate-300">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.chainColor }}
                />
                {item.chain}
              </span>
            </div>

            {/* Score & Time to Fail */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Time to Fail
                </span>
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  {item.timeToFail}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1c0c38] border border-brand-purpleBright/50 text-brand-purpleLight font-pixel text-xs shadow-[0_0_12px_rgba(169,92,255,0.3)]">
                <Flame className="w-3.5 h-3.5 text-pink-400" />
                <span>{item.failureScore}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
