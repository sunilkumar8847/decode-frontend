import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#001525] flex items-center justify-center overflow-hidden">
      {/* Background Animation Canvas */}
      <div className="absolute inset-0 z-0">
        {/* Your existing canvas animation will go here */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
          Decode
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Unveiling the Next Frontier of Intelligence
        </p>
        <p className="text-lg text-[#00B4D8] mb-8">
          October 21, 2025 | Virtual & In-Person
        </p>
        <button className="bg-[#00B4D8] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#0096b4] transition-all">
          Join the Revolution
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-[#00B4D8] text-sm uppercase tracking-widest">Scroll</div>
        <div className="w-0.5 h-8 bg-[#00B4D8] mx-auto mt-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default HeroSection;