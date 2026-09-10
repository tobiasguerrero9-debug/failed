import React from 'react';

interface MascotProps {
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      
      {/* Floor Green & Purple Reflection Pool */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-24 bg-gradient-to-r from-brand-greenNeon/30 via-brand-purpleBright/20 to-brand-greenMint/20 rounded-[100%] blur-2xl pointer-events-none opacity-80" />

      {/* Behind-Screen Radial Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[320px] h-[320px] bg-brand-greenNeon/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      
      {/* Floating Transparent 3D Computer Asset */}
      <div className="relative z-10 animate-float-slow transform hover:scale-[1.02] transition-transform duration-500 flex justify-center">
        <img
          src="/assets/mascot-transparent.png"
          alt="FAILED Retro 3D Computer Mascot"
          className="w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,245,138,0.25)] drop-shadow-[0_0_60px_rgba(123,63,242,0.35)]"
          loading="eager"
          decoding="async"
        />

        {/* Soft CRT Screen Inner Glow Overlay */}
        <div className="absolute top-[21%] left-[24%] w-[52%] h-[40%] pointer-events-none rounded-[10%] bg-brand-greenNeon/15 blur-md animate-pulse-glow" />
      </div>

    </div>
  );
};
