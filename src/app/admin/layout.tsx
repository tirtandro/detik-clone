import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminSidebar from './admin-sidebar';
import AdminTopBar from './admin-topbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-muted">
      <AdminSidebar userRole={(session.user as { role: string }).role} />
      <div className="flex flex-1 flex-col">
        <AdminTopBar user={session.user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
