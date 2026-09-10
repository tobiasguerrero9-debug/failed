import React, { useState } from 'react';
import { MascotScanner } from './MascotScanner';
import type { ScanState } from './MascotScanner';
import { TokenInput } from './TokenInput';

export const HeroScanner: React.FC = () => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = (_address: string) => {
    setScanState('scanning');
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanState('result');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  return (
    <section className="relative w-full pt-4 pb-16 flex flex-col items-center justify-center">
      
      {/* 3D Computer Mascot with Dynamic CRT Scanner Screen */}
      <MascotScanner 
        scanState={scanState} 
        scanProgress={scanProgress} 
      />

      {/* Token Input Bar Directly Below Computer */}
      <TokenInput 
        onScan={handleScan} 
        isScanning={scanState === 'scanning'} 
      />

    </section>
  );
};
