'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from 'next-themes';
import {
  BookOpen,
  Brain,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  User as UserIcon,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/modules',   label: 'Modules',   icon: BookOpen },
  { href: '/profile',   label: 'Profile',   icon: UserIcon },
];

export default function Sidebar() {
  const { user, logout }      = useAuth();
  const pathname              = usePathname();
  const router                = useRouter();
  const { theme, setTheme }   = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseEnter = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    collapseTimer.current = setTimeout(() => {
      setExpanded(false);
    }, 150); // small delay so accidental mouse-out doesn't flicker
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!user) return null;

  const avatarLetter = user.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user.email?.charAt(0).toUpperCase();

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-y-0 left-0 z-50 hidden md:flex"
      style={{ width: expanded ? '240px' : '68px', transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* ── Sidebar Panel (grows with width) ── */}
      <div
        className="flex h-full w-full flex-col overflow-hidden"
        style={{
          background: 'var(--paper)',
          borderRight: '1px solid var(--line)',
          boxShadow: expanded ? '4px 0 20px rgba(0,0,0,0.10)' : 'none',
          transition: 'box-shadow 0.25s ease',
        }}
      >
        {/* ── Header / Logo ── */}
        <div
          className="flex h-16 shrink-0 items-center border-b"
          style={{ borderColor: 'var(--line)', paddingLeft: '14px' }}
        >
          <div className="flex items-center gap-3">
            {/* Logo icon */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition"
              style={{ background: 'var(--primary)', color: 'var(--primary-text)' }}
            >
              <Brain className="h-4 w-4" />
            </div>
            {/* App name — only visible when expanded */}
            <div
              className="overflow-hidden transition-all duration-200"
              style={{ width: expanded ? '140px' : '0px', opacity: expanded ? 1 : 0 }}
            >
              <p className="whitespace-nowrap text-sm font-black uppercase tracking-[0.2em]" style={{ color: 'var(--ink)' }}>
                LearnAI
              </p>
              <p className="whitespace-nowrap text-[11px]" style={{ color: 'var(--muted)' }}>
                Studio
              </p>
            </div>
          </div>
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex-1 overflow-y-auto py-4" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          {/* Section label — only visible when expanded */}
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ height: expanded ? '28px' : '0px', opacity: expanded ? 1 : 0, marginBottom: expanded ? '4px' : '0' }}
          >
            <p className="whitespace-nowrap px-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Navigation
            </p>
          </div>

          <div className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  title={!expanded ? label : undefined}
                  className="flex items-center gap-3 rounded-xl py-2.5 text-sm font-semibold transition-all"
                  style={{
                    paddingLeft: '10px',
                    paddingRight: expanded ? '10px' : '10px',
                    background: active
                      ? 'color-mix(in srgb, var(--primary) 12%, transparent)'
                      : 'transparent',
                    color: active ? 'var(--primary)' : 'var(--muted)',
                    fontWeight: active ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--paper-soft)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span
                    className="overflow-hidden whitespace-nowrap transition-all duration-200"
                    style={{ width: expanded ? '160px' : '0px', opacity: expanded ? 1 : 0 }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ── Footer: Theme + User + Logout ── */}
        <div
          className="shrink-0 border-t py-3"
          style={{ borderColor: 'var(--line)', paddingLeft: '12px', paddingRight: '12px' }}
        >
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={!expanded ? 'Toggle theme' : undefined}
              className="mb-1 flex w-full items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition"
              style={{ paddingLeft: '10px', color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--paper-soft)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {/* Toggle pill */}
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center"
                style={{ color: 'var(--muted)' }}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </div>
              <span
                className="overflow-hidden whitespace-nowrap transition-all duration-200"
                style={{ width: expanded ? '160px' : '0px', opacity: expanded ? 1 : 0 }}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            title={!expanded ? 'Logout' : undefined}
            className="mb-3 flex w-full items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition"
            style={{ paddingLeft: '10px', color: 'var(--danger)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'color-mix(in srgb, var(--danger) 8%, transparent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span
              className="overflow-hidden whitespace-nowrap transition-all duration-200"
              style={{ width: expanded ? '160px' : '0px', opacity: expanded ? 1 : 0 }}
            >
              Logout
            </span>
          </button>

          {/* User Avatar row */}
          <div
            className="flex items-center gap-3 rounded-xl px-2.5 py-2"
            style={{ background: 'var(--paper-soft)', border: '1px solid var(--line)' }}
          >
            <div
              className="flex h-8 w-8 shrink-0 overflow-hidden items-center justify-center rounded-lg"
              style={{ background: 'var(--primary)' }}
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-black" style={{ color: 'var(--primary-text)' }}>
                  {avatarLetter}
                </span>
              )}
            </div>
            <div
              className="overflow-hidden transition-all duration-200"
              style={{ width: expanded ? '160px' : '0px', opacity: expanded ? 1 : 0 }}
            >
              <p className="truncate text-sm font-bold whitespace-nowrap" style={{ color: 'var(--ink)' }}>
                {user.displayName || user.email?.split('@')[0]}
              </p>
              <p className="truncate text-xs whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
