'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { BookOpen, Brain, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/modules',   label: 'Modules',   icon: BookOpen },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-40 border-b backdrop-blur-xl md:hidden"
      style={{
        background: 'color-mix(in srgb, var(--paper) 90%, transparent)',
        borderColor: 'var(--line)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg transition"
              style={{ background: 'var(--primary)', color: 'var(--primary-text)' }}
            >
              <Brain className="h-4 w-4" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: 'var(--ink)' }}>
              LearnAI
            </span>
          </Link>

          <button
            className="rounded-lg p-2 transition"
            style={{ color: 'var(--muted)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="border-t px-4 py-3"
          style={{ borderColor: 'var(--line)', background: 'var(--paper)' }}
        >
          <div className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition"
                  style={{
                    background: active ? 'color-mix(in srgb, var(--primary) 10%, transparent)' : 'transparent',
                    color: active ? 'var(--primary)' : 'var(--ink)',
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 border-t pt-3 space-y-1" style={{ borderColor: 'var(--line)' }}>
            <p className="px-4 py-1 text-xs" style={{ color: 'var(--muted)' }}>{user.email}</p>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition"
              style={{ color: 'var(--danger)' }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
