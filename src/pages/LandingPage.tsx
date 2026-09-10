import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroScanner } from '../components/HeroScanner';
import { DataSection } from '../components/DataSection';
import { DocsSection } from '../components/DocsSection';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen lavender-bg text-[#1D103A] flex flex-col selection:bg-scanLime selection:text-[#0F2600]">
      
      {/* 1. Minimal Header */}
      <Navbar />

      {/* 2. Hero Scanner (3D Computer + CRT Screen + Token Input) */}
      <main className="flex-1">
        <HeroScanner />

        {/* 3. Data Section */}
        <DataSection />

        {/* 4. Docs Section */}
        <DocsSection />
      </main>

      {/* 5. Minimal Footer */}
      <Footer />

    </div>
  );
};
