import React from 'react';

interface IntroProps {
  onEnter: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 bg-museum-black flex flex-col items-center justify-center z-50 px-6">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        <p className="text-zinc-500 tracking-[0.3em] text-xs md:text-sm uppercase font-sans">
          Est. 1958 &mdash; The NASA Archives
        </p>
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-zinc-100 leading-tight">
          <span className="block mb-2 italic font-light opacity-80">Museum of</span>
          Cosmic Antiquities
        </h1>
        
        <p className="max-w-md mx-auto text-zinc-400 font-serif text-lg md:text-xl leading-relaxed italic opacity-0 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          "For the artifacts of the universe are not lost, merely waiting to be witnessed."
        </p>

        <div className="pt-12 opacity-0 animate-slide-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <button 
            onClick={onEnter}
            className="group relative px-8 py-4 bg-transparent overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors duration-500"
          >
            <span className="relative z-10 text-zinc-300 font-sans text-xs tracking-[0.2em] uppercase group-hover:text-white transition-colors">
              Enter Exhibition
            </span>
            <div className="absolute inset-0 bg-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-zinc-700 text-[10px] tracking-widest uppercase">
        Audio Recommended
      </div>
    </div>
  );
};