'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CHANNELS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="ideguru - Beranda">
              <Image
                src="/logo.png"
                alt="ideguru"
                width={120}
                height={34}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Platform informasi, sumber belajar, dan perangkat pembelajaran untuk guru dan tenaga
              kependidikan di Indonesia.
            </p>
          </div>

          {/* Channels */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Kanal</h3>
            <ul className="mt-4 space-y-3">
              {CHANNELS.slice(0, 4).map((channel) => (
                <li key={channel.slug}>
                  <Link
                    href={channel.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-500 rounded"
                  >
                    {channel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Kanal</h3>
            <ul className="mt-4 space-y-3">
              {CHANNELS.slice(4).map((channel) => (
                <li key={channel.slug}>
                  <Link
                    href={channel.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:text-white focus-visible:outline-2 focus-visible:outline-emerald-500 rounded"
                  >
                    {channel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Newsletter
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dapatkan update artikel dan perangkat pembelajaran terbaru.
            </p>
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Alamat email</label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email Anda"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-white rounded-lg"
                >
                  Langganan
                </button>
              </div>
            </form>
            {/* Quick Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-foreground">Lainnya</h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/cari" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    Cari
                  </Link>
                </li>
                <li>
                  <Link href="/profil" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    Profil
                  </Link>
                </li>
                <li>
                  <a href="/rss.xml" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                    RSS Feed
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ideguru. Platform Pendidikan Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
