import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Mascot } from './Mascot';
import { FailureScoreCard } from './FailureScoreCard';

interface HeroProps {
  onLaunchApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchApp }) => {
  const navigate = useNavigate();

  const handleLaunchClick = () => {
    if (onLaunchApp) {
      onLaunchApp();
    } else {
      navigate(siteConfig.links.app);
    }
  };

  const handleLearnMore = () => {
    const el = document.getElementById('signals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[720px] lg:min-h-[820px] flex items-center justify-center cinematic-hero-bg pt-10 pb-16 overflow-hidden">
      
      {/* Background Starfield */}
      <div className="absolute inset-0 stars-overlay pointer-events-none" />

      {/* Top Right Planet Arc Horizon Element */}
      <div className="planet-arc hidden md:block" />

      {/* Distant Atmospheric Mountain Silhouette Background SVG */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden leading-none opacity-40 z-0">
        <svg 
          viewBox="0 0 1440 220" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto min-w-[1000px]"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 220L80 180L180 205L280 140L390 190L510 130L650 175L780 110L920 165L1060 120L1200 185L1340 145L1440 180V220H0Z" 
            fill="url(#mountainGrad)" 
          />
          <defs>
            <linearGradient id="mountainGrad" x1="720" y1="100" x2="720" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#391464" stopOpacity="0.8" />
              <stop offset="1" stopColor="#05030D" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full z-10">
        
        {/* Desktop 3-Column Visual Scene Composition: Headline (Left) -> Mascot (Center) -> Failure Score (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[640px]">
          
          {/* LEFT 35-40%: FAILED Headline & Copy */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6 text-left z-20 order-1">
            
            {/* Supporting Tagline */}
            <div>
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-brand-purpleLight font-semibold uppercase">
                {siteConfig.tagline}
              </span>
            </div>

            {/* Giant Block Pixel Typography: FAILED */}
            <h1 className="font-pixel text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight text-pixel-glow-green leading-none py-1">
              FAILED
            </h1>

            {/* Primary Copy */}
            <div className="space-y-2 max-w-lg">
              <p className="text-2xl sm:text-3xl xl:text-4xl font-display font-bold text-white leading-snug">
                Most tokens fail.
              </p>
              <p className="text-2xl sm:text-3xl xl:text-4xl font-display font-bold text-brand-greenMint leading-snug">
                We just measure how.
              </p>
            </div>

            {/* CTAs with Maximum Contrast Readability */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleLaunchClick}
                className="group px-8 py-4 rounded-full bg-brand-greenNeon text-[#05030D] font-black text-sm uppercase tracking-wider shadow-neon-green hover:shadow-[0_0_40px_rgba(0,245,138,0.9)] transition-all duration-300 hover:scale-105 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleLearnMore}
                className="px-7 py-4 rounded-full bg-[#160b2b]/80 border border-brand-purpleBright/60 text-brand-purpleLight hover:text-white hover:border-brand-purpleLight font-bold text-sm tracking-wide transition-all duration-300 hover:bg-brand-purpleDark/60 flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <span>Learn More</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
            </div>

          </div>

          {/* CENTER 40-45%: Large 3D Retro Computer Mascot */}
          <div className="lg:col-span-4 xl:col-span-4 flex items-center justify-center relative order-2 lg:order-2">
            <Mascot className="w-full" />
          </div>

          {/* RIGHT 20-25%: Failure Score Card Floating beside the Mascot */}
          <div className="lg:col-span-3 xl:col-span-3 flex items-center justify-center lg:justify-end z-20 order-3 lg:order-3">
            <FailureScoreCard />
          </div>

        </div>

      </div>
    </section>
  );
};
