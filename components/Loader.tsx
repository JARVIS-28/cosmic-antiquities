import React from 'react';

export const Loader = () => (
  <div className="flex flex-col items-center justify-center h-64 w-full gap-4">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-[1px] border-zinc-800 rounded-full"></div>
      <div className="absolute inset-0 border-t-[1px] border-zinc-200 rounded-full animate-spin"></div>
    </div>
    <span className="text-zinc-500 font-serif italic text-sm tracking-widest">Accessing Archives...</span>
  </div>
);