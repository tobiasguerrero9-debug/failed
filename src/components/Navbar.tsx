import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full pt-8 pb-4">
      <div className="max-w-site mx-auto px-8 sm:px-12 xl:px-16 flex items-center justify-between">
        
        {/* Left: FAILED Wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-pixel text-lg sm:text-xl tracking-wider text-[#1D103A] font-bold">
            FAILED
          </span>
        </Link>

        {/* Right: Minimal Links */}
        <nav className="flex items-center gap-8 text-sm font-semibold tracking-wide text-[#5B4B8A]">
          <a 
            href="#data" 
            className="hover:text-[#1D103A] transition-colors"
          >
            Data
          </a>
          <a 
            href="#docs" 
            className="hover:text-[#1D103A] transition-colors"
          >
            Docs
          </a>
          <a 
            href={siteConfig.links.x} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#1D103A] transition-colors"
          >
            X
          </a>
        </nav>

      </div>
    </header>
  );
};
