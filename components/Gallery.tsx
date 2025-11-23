import React, { useState, useEffect } from 'react';
import { Artifact, CollectionType } from '../types';
import { searchNasaArchive } from '../services/nasa';
import { fetchSpaceNews } from '../services/news';
import { ArtifactDetail } from './ArtifactDetail';
import { Loader } from './Loader';
import { Icons } from './Icons';
import { COLLECTIONS } from '../constants';

interface GalleryProps {
  initialCollection: CollectionType;
  onReturnHome: () => void;
}

const NEWS_FILTERS = ['All', 'USA', 'Europe', 'Russia', 'China', 'India', 'Japan'];

export const Gallery: React.FC<GalleryProps> = ({ initialCollection, onReturnHome }) => {
  const [activeCollectionId, setActiveCollectionId] = useState<CollectionType>(initialCollection);
  const [activeNewsFilter, setActiveNewsFilter] = useState('All');
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeCollection = COLLECTIONS.find(c => c.id === activeCollectionId) || {
    label: activeCollectionId === 'news' ? 'Live Transmissions' : 'Unknown',
    description: activeCollectionId === 'news' ? 'Real-time updates from space agencies across the globe.' : ''
  };

  useEffect(() => {
    loadCollection(activeCollectionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCollectionId, activeNewsFilter]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const loadCollection = async (id: CollectionType, customQuery?: string) => {
    setLoading(true);
    
    try {
      let results: Artifact[] = [];

      if (id === 'news') {
        results = await fetchSpaceNews(activeNewsFilter);
      } else {
        const collection = COLLECTIONS.find(c => c.id === id);
        const query = customQuery || collection?.query || 'space';
        results = await searchNasaArchive(query);
      }
      
      setArtifacts(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setActiveCollectionId('search');
    loadCollection('search', searchQuery);
    setIsSearchOpen(false);
  };

  const handleCollectionChange = (id: CollectionType) => {
    setActiveCollectionId(id);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-museum-black text-zinc-200 font-sans">
      
      {/* Header / Nav */}
      <nav className="sticky top-0 z-40 bg-museum-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span 
              onClick={onReturnHome}
              className="font-serif text-lg md:text-xl tracking-wide text-zinc-100 cursor-pointer hover:text-white transition-colors"
            >
              Cosmic Antiquities
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {COLLECTIONS.map(col => (
                <button
                  key={col.id}
                  onClick={() => handleCollectionChange(col.id as CollectionType)}
                  className={`text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeCollectionId === col.id 
                      ? 'text-zinc-100 border-b border-zinc-100 pb-1' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {col.label}
                </button>
              ))}
              
              <div className="w-px h-4 bg-zinc-800 mx-2"></div>
              
              <button
                onClick={() => {
                  setActiveCollectionId('news');
                  setActiveNewsFilter('All');
                  window.scrollTo(0, 0);
                }}
                className={`text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1 ${
                  activeCollectionId === 'news'
                    ? 'text-museum-gold border-b border-museum-gold pb-1' 
                    : 'text-zinc-400 hover:text-museum-gold'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1"></span>
                News
              </button>
            </div>

            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Search Archive"
            >
              <Icons.Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-museum-black flex flex-col animate-fade-in">
          <div className="px-4 h-16 flex items-center justify-between border-b border-zinc-900">
             <span className="font-serif text-lg text-zinc-100">Menu</span>
             <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white"
             >
                <Icons.Close className="w-6 h-6" />
             </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                  <span className="text-xs uppercase tracking-widest text-zinc-600">Archive Collections</span>
                  {COLLECTIONS.map(col => (
                      <button
                          key={col.id}
                          onClick={() => handleCollectionChange(col.id as CollectionType)}
                          className={`text-3xl font-serif text-left transition-colors ${
                              activeCollectionId === col.id ? 'text-white' : 'text-zinc-500'
                          }`}
                      >
                          {col.label}
                      </button>
                  ))}
              </div>
              
              <div className="w-full h-px bg-zinc-900" />
              
              <div className="flex flex-col gap-6">
                  <span className="text-xs uppercase tracking-widest text-zinc-600">Live Feeds</span>
                  <button
                      onClick={() => {
                        setActiveCollectionId('news');
                        setActiveNewsFilter('All');
                        setIsMobileMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`text-3xl font-serif text-left transition-colors flex items-center gap-3 ${
                          activeCollectionId === 'news' ? 'text-museum-gold' : 'text-zinc-500'
                      }`}
                  >
                      Space News
                      {activeCollectionId === 'news' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                  </button>
              </div>
          </div>
        </div>
      )}

      {/* Search Overlay Bar */}
      {isSearchOpen && (
        <div className="fixed top-16 md:top-20 left-0 w-full bg-zinc-900 border-b border-zinc-800 z-30 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <input 
              type="text" 
              placeholder="Search the archive (e.g. 'Apollo 11', 'Black Hole')..." 
              className="w-full bg-transparent text-xl font-serif text-zinc-100 placeholder-zinc-600 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Collection Header */}
      <header className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 border-b border-zinc-900/50 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-serif mb-4 text-zinc-100">
          {activeCollectionId === 'search' ? `Results: "${searchQuery}"` : activeCollection.label}
        </h1>
        <p className="max-w-2xl text-zinc-400 font-light text-sm md:text-lg leading-relaxed mb-8 md:mb-0">
          {activeCollectionId === 'search' ? 'Artifacts retrieved from the query.' : activeCollection.description}
        </p>
        
        {/* News Filters */}
        {activeCollectionId === 'news' && (
          <div className="flex flex-wrap gap-3 mt-8 animate-fade-in">
            {NEWS_FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveNewsFilter(filter)}
                className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 ${
                  activeNewsFilter === filter
                    ? 'border-museum-gold text-museum-gold bg-museum-gold/5'
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {artifacts.map((item, index) => (
              <article 
                key={item.id}
                className="group cursor-pointer space-y-4"
                onClick={() => setSelectedArtifact(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 border border-zinc-900 transition-colors duration-500 group-hover:border-zinc-700">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  {item.type === 'news' && (
                    <div className="absolute top-3 right-3 bg-red-900/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-2 py-1">
                      Live Wire
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-xs uppercase tracking-widest text-white border border-white/30 px-3 py-1 backdrop-blur-sm">
                      {item.type === 'news' ? 'Read Transmission' : 'View Artifact'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2 group-hover:border-zinc-700 transition-colors duration-500">
                    <h3 className="font-serif text-lg text-zinc-300 group-hover:text-white truncate pr-4 flex-1">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-600 whitespace-nowrap ml-2">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
            
            {artifacts.length === 0 && (
              <div className="col-span-full py-20 text-center text-zinc-500 font-serif italic">
                No artifacts found in this sector.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 mt-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-lg text-zinc-400">Cosmic Antiquities</h4>
            <p className="text-zinc-600 text-xs mt-1">
              Data courtesy of the NASA Image and Video Library & The Space Devs.
            </p>
          </div>
          <div className="text-zinc-600 text-xs tracking-widest uppercase">
            Curated for Explorer
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedArtifact && (
        <ArtifactDetail 
          artifact={selectedArtifact} 
          onClose={() => setSelectedArtifact(null)} 
        />
      )}
    </div>
  );
};