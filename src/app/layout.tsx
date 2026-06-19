import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Analytics } from '@/components/layout/analytics';
import { ThemeProvider } from '@/components/layout/theme-context';
import { BookmarkProvider } from '@/components/layout/bookmark-context';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'ideguru - Platform Pendidikan Indonesia',
    template: '%s | ideguru',
  },
  description:
    'Platform informasi, sumber belajar, dan perangkat pembelajaran untuk guru dan tenaga kependidikan di Indonesia. Akses RPP, ATP, soal, beasiswa, dan artikel pendidikan terbaru.',
  metadataBase: new URL('https://ideguru.id'),
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    siteName: 'ideguru',
    type: 'website',
    locale: 'id_ID',
    title: 'ideguru - Platform Pendidikan Indonesia',
    description:
      'Platform informasi, sumber belajar, dan perangkat pembelajaran untuk guru dan tenaga kependidikan di Indonesia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ideguru - Platform Pendidikan Indonesia',
    description:
      'Platform informasi, sumber belajar, dan perangkat pembelajaran untuk guru dan tenaga kependidikan di Indonesia.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <Analytics />
        <a href="#main-content" className="skip-to-content">
          Langsung ke konten utama
        </a>
        <ThemeProvider>
          <BookmarkProvider>
            {children}
            <ScrollToTop />
          </BookmarkProvider>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
