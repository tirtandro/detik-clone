import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from './login-form';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/admin');

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">Masuk</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Panel administrasi ideguru
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
