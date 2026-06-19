import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border-border bg-surface transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}
