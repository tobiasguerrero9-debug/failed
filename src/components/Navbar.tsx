import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X as CloseIcon } from 'lucide-react';
import { siteConfig } from '../config/site';

interface NavbarProps {
  onLaunchApp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLaunchClick = () => {
    if (onLaunchApp) {
      onLaunchApp();
    } else {
      navigate(siteConfig.links.app);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#05030D]/75 border-b border-white/5">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        
        {/* Left: FAILED Logo / Wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-brand-greenNeon/20 border border-brand-greenNeon/50 flex items-center justify-center text-brand-greenNeon font-pixel text-xs shadow-[0_0_15px_rgba(0,245,138,0.4)] group-hover:scale-105 transition-transform">
            :)
          </div>
          <span className="font-pixel text-lg tracking-wider text-brand-greenNeon text-pixel-glow-green">
            FAILED
          </span>
        </Link>

        {/* Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-slate-200">
          {siteConfig.navItems.map((item) => (
            item.isExternal ? (
              <a 
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-greenNeon transition-colors font-semibold"
              >
                {item.label}
              </a>
            ) : (
              <a 
                key={item.label}
                href={item.href}
                className="hover:text-brand-greenNeon transition-colors font-semibold"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Primary CTA with High Contrast */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleLaunchClick}
            className="group px-5 py-2.5 rounded-full bg-brand-greenNeon text-[#05030D] font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,245,138,0.6)] hover:shadow-[0_0_30px_rgba(0,245,138,0.85)] transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={handleLaunchClick}
            className="px-3.5 py-1.5 rounded-full bg-brand-greenNeon text-[#05030D] font-extrabold text-xs uppercase tracking-wider flex items-center gap-1"
          >
            App
            <ArrowRight className="w-3 h-3 stroke-[3]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090616] border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-4">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 text-base font-medium py-2 hover:text-brand-greenNeon border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
