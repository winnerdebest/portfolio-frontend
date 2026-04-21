"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';

const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function IslandNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) return;

      const current = NAV_ITEMS.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 100 && r.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (item: string) => {
    setIsMenuOpen(false);
    if (isHomePage) {
      document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate home then scroll to section via hash
      router.push(`/#${item}`);
    }
  };

  const handleHireMe = () => {
    setIsMenuOpen(false);
    if (isHomePage) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#contact');
    }
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 rounded-full border px-5 py-2.5 flex items-center gap-3 ${
          isScrolled
            ? 'bg-[#0A0A0C]/80 backdrop-blur-2xl border-white/[0.10] shadow-xl shadow-black/30'
            : 'bg-[#0A0A0C]/60 backdrop-blur-xl border-white/[0.06] shadow-lg shadow-black/20'
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-1.5 mr-2 cursor-pointer">
          <span className="text-lg font-black font-heading text-white leading-none hover:text-[#FF6B00] transition-colors">
            W.
          </span>
        </a>

        {/* Divider */}
        <div className="w-px h-4 bg-white/[0.10] hidden lg:block" />

        {/* Nav Links — desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`capitalize px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isHomePage && activeSection === item
                  ? 'text-white bg-white/[0.08]'
                  : 'text-[#71717A] hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/[0.10] hidden lg:block" />

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* GitHub */}
          <a
            href="https://github.com/winnerdebest"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 hidden sm:flex items-center justify-center rounded-full text-[#71717A] hover:text-white hover:bg-white/[0.06] transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/buildwithwinner"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 hidden sm:flex items-center justify-center rounded-full text-[#71717A] hover:text-white hover:bg-white/[0.06] transition-all"
            aria-label="Twitter / X"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Resume */}
          <a
            href="/WinnerOrluVictor_AI_Engineer_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#A1A1AA] border border-white/[0.08] hover:border-white/[0.18] hover:text-white transition-all"
          >
            Resume
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>

          {/* Hire Me */}
          <button
            onClick={handleHireMe}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FF6B00] text-white font-semibold text-xs transition-all hover:bg-[#FF8533] hover:shadow-lg hover:shadow-[#FF6B00]/25 hover:scale-105"
          >
            Hire Me
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/[0.06] transition-colors ml-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="pointer-events-auto absolute top-[calc(100%+8px)] left-4 right-4 bg-[#0A0A0C]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden mobile-drawer">
          <div className="px-3 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-left capitalize px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                  isHomePage && activeSection === item
                    ? 'bg-white/[0.06] text-white border-l-2 border-[#FF6B00] pl-3'
                    : 'text-[#A1A1AA] hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <div className="pt-2 mt-1 border-t border-white/[0.06] flex flex-col gap-2 px-1">
              <a
                href="/WinnerOrluVictor_AI_Engineer_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] text-[#A1A1AA] text-sm font-medium hover:text-white hover:border-white/[0.15] transition-all"
              >
                Resume
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <div className="flex gap-3 justify-center">
                <a
                  href="https://github.com/winnerdebest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.08] text-[#71717A] hover:text-white hover:border-white/[0.15] transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/buildwithwinner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.08] text-[#71717A] hover:text-white hover:border-white/[0.15] transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              <button
                onClick={handleHireMe}
                className="w-full flex items-center justify-center px-5 py-3 rounded-xl bg-[#FF6B00] text-white font-semibold text-sm hover:bg-[#FF8533] transition-all"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
