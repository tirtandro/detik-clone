'use client';

import Link from 'next/link';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CHANNELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTheme } from './theme-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="ideguru - Beranda">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
              IG
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              ideguru
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Kanal">
            {CHANNELS.map((channel) => (
              <Link
                key={channel.slug}
                href={channel.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[var(--surface-hover)] dark:hover:text-white"
              >
                {channel.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[var(--surface-hover)]"
              aria-label={isSearchOpen ? 'Tutup pencarian' : 'Buka pencarian'}
              aria-expanded={isSearchOpen}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[var(--surface-hover)]"
              aria-label={isDark ? 'Mode terang' : 'Mode gelap'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[var(--surface-hover)] lg:hidden"
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div
          className="border-t border-border bg-background px-4 pb-4 pt-3"
          role="search"
          aria-label="Pencarian"
        >
          <div className="mx-auto max-w-2xl">
            <form action="/cari" method="GET">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, RPP, soal, beasiswa..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-800"
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden"
          aria-label="Kanal"
        >
          <div className="space-y-1 px-4 pb-6 pt-4">
            {CHANNELS.map((channel) => (
              <Link
                key={channel.slug}
                href={channel.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  'text-foreground hover:bg-[var(--surface-hover)] dark:hover:text-white'
                )}
              >
                <span className={channel.color}>{channel.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
