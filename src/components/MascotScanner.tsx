import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';

export type ScanState = 'idle' | 'scanning' | 'result';

interface MascotScannerProps {
  scanState: ScanState;
  scanProgress?: number; // 0 to 100
}

export const MascotScanner: React.FC<MascotScannerProps> = ({ 
  scanState, 
  scanProgress = 0 
}) => {
  const [logIndex, setLogIndex] = useState(0);

  const scanLogs = [
    "> Analyzing contract...",
    "> Checking liquidity...",
    "> Scanning holders...",
    "> Almost there..._"
  ];

  useEffect(() => {
    if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setLogIndex((prev) => (prev < scanLogs.length - 1 ? prev + 1 : prev));
      }, 600);
      return () => clearInterval(interval);
    } else {
      setLogIndex(0);
    }
  }, [scanState]);

  // Compute progress bar blocks (10 total blocks)
  const totalBlocks = 10;
  const filledBlocks = Math.round((scanProgress / 100) * totalBlocks);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[620px] sm:max-w-[700px] lg:max-w-[760px] mx-auto select-none">
      
      {/* Soft Bottom Shadow Pool */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-[#1D103A]/20 rounded-[100%] blur-xl pointer-events-none" />

      {/* 3D Computer Mascot Container */}
      <div className="relative z-10 w-full flex justify-center">
        <img
          src="/assets/mascot-v2.png"
          alt="FAILED 3D Computer Mascot Scanner"
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(123,63,242,0.25)]"
          loading="eager"
          decoding="async"
        />

        {/* Dynamic CRT Screen Overlay Container */}
        {/* Exact positioning matching CRT monitor bezel display area */}
        <div className="absolute top-[18.5%] left-[23.5%] w-[53.5%] h-[41%] rounded-[8%/10%] crt-screen-bg p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden border border-emerald-500/30 shadow-[inset_0_0_20px_rgba(0,255,102,0.2)]">
          
          {/* STATE 1: IDLE */}
          {scanState === 'idle' && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-crt-green">
              <div className="font-pixel text-4xl sm:text-6xl tracking-widest animate-pulse">
                :)
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-emerald-400/70 uppercase tracking-widest pt-2">
                READY TO SCAN
              </div>
            </div>
          )}

          {/* STATE 2: SCANNING (Matching Reference Image Exactly!) */}
          {scanState === 'scanning' && (
            <div className="w-full h-full flex flex-col justify-between text-crt-green font-mono leading-tight">
              
              {/* Header: Scanning... & Smiley in Corner */}
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="font-mono font-bold text-sm sm:text-base tracking-wide text-emerald-300">
                    Scanning...
                  </div>
                  {/* Visual Progress Bar [██████░░░░] */}
                  <div className="font-mono text-xs sm:text-sm text-emerald-400 tracking-tighter">
                    {'█'.repeat(filledBlocks)}
                    <span className="opacity-30">{'█'.repeat(totalBlocks - filledBlocks)}</span>
                  </div>
                </div>

                {/* Corner Smiley */}
                <div className="font-pixel text-xl sm:text-2xl text-emerald-400 animate-pulse">
                  :)
                </div>
              </div>

              {/* Terminal Log Lines */}
              <div className="space-y-1 text-[10px] sm:text-xs text-emerald-400/90 pt-2 font-mono">
                {scanLogs.slice(0, logIndex + 1).map((log, i) => (
                  <div key={i} className="truncate">
                    {log}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* STATE 3: RESULT */}
          {scanState === 'result' && (
            <div className="w-full h-full flex flex-col justify-between text-crt-green p-1">
              
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[11px] font-mono tracking-widest text-emerald-400/70 uppercase font-semibold">
                  FAILURE SCORE
                </span>
                <span className="font-pixel text-xs text-emerald-400">:)</span>
              </div>

              <div className="flex items-baseline gap-1 py-0.5">
                <span className="font-pixel text-3xl sm:text-5xl text-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,102,0.8)]">
                  82
                </span>
                <span className="font-pixel text-sm sm:text-lg text-emerald-500/60">
                  /100
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300 text-[10px] sm:text-xs font-semibold self-start">
                <XCircle className="w-3 h-3 text-purple-400" />
                <span>Probably Failed</span>
              </div>

              {/* Multi-segment equalizer bar */}
              <div className="flex items-end justify-between gap-0.5 h-4 px-1 py-0.5 rounded bg-black/60 border border-emerald-500/20">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-full rounded-xs ${idx < 13 ? (idx < 5 ? 'bg-emerald-400' : idx < 10 ? 'bg-purple-400' : 'bg-pink-500') : 'bg-slate-800'}`}
                    style={{ height: `${30 + (idx % 5) * 15}%` }}
                  />
                ))}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
