// src/app/projects/[slug]/ProjectDetail.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, ExternalLink, Github, Globe,
  X, Code, Layers, Zap, Calendar, CheckCircle,
  ChevronLeft, ChevronRight, ArrowUpRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }

    .tech-chip {
      display: inline-flex;
      align-items: center;
      padding: 6px 16px;
      border: 1.5px solid #0D0D0D;
      border-radius: 100px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #0D0D0D;
      background: #fff;
      transition: all 0.18s ease;
      cursor: default;
    }
    .tech-chip:hover {
      background: #0D0D0D;
      color: #fff;
    }

    .proj-card {
      background: #fff;
      border: 1px solid #E8E8E4;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.06);
      transition: box-shadow 0.2s ease;
    }
    .proj-card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.10);
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 0;
      border-bottom: 1px solid #F0F0EC;
    }
    .detail-row:last-child { border-bottom: none; }

    .detail-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #F5F4F0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Thumbnail active */
    .thumb-active { border-color: #E8651A !important; }

    /* Image modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: fadeIn 0.2s ease;
    }

    /* Description prose */
    .prose-project h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0D0D0D;
      margin: 1.5rem 0 0.75rem;
    }
    .prose-project p {
      color: #555;
      line-height: 1.8;
      margin-bottom: 1rem;
      font-size: 15px;
    }
    .prose-project ul { margin-bottom: 1rem; }
    .prose-project li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #555;
      font-size: 15px;
      line-height: 1.7;
      margin-bottom: 8px;
    }
    .prose-project li::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #E8651A;
      flex-shrink: 0;
      margin-top: 8px;
    }
  `;
  if (!document.querySelector('style[data-proj="detail"]')) {
    style.setAttribute('data-proj', 'detail');
    document.head.appendChild(style);
  }
}

type ProjectDetailProps = {
  project: {
    id: number;
    name: string;
    description: string;
    short_description: string;
    project_link: string;
    technologies: string[];
    images: { id: number; image: string }[];
  };
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [imageError, setImageError] = useState<{ [k: string]: boolean }>({});
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleImageError = (url: string) =>
    setImageError(prev => ({ ...prev, [url]: true }));

  const nextImage = () =>
    setCurrentImageIdx(p => (p === project.images.length - 1 ? 0 : p + 1));
  const prevImage = () =>
    setCurrentImageIdx(p => (p === 0 ? project.images.length - 1 : p - 1));

  const parseDescription = (desc: string) =>
    desc.split('\n\n').map((block, i) => {
      if (block.startsWith('## ') || block.startsWith('### '))
        return <h3 key={i}>{block.replace(/^#{2,3}\s/, '')}</h3>;
      if (block.startsWith('- ') || block.startsWith('• ')) {
        return (
          <ul key={i}>
            {block.split('\n').filter(Boolean).map((line, j) => (
              <li key={j}>{line.replace(/^[-•]\s*/, '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={i}>{block}</p>;
    });

  const hasImages = project.images && project.images.length > 0;
  const currentImg = hasImages ? project.images[currentImageIdx] : null;

  return (
    <div className="min-h-screen bg-white text-[#444] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        } border-b border-[#E8E8E4]`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/#projects')}
              className="inline-flex items-center gap-2 text-[#444] hover:text-[#0D0D0D] text-sm font-medium group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </button>

            <div className="flex items-baseline gap-2">
              <span style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-xl font-black text-[#0D0D0D]">W.</span>
              <span className="text-xs text-[#888] font-medium">@buildwithwinner</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8E8E4] bg-white">
        <div className="max-w-6xl mx-auto fade-in">

          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#E8E8E4] rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8651A] animate-pulse" />
            <span className="text-xs font-mono text-[#888] tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Featured Project
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="flex-1">
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                className="font-black text-[#0D0D0D] uppercase mb-6">
                {project.name}
              </h1>
              <p className="text-lg text-[#666] max-w-2xl leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href={project.project_link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E8651A] text-white font-semibold rounded-lg hover:bg-[#d45a16] transition-colors">
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </a>
              <button onClick={() => router.push('/#projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#0D0D0D] text-[#0D0D0D] font-semibold rounded-lg hover:bg-[#F5F4F0] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Image Gallery */}
        {hasImages && (
          <div className="mb-12 sm:mb-16 fade-in">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8E8E4]"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
              {!imageError[currentImg!.image] ? (
                <div className="relative aspect-video sm:aspect-[21/9]">
                  <img
                    src={currentImg!.image}
                    alt={`${project.name} screenshot ${currentImageIdx + 1}`}
                    className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-700"
                    onClick={() => setSelectedImage(currentImg!.image)}
                    onError={() => handleImageError(currentImg!.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

                  {project.images.length > 1 && (
                    <>
                      <button onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E8E8E4] text-[#0D0D0D] flex items-center justify-center hover:bg-white transition-all shadow-md">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E8E8E4] text-[#0D0D0D] flex items-center justify-center hover:bg-white transition-all shadow-md">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 right-4 bg-white/90 border border-[#E8E8E4] text-[#0D0D0D] text-xs px-3 py-1.5 rounded-full font-mono"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {currentImageIdx + 1} / {project.images.length}
                  </div>
                </div>
              ) : (
                <div className="aspect-video sm:aspect-[21/9] bg-[#F5F4F0] flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-10 h-10 mx-auto mb-2 text-[#BBB]" />
                    <p className="text-[#999] text-sm">Image unavailable</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {project.images.map((img, idx) => (
                  <button key={img.id} onClick={() => setCurrentImageIdx(idx)}
                    className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIdx ? 'thumb-active' : 'border-[#E8E8E4] opacity-60 hover:opacity-100'
                      }`}>
                    {!imageError[img.image]
                      ? <img src={img.image} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover"
                        onError={() => handleImageError(img.image)} />
                      : <div className="w-full h-full bg-[#F5F4F0] flex items-center justify-center">
                        <Globe className="w-4 h-4 text-[#BBB]" />
                      </div>
                    }
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left — Overview + Stack */}
          <div className="lg:col-span-2 space-y-8">

            {/* Project Overview */}
            <div className="proj-card p-6 sm:p-8">
              <h2 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-2xl font-bold text-[#0D0D0D] mb-1 flex items-center gap-3">
                <Code className="w-5 h-5 text-[#E8651A]" />
                Project Overview
              </h2>
              <div className="w-12 h-0.5 bg-[#E8651A] mb-6" />
              <div className="prose-project">
                {parseDescription(project.description)}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="proj-card p-6 sm:p-8">
              <h2 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-2xl font-bold text-[#0D0D0D] mb-1 flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#E8651A]" />
                Technology Stack
              </h2>
              <div className="w-12 h-0.5 bg-[#E8651A] mb-6" />
              <div className="flex flex-wrap gap-3">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-6">

            {/* Project Details */}
            <div className="proj-card p-6">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-lg font-bold text-[#0D0D0D] mb-4">
                Project Details
              </h3>
              <div>
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-[#E8651A]" />, label: 'Status', value: 'Live & Active' },
                  { icon: <Zap className="w-4 h-4 text-[#E8651A]" />, label: 'Performance', value: 'Optimized' },
                  { icon: <Calendar className="w-4 h-4 text-[#E8651A]" />, label: 'Last Updated', value: 'Recently' },
                ].map(d => (
                  <div key={d.label} className="detail-row">
                    <div className="detail-icon">{d.icon}</div>
                    <div>
                      <div className="text-xs text-[#999] mb-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                        {d.label.toUpperCase()}
                      </div>
                      <div className="text-sm font-semibold text-[#0D0D0D]">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="proj-card p-6 border-t-4 border-t-[#E8651A]">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-lg font-bold text-[#0D0D0D] mb-2">
                Like what you see?
              </h3>
              <p className="text-sm text-[#666] mb-5 leading-relaxed">
                Let's discuss how we can build something amazing together.
              </p>
              <a href="/#contact"
                className="block w-full text-center px-5 py-3 bg-[#1A1A2E] text-white font-semibold rounded-lg hover:bg-[#E8651A] transition-colors text-sm">
                Start a Project
              </a>
            </div>

            {/* Quick Links */}
            <div className="proj-card p-6">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-lg font-bold text-[#0D0D0D] mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a href={project.project_link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-[#E8E8E4] hover:border-[#E8651A] hover:text-[#E8651A] transition-all group text-sm font-medium text-[#0D0D0D]">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Project
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/#contact"
                  className="flex items-center justify-between p-3 rounded-lg border border-[#E8E8E4] hover:border-[#E8651A] hover:text-[#E8651A] transition-all group text-sm font-medium text-[#0D0D0D]">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Hire Winner
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-[#0D0D0D] text-white flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-mono text-[#E8651A] tracking-widest uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Ready to collaborate?
            </p>
            <h3 style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-2xl sm:text-3xl font-black leading-tight mb-2">
              Got a project?<br />Let's build something.
            </h3>
            <p className="text-[#888] text-sm">Rivers State, Nigeria — working with clients globally</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a href={project.project_link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E8651A] text-white font-semibold rounded-lg hover:bg-[#d45a16] transition-colors">
              <ExternalLink className="w-4 h-4" />
              Visit Project
            </a>
            <a href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#E8E8E4] bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-xl font-black text-[#0D0D0D]">W.</span>
            <span className="text-sm text-[#888]">@buildwithwinner</span>
          </div>
          <p className="text-sm text-[#999]">© {new Date().getFullYear()} @buildwithwinner. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="/" className="text-[#666] hover:text-[#E8651A] transition-colors">Portfolio</a>
            <a href="/#contact" className="text-[#666] hover:text-[#E8651A] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── Image Modal ── */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-5xl max-h-[88vh]"
            onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged"
              className="w-full h-full object-contain rounded-xl" />
            {project.images.length > 1 && (
              <>
                <button onClick={() => { prevImage(); setSelectedImage(project.images[currentImageIdx].image); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => { nextImage(); setSelectedImage(project.images[currentImageIdx].image); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Back to Top ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center shadow-lg hover:bg-[#E8651A] hover:-translate-y-1 transition-all duration-300">
        <ArrowUpRight className="w-5 h-5 -rotate-45" />
      </button>
    </div>
  );
}