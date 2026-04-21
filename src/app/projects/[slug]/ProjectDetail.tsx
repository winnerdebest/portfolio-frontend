// src/app/projects/[slug]/ProjectDetail.tsx
"use client";

import React, { useState } from 'react';
import {
  ExternalLink, Globe,
  X, Code, Layers, Zap, Calendar, CheckCircle,
  ChevronLeft, ChevronRight, ArrowUpRight, ArrowLeft
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#050505] text-[#A1A1AA] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <div className="pt-32 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-[#050505] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto fade-in relative">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/[0.08] rounded-full mb-6 bg-white/[0.02] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse shadow-lg shadow-[#FF6B00]/50" />
            <span className="text-xs font-mono text-[#71717A] tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Featured Project
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="flex-1">
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                className="font-black uppercase mb-6 bg-gradient-to-r from-white via-white to-[#71717A] bg-clip-text text-transparent">
                {project.name}
              </h1>
              <p className="text-lg text-[#A1A1AA] max-w-2xl leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href={project.project_link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-[#FF8533] transition-all hover:shadow-lg hover:shadow-[#FF6B00]/20">
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </a>
              <a href="/#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/[0.03] transition-all backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4" />
                All Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Image Gallery */}
        {hasImages && (
          <div className="mb-12 sm:mb-16 fade-in">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              {!imageError[currentImg!.image] ? (
                <div className="relative aspect-video sm:aspect-[21/9]">
                  <img
                    src={currentImg!.image}
                    alt={`${project.name} screenshot ${currentImageIdx + 1}`}
                    className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-700"
                    onClick={() => setSelectedImage(currentImg!.image)}
                    onError={() => handleImageError(currentImg!.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/30 to-transparent pointer-events-none" />

                  {project.images.length > 1 && (
                    <>
                      <button onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-all">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-mono"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {currentImageIdx + 1} / {project.images.length}
                  </div>
                </div>
              ) : (
                <div className="aspect-video sm:aspect-[21/9] bg-[#111113] flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-10 h-10 mx-auto mb-2 text-[#333]" />
                    <p className="text-[#71717A] text-sm">Image unavailable</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {project.images.map((img, idx) => (
                  <button key={img.id} onClick={() => setCurrentImageIdx(idx)}
                    className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIdx
                      ? 'thumb-active shadow-lg shadow-[#FF6B00]/20'
                      : 'border-white/[0.06] opacity-50 hover:opacity-80'
                    }`}>
                    {!imageError[img.image]
                      ? <img src={img.image} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover"
                          onError={() => handleImageError(img.image)} />
                      : <div className="w-full h-full bg-[#111113] flex items-center justify-center">
                          <Globe className="w-4 h-4 text-[#333]" />
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
                className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                <Code className="w-5 h-5 text-[#FF6B00]" />
                Project Overview
              </h2>
              <div className="w-12 h-0.5 bg-[#FF6B00] mb-6" />
              <div className="prose-project">
                {parseDescription(project.description)}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="proj-card p-6 sm:p-8">
              <h2 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#FF6B00]" />
                Technology Stack
              </h2>
              <div className="w-12 h-0.5 bg-[#FF6B00] mb-6" />
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
                className="text-lg font-bold text-white mb-4">
                Project Details
              </h3>
              <div>
                {[
                  { icon: <CheckCircle className="w-4 h-4 text-[#FF6B00]" />, label: 'Status', value: 'Live & Active' },
                  { icon: <Zap className="w-4 h-4 text-[#FF6B00]" />, label: 'Performance', value: 'Optimized' },
                  { icon: <Calendar className="w-4 h-4 text-[#FF6B00]" />, label: 'Last Updated', value: 'Recently' },
                ].map(d => (
                  <div key={d.label} className="detail-row">
                    <div className="detail-icon">{d.icon}</div>
                    <div>
                      <div className="text-xs text-[#71717A] mb-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                        {d.label.toUpperCase()}
                      </div>
                      <div className="text-sm font-semibold text-white">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="proj-card p-6 border-t-2 border-t-[#FF6B00]">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-lg font-bold text-white mb-2">
                Like what you see?
              </h3>
              <p className="text-sm text-[#71717A] mb-5 leading-relaxed">
                Check out more of my work or reach out for opportunities.
              </p>
              <a href="/#contact"
                className="block w-full text-center px-5 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-[#FF8533] transition-all hover:shadow-lg hover:shadow-[#FF6B00]/20 text-sm">
                Get in Touch
              </a>
            </div>

            {/* Quick Links */}
            <div className="proj-card p-6">
              <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-lg font-bold text-white mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a href={project.project_link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all group text-sm font-medium text-white glow-ring">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Project
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="/#contact"
                  className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] hover:border-[#FF6B00]/30 hover:text-[#FF6B00] transition-all group text-sm font-medium text-white glow-ring">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Contact Winner
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-[#111113] border border-white/[0.06] text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#FF6B00]/[0.05] rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            <p className="text-xs font-mono text-[#FF6B00] tracking-widest uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Reach out
            </p>
            <h3 style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-2xl sm:text-3xl font-black leading-tight mb-2">
              Interested in connecting?
            </h3>
            <p className="text-[#71717A] text-sm">Rivers State, Nigeria — Always open to new opportunities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 relative">
            <a href={project.project_link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-semibold rounded-lg hover:bg-[#FF8533] transition-all hover:shadow-lg hover:shadow-[#FF6B00]/20">
              <ExternalLink className="w-4 h-4" />
              Visit Project
            </a>
            <a href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/[0.03] transition-colors">
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-xl font-black text-white">W.</span>
            <span className="text-sm text-[#71717A]">@buildwithwinner</span>
          </div>
          <p className="text-sm text-[#71717A]">© {new Date().getFullYear()} @buildwithwinner. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="/" className="text-[#71717A] hover:text-[#FF6B00] transition-colors">Portfolio</a>
            <a href="/#contact" className="text-[#71717A] hover:text-[#FF6B00] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── Image Modal ── */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md">
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-5xl max-h-[88vh]"
            onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged"
              className="w-full h-full object-contain rounded-xl" />
            {project.images.length > 1 && (
              <>
                <button onClick={() => { prevImage(); setSelectedImage(project.images[currentImageIdx].image); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => { nextImage(); setSelectedImage(project.images[currentImageIdx].image); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Back to Top ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg shadow-[#FF6B00]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF6B00]/40 transition-all duration-300">
        <ArrowUpRight className="w-5 h-5 -rotate-45" />
      </button>
    </div>
  );
}