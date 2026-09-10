import React from 'react';
import { MascotScanner } from './MascotScanner';
import { TokenInput } from './TokenInput';

export const HeroScanner: React.FC = () => {
  const handleScan = (_address: string) => {
    // Action trigger
  };

  return (
    <section className="relative w-full max-w-site mx-auto px-6 sm:px-10 xl:px-14 pt-2 pb-16 flex flex-col items-center justify-center">
      
      {/* Centered Composition: Mascot -> Token Input directly below */}
      <div className="w-full flex flex-col items-center justify-center">
        
        {/* Exact 3D Computer Mascot (Centered) */}
        <MascotScanner />

        {/* Token Input Bar Directly Below Computer */}
        <TokenInput onScan={handleScan} />

      </div>

    </section>
  );
};
