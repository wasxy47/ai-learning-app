'use client';

import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      {user && <Sidebar />}
      {/* pl-[68px] = icon strip width when logged in */}
      <div className={`flex flex-1 flex-col min-w-0 ${user ? 'md:pl-[68px]' : ''}`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
