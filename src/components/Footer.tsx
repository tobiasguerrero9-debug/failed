import React from 'react';
import { siteConfig } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#05030a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-pixel text-[10px]">
            :)
          </div>
          <span className="font-pixel text-sm tracking-wider text-emerald-400">
            FAILED
          </span>
          <span className="text-slate-400 text-xs font-mono">
            — Most tokens fail. We just measure how.
          </span>
        </div>

        {/* Right Links & Socials */}
        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <a 
            href={siteConfig.links.x} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 transition-colors"
          >
            X (Twitter)
          </a>
          <a 
            href={siteConfig.links.docs} 
            className="hover:text-emerald-400 transition-colors"
          >
            How it Works
          </a>
          <a 
            href={siteConfig.links.app} 
            className="hover:text-emerald-400 transition-colors"
          >
            App
          </a>
        </div>

      </div>
    </footer>
  );
};
