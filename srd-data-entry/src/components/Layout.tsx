import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">D&D 3.5e SRD Data Entry Tool</h1>
      </header>
      <main className="h-[calc(100vh-73px)]">{children}</main>
    </div>
  );
}
