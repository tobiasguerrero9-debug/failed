import React from 'react';

export const MascotScanner: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[580px] sm:max-w-[660px] lg:max-w-[700px] mx-auto select-none">
      
      {/* 100% Exact 3D Computer Mascot Asset from Reference */}
      <div className="relative z-10 w-full flex justify-center">
        <img
          src="/assets/exact-computer.png"
          alt="FAILED 3D Retro Computer Scanner"
          className="w-full h-auto object-contain bg-transparent border-0 outline-none select-none"
          loading="eager"
          decoding="async"
        />
      </div>

    </div>
  );
};
