import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full pt-6 pb-4">
      <div className="max-w-site mx-auto px-6 sm:px-10 xl:px-14 flex items-center justify-between">
        
        {/* Left: FAILED Logo / Wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-pixel text-lg sm:text-xl tracking-wider text-[#1D103A] font-bold group-hover:opacity-80 transition-opacity">
            FAILED
          </span>
        </Link>

        {/* Right: Minimal Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-semibold tracking-wide text-[#391464]/80">
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
