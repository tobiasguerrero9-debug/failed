import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const DocsSection: React.FC = () => {
  return (
    <section id="docs" className="w-full max-w-site mx-auto px-6 sm:px-10 xl:px-14 py-16 border-t border-purple-200/50">
      <div className="max-w-3xl space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D103A]">
            Docs
          </h2>
          <p className="text-base sm:text-lg text-[#6B5A94] font-medium mt-1">
            How FAILED measures onchain risk.
          </p>
        </div>

        {/* 3 Clean Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm">
          <a
            href="#methodology"
            className="p-5 rounded-2xl bg-white/70 hover:bg-white border border-purple-200/60 transition-all flex flex-col justify-between gap-3 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1D103A]">Score methodology</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-xs text-[#6B5A94]">Weighted risk vectors & failure thresholds.</p>
          </a>

          <a
            href="#signals-doc"
            className="p-5 rounded-2xl bg-white/70 hover:bg-white border border-purple-200/60 transition-all flex flex-col justify-between gap-3 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1D103A]">Signals guide</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-xs text-[#6B5A94]">Detailed telemetry parameters.</p>
          </a>

          <a
            href="#risk-model"
            className="p-5 rounded-2xl bg-white/70 hover:bg-white border border-purple-200/60 transition-all flex flex-col justify-between gap-3 group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1D103A]">Risk model</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-xs text-[#6B5A94]">Onchain failure classification engine.</p>
          </a>
        </div>

      </div>
    </section>
  );
};
