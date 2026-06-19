'use client';

import { useTheme } from '@/components/layout/theme-context';
import { Moon, Sun, LogOut, Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import AdminSidebar from './admin-sidebar';

export default function AdminTopBar({
  user,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null; role?: string };
}) {
  const { isDark, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background">
            <div className="flex h-16 items-center justify-end px-4 border-b border-border">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
                aria-label="Tutup menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <AdminSidebar userRole={user?.role || 'READER'} />
          </div>
        </div>
      )}

      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-1 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Lihat Situs
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
            aria-label={isDark ? 'Mode terang' : 'Mode gelap'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <span className="hidden text-sm text-muted-foreground sm:block">
            {user?.name || user?.email}
          </span>

          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="rounded-lg p-2 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
            aria-label="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>
    </>
  );
}
