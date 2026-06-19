'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all',
        'bg-emerald-600 text-white hover:bg-emerald-700',
        'dark:bg-emerald-500 dark:hover:bg-emerald-600',
        visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
