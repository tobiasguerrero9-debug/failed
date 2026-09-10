import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SignalCard } from '../components/SignalCard';
import { FailureFeed } from '../components/FailureFeed';
import { Footer } from '../components/Footer';
import { MOCK_SIGNALS } from '../data/mockFailedTokens';
import { Activity, ShieldCheck, Cpu, AlertTriangle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05030D] text-slate-100 flex flex-col selection:bg-brand-greenNeon selection:text-slate-950">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 space-y-16 lg:space-y-20">
        
        {/* 1. CINEMATIC HERO SECTION */}
        <Hero />

        {/* 2. SIGNALS ROW (3 Cards, Starting Immediately Below Hero) */}
        <section id="signals" className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="mb-4 flex items-center justify-between px-1">
            <h2 className="text-xs font-mono tracking-[0.25em] text-slate-400 uppercase font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-greenNeon" />
              ONCHAIN FAILURE SIGNALS
            </h2>
            <span className="text-xs font-mono text-brand-greenNeon/80 font-medium">3 Core Indicators</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_SIGNALS.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </section>

        {/* 3. SLIM VISUAL "HOW IT WORKS" UI STRIP (3 COMPACT STEPS) */}
        <section id="how-it-works" className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Step 01: SIGNALS */}
            <div className="glass-panel rounded-3xl p-6 border border-brand-greenNeon/25 relative overflow-hidden flex flex-col justify-between gap-4 group hover:border-brand-greenNeon/50 transition-all min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-xs text-brand-greenNeon tracking-wider">
                  01 SIGNALS
                </span>
                <Cpu className="w-4.5 h-4.5 text-brand-greenNeon/70" />
              </div>
              <p className="text-xs font-mono text-slate-300 leading-relaxed font-medium">
                Onchain wallet, liquidity, holder, and volume telemetry.
              </p>
            </div>

            {/* Step 02: ALGORITHM */}
            <div className="glass-panel rounded-3xl p-6 border border-brand-purpleBright/30 relative overflow-hidden flex flex-col justify-between gap-4 group hover:border-brand-purpleBright/60 transition-all min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-xs text-brand-purpleBright tracking-wider">
                  02 ALGORITHM
                </span>
                <ShieldCheck className="w-4.5 h-4.5 text-brand-purpleBright/70" />
              </div>
              <p className="text-xs font-mono text-slate-300 leading-relaxed font-medium">
                Risk weighting turns raw signals into a simple score.
              </p>
            </div>

            {/* Step 03: OUTCOME */}
            <div className="glass-panel rounded-3xl p-6 border border-brand-greenNeon/25 relative overflow-hidden flex flex-col justify-between gap-4 group hover:border-brand-greenNeon/50 transition-all min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-xs text-brand-greenNeon tracking-wider">
                  03 OUTCOME
                </span>
                <AlertTriangle className="w-4.5 h-4.5 text-brand-greenNeon/70" />
              </div>
              <p className="text-xs font-mono text-slate-300 leading-relaxed font-medium">
                Get a Failure Score before becoming exit liquidity.
              </p>
            </div>

          </div>
        </section>

        {/* 4. WHAT FAILED? (3 Demo Rows Capsule Feed) */}
        <section id="feed" className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full pb-14">
          <FailureFeed />
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
