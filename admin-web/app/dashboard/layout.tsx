'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background font-sans overflow-hidden">
      {/* 1. Sidebar Component (Handles mobile toggle and desktop sticky view) */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Component */}
        <Header />

        {/* Dynamic Children Pages with responsive padding and mobile scrolling fix */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 modal-scrollbar">
          <div className="max-w-6xl mx-auto w-full pb-16 md:pb-0">{children}</div>
        </main>
      </div>
    </div>
  );
}