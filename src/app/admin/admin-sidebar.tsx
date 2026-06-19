'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Hash,
  Layers,
  ImageIcon,
  Settings,
  Users,
  Mail,
  BarChart3,
  Download,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/konten', label: 'Konten', icon: FileText },
  { href: '/admin/kanal', label: 'Kanal', icon: Layers },
  { href: '/admin/tag', label: 'Tag', icon: Hash },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
  { href: '/admin/unduhan', label: 'Unduhan', icon: Download },
  { href: '/admin/pengguna', label: 'Pengguna', icon: Users },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/analitik', label: 'Analitik', icon: BarChart3 },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function AdminSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-background lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Image
          src="/logo.png"
          alt="ideguru"
          width={90}
          height={26}
          className="h-7 w-auto"
        />
      </div>
      <nav className="flex flex-col gap-1 p-4" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                  : 'text-muted-foreground hover:bg-surface hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
