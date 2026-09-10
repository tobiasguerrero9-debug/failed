import React from 'react';

export const DataSection: React.FC = () => {
  return (
    <section id="data" className="w-full max-w-site mx-auto px-6 sm:px-10 xl:px-14 py-16 border-t border-purple-200/50">
      <div className="max-w-3xl space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D103A]">
            Data
          </h2>
          <p className="text-base sm:text-lg text-[#6B5A94] font-medium mt-1">
            Signals behind the score.
          </p>
        </div>

        {/* 4 Simple Text Rows */}
        <div className="divide-y divide-purple-200/60 font-mono text-sm sm:text-base">
          <div className="py-4 flex items-center justify-between">
            <span className="font-semibold text-[#1D103A]">Liquidity depth & decay</span>
            <span className="text-[#6B5A94] text-xs sm:text-sm font-medium">Weak ($12.4K LP)</span>
          </div>

          <div className="py-4 flex items-center justify-between">
            <span className="font-semibold text-[#1D103A]">Holder concentration</span>
            <span className="text-[#6B5A94] text-xs sm:text-sm font-medium">High (78% top 10)</span>
          </div>

          <div className="py-4 flex items-center justify-between">
            <span className="font-semibold text-[#1D103A]">Dev wallet activity</span>
            <span className="text-[#6B5A94] text-xs sm:text-sm font-medium">Moving (Last active 2h ago)</span>
          </div>

          <div className="py-4 flex items-center justify-between">
            <span className="font-semibold text-[#1D103A]">Volume behavior</span>
            <span className="text-[#6B5A94] text-xs sm:text-sm font-medium">Anomalous (3.4x spike)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
