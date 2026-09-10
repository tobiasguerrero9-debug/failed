import React from 'react';

export const MascotScanner: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[680px] mx-auto select-none">
      
      {/* Soft Bottom Floor Contact Shadow */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[75%] h-14 bg-[#1D103A]/20 rounded-[100%] blur-xl pointer-events-none" />

      {/* High-Resolution 1024x1024 Sharp 3D Computer Mascot */}
      <div className="relative z-10 w-full flex justify-center">
        <img
          src="/assets/mascot-v2.png"
          alt="FAILED 3D Retro Computer Mascot"
          className="w-full h-auto object-contain bg-transparent border-0 outline-none select-none"
          loading="eager"
          decoding="async"
        />

        {/* Clean CRT Screen Overlay — GREEN SMILE ONLY */}
        <div 
          className="absolute rounded-[12%] flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none"
          style={{
            top: '21.5%',
            left: '32%',
            width: '37%',
            height: '31%'
          }}
        >
          {/* Green Pixel Smile Only */}
          <div className="font-pixel text-4xl sm:text-6xl text-crt-green tracking-widest animate-pulse">
            :)
          </div>
        </div>

      </div>

    </div>
  );
};
