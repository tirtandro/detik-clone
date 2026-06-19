'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Nasional', slug: 'nasional' },
  { name: 'Internasional', slug: 'internasional' },
  { name: 'Ekonomi', slug: 'ekonomi' },
  { name: 'Tekno', slug: 'tekno' },
  { name: 'Olahraga', slug: 'olahraga' },
  { name: 'Hiburan', slug: 'hiburan' },
  { name: 'Health', slug: 'health' },
  { name: 'Travel', slug: 'travel' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="bg-red-600 py-1">
        <div className="max-w-7xl mx-auto px-4 text-right">
          <span className="text-white text-xs font-medium">Breaking News: Terkini update berita hari ini</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">d</span>
            </div>
            <span className="text-xl font-bold text-gray-900">detikcom</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded">
              Beranda
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <input
                type="search"
                placeholder="Cari berita..."
                className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
          <nav className="flex space-x-4 whitespace-nowrap">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="px-3 py-1 text-xs font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}