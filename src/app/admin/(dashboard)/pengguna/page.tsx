import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/dal';
import { Users, BadgeCheck, Ban } from 'lucide-react';

export default async function UsersPage() {
  await requireAuth();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { contents: true, bookmarks: true, downloads: true } },
    },
  });

  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    EDITOR: 'Editor',
    MODERATOR: 'Moderator',
    READER: 'Pembaca',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengguna</h1>
        <p className="text-sm text-muted-foreground">{users.length} pengguna terdaftar</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-muted-foreground">Nama</th>
              <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Role</th>
              <th className="px-4 py-3 font-medium text-muted-foreground text-center hidden sm:table-cell">Konten</th>
              <th className="px-4 py-3 font-medium text-muted-foreground text-center hidden lg:table-cell">Bookmark</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">{user.name || '—'}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.role === 'SUPER_ADMIN'
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
                      : user.role === 'EDITOR'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                      : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {roleLabels[user.role] || user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-muted-foreground hidden sm:table-cell">{user._count.contents}</td>
                <td className="px-4 py-3 text-center text-muted-foreground hidden lg:table-cell">{user._count.bookmarks}</td>
                <td className="px-4 py-3">
                  {user.isActive ? (
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Ban className="h-4 w-4 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
