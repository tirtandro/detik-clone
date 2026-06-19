import { auth } from '@/auth';
import { cache } from 'react';
import { redirect } from 'next/navigation';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
};

export const getSession = cache(async () => {
  const session = await auth();
  return session;
});

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  const session = await getSession();
  if (!session?.user) return null;
  return session.user as AuthUser;
});

export const requireAuth = cache(async () => {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  return user;
});

export const requireRole = cache(async (...roles: string[]) => {
  const user = await requireAuth();
  if (!roles.includes(user.role)) redirect('/admin');
  return user;
});

export const isAdmin = cache(async () => {
  const user = await getCurrentUser();
  return user?.role === 'SUPER_ADMIN' || user?.role === 'EDITOR';
});
