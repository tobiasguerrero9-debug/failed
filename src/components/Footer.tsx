import React from 'react';
import { siteConfig } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-purple-200/50 py-10 bg-[#E5DFFF]">
      <div className="max-w-site mx-auto px-6 sm:px-10 xl:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#6B5A94]">
        
        <div className="flex items-center gap-3">
          <span className="font-pixel text-sm font-bold text-[#1D103A]">FAILED</span>
          <span>— Most tokens fail. We just measure how.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#data" className="hover:text-[#1D103A] transition-colors">Data</a>
          <a href="#docs" className="hover:text-[#1D103A] transition-colors">Docs</a>
          <a href={siteConfig.links.x} target="_blank" rel="noopener noreferrer" className="hover:text-[#1D103A] transition-colors">X</a>
        </div>

      </div>
    </footer>
  );
};
