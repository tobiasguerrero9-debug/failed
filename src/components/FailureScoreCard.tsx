import React from 'react';
import { XCircle } from 'lucide-react';
import { HERO_SCORE_PREVIEW } from '../data/mockFailedTokens';

export const FailureScoreCard: React.FC = () => {
  const { score, maxScore, verdict, subtext } = HERO_SCORE_PREVIEW;

  // Equalizer spectrum bars simulation matching visual reference
  const totalBars = 22;
  const activeBars = Math.round((score / maxScore) * totalBars);

  return (
    <div className="glass-panel-purple rounded-3xl p-6 sm:p-7 border border-brand-purpleBright/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(123,63,242,0.3)] backdrop-blur-xl w-full max-w-[290px] sm:max-w-[320px] flex flex-col gap-5 relative overflow-hidden group hover:border-brand-greenNeon/50 transition-all duration-300">
      
      {/* Background radial glow accents */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-greenNeon/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-brand-purple/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header Label */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.22em] text-slate-400 uppercase font-bold">
          FAILURE SCORE
        </span>
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-greenNeon opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-greenNeon"></span>
        </span>
      </div>

      {/* Score Number Display */}
      <div className="flex items-baseline gap-2 pt-1">
        <span className="font-pixel text-5xl sm:text-6xl text-brand-greenNeon tracking-tight text-pixel-glow-green leading-none">
          {score}
        </span>
        <span className="font-pixel text-2xl text-brand-greenMint/60">
          /{maxScore}
        </span>
      </div>

      {/* Verdict Pill */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c0c38] border border-brand-purpleBright/60 text-brand-purpleLight text-xs font-semibold shadow-[0_0_15px_rgba(169,92,255,0.35)]">
          <XCircle className="w-3.5 h-3.5 text-brand-purpleBright fill-[#1c0c38]" />
          <span>{verdict}</span>
        </div>
      </div>

      {/* Segmented Equalizer Spectrum Bar */}
      <div className="flex items-end justify-between gap-1 h-8 px-2 py-1 rounded-xl bg-black/60 border border-white/10">
        {Array.from({ length: totalBars }).map((_, index) => {
          const isActive = index < activeBars;
          const ratio = index / totalBars;
          const heightPercent = 35 + Math.sin(index * 0.45) * 30 + (ratio * 35);

          let barBg = 'bg-slate-800/80';
          if (isActive) {
            if (ratio < 0.35) {
              barBg = 'bg-brand-greenNeon shadow-[0_0_6px_rgba(0,245,138,0.8)]';
            } else if (ratio < 0.7) {
              barBg = 'bg-brand-purpleBright shadow-[0_0_6px_rgba(169,92,255,0.8)]';
            } else {
              barBg = 'bg-pink-500 shadow-[0_0_6px_rgba(217,70,239,0.8)]';
            }
          }

          return (
            <div
              key={index}
              className={`w-full rounded-xs transition-all duration-300 ${barBg}`}
              style={{ height: `${heightPercent}%` }}
            />
          );
        })}
      </div>

      {/* Bottom Subtext */}
      <div className="pt-1 border-t border-white/5">
        <p className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-medium text-center">
          {subtext}
        </p>
      </div>

    </div>
  );
};
