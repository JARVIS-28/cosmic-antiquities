import React, { useEffect } from 'react';
import { Artifact } from '../types';
import { Icons } from './Icons';

interface ArtifactDetailProps {
  artifact: Artifact;
  onClose: () => void;
}

export const ArtifactDetail: React.FC<ArtifactDetailProps> = ({ artifact, onClose }) => {
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-museum-black/95 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative w-full max-w-6xl h-full md:h-[90vh] bg-zinc-900/30 flex flex-col md:flex-row overflow-hidden border border-zinc-800 shadow-2xl animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-zinc-400 hover:text-white bg-black/50 rounded-full backdrop-blur-md transition-colors"
        >
          <Icons.Close className="w-6 h-6" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={artifact.imageUrl} 
            alt={artifact.title}
            className="max-w-full max-h-full object-contain p-4"
          />
          <div className="absolute bottom-4 left-4 text-xs text-zinc-500 font-mono">
            ID: {artifact.id}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto bg-museum-dark border-l border-zinc-800">
          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <span className="text-zinc-500 text-xs tracking-widest uppercase font-mono border-b border-zinc-800 pb-1 inline-block">
                {artifact.date}
              </span>
              <h2 className="text-3xl font-serif text-zinc-100 leading-none">
                {artifact.title}
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-zinc-400 font-sans leading-relaxed text-sm md:text-base border-l-2 border-zinc-800 pl-4">
                {artifact.description}
              </p>
            </div>

            {artifact.type === 'news' && artifact.sourceUrl && (
              <a 
                href={artifact.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-museum-gold hover:text-yellow-400 transition-colors uppercase tracking-widest text-xs font-medium mt-4"
              >
                <span>Read Full Transmission</span>
                <Icons.ExternalLink className="w-4 h-4" />
              </a>
            )}

            {artifact.keywords.length > 0 && (
              <div className="pt-8 space-y-2">
                <h3 className="text-xs uppercase tracking-widest text-zinc-600">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {artifact.keywords.slice(0, 8).map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-zinc-400 border border-zinc-800 px-2 py-1 hover:border-zinc-600 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};