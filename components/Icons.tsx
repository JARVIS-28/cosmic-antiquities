import React from 'react';
import { Search, X, ChevronLeft, Info, Menu, Maximize2, ExternalLink } from 'lucide-react';

export const Icons = {
  Search: ({ className }: { className?: string }) => <Search className={className} />,
  Close: ({ className }: { className?: string }) => <X className={className} />,
  Back: ({ className }: { className?: string }) => <ChevronLeft className={className} />,
  Info: ({ className }: { className?: string }) => <Info className={className} />,
  Menu: ({ className }: { className?: string }) => <Menu className={className} />,
  Expand: ({ className }: { className?: string }) => <Maximize2 className={className} />,
  ExternalLink: ({ className }: { className?: string }) => <ExternalLink className={className} />,
};