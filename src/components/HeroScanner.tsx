import React from 'react';
import { MascotScanner } from './MascotScanner';
import { TokenInput } from './TokenInput';

export const HeroScanner: React.FC = () => {
  const handleScan = (_address: string) => {
    // Clean trigger
  };

  return (
    <section className="relative w-full max-w-site mx-auto px-6 sm:px-10 xl:px-14 pt-4 pb-20 flex flex-col items-center justify-center">
      
      {/* Centered Clean Composition: Mascot -> Token Input directly below */}
      <div className="w-full flex flex-col items-center justify-center">
        
        {/* Large 3D Computer Mascot (Centered) */}
        <MascotScanner />

        {/* Token Input Bar Directly Below Computer */}
        <TokenInput onScan={handleScan} />

      </div>

    </section>
  );
};
