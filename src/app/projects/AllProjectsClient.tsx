// src/app/projects/AllProjectsClient.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  X,
  Github,
  Linkedin,
  Grid3X3,
  List,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Project = {
  id: number;
  name: string;
  short_description: string;
  preview_image: string | null;
  technologies: string[];
  slug: string;
  is_featured?: boolean;
};

type Props = {
  projects: Project[];
  error: string | null;
};

const DELAYS = ["delay-0", "delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];

export default function AllProjectsClient({ projects, error }: Props) {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [headerVisible, setHeaderVisible] = useState(false);
  const pageRef = useScrollReveal([filter, search]);

  // Animate header in on mount
  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Re-run scroll reveal when filter, search, OR view changes
  useEffect(() => {
    const selector = ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale";
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    elements.forEach((el) => {
      el.classList.remove("revealed");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [filter, search, view]);

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();

  let filtered = projects.filter((p) => {
    const matchTech = filter === "All" || p.technologies.includes(filter);
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.short_description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchTech && matchSearch;
  });

  filtered = filtered.sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return b.id - a.id;
  });

  return (
    <div
      ref={pageRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen bg-[#050505] text-[#A1A1AA] overflow-x-hidden"
    >
      {/* ── Hero Header ── */}
      <div className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] overflow-hidden dot-grid">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF6B00]/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">

          {/* Back link */}
          <div
            className={`mb-8 transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <a
              href="/"
              className="group inline-flex items-center gap-2 text-[#71717A] hover:text-[#FF6B00] text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </a>
          </div>

          {/* Badge + Heading */}
          <div
            className={`transition-all duration-700 delay-100 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/[0.08] rounded-full mb-5 bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse shadow-lg shadow-[#FF6B00]/50" />
              <span className="text-xs font-code text-[#71717A] tracking-widest uppercase">
                Full Portfolio
              </span>
            </div>

            <h1
              className="font-heading font-black text-white mb-4 leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              All Projects
            </h1>
            <p className="text-[#71717A] text-base sm:text-lg max-w-xl leading-relaxed">
              A complete collection of my work — full-stack apps, tools, and everything in between.
              {projects.length > 0 && (
                <span className="ml-2 text-[#FF6B00] font-semibold font-code">
                  ({projects.length})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Controls bar ── */}
      <div className="sticky top-[68px] z-30 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525B]" />
            <input
              type="text"
              placeholder="Search projects or tech…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder-[#52525B] focus:outline-none focus:border-[#FF6B00]/50 focus:bg-white/[0.05] transition-all font-body"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-lg shrink-0">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-all ${
                view === "grid"
                  ? "bg-[#FF6B00] text-white shadow"
                  : "text-[#52525B] hover:text-white"
              }`}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-all ${
                view === "list"
                  ? "bg-[#FF6B00] text-white shadow"
                  : "text-[#52525B] hover:text-white"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tech filter pills — horizontal scroll on mobile */}
        {allTechs.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
              <button
                onClick={() => setFilter("All")}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all border font-code ${
                  filter === "All"
                    ? "bg-[#FF6B00] border-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20"
                    : "bg-white/[0.02] border-white/[0.08] text-[#71717A] hover:border-white/20 hover:text-white"
                }`}
              >
                ALL
              </button>
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all border font-code ${
                    filter === tech
                      ? "bg-[#FF6B00] border-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20"
                      : "bg-white/[0.02] border-white/[0.08] text-[#71717A] hover:border-white/20 hover:text-white"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Results count */}
        {!error && (
          <p className="text-xs font-code text-[#52525B] tracking-widest uppercase mb-6">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            {filter !== "All" && <span className="text-[#FF6B00]"> — {filter}</span>}
            {search && <span className="text-[#71717A]"> matching &ldquo;{search}&rdquo;</span>}
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 scroll-reveal">
            <p className="text-[#FF6B00] text-sm mb-2">Failed to load projects</p>
            <p className="text-[#52525B] text-xs font-code">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!error && filtered.length === 0 && (
          <div className="text-center py-20 scroll-reveal">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white font-heading font-bold text-lg mb-2">No results found</p>
            <p className="text-[#71717A] text-sm mb-6">
              Try a different search term or clear the filter.
            </p>
            <button
              onClick={() => { setFilter("All"); setSearch(""); }}
              className="px-5 py-2 bg-[#FF6B00] text-white text-sm font-semibold rounded-lg hover:bg-[#FF8533] transition-all"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* GRID VIEW */}
        {!error && filtered.length > 0 && view === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filtered.map((project, i) => (
              <a
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`group flex flex-col bg-[#111113] rounded-2xl overflow-hidden border border-white/[0.06] card-shadow hover:-translate-y-2 hover:border-[#FF6B00]/30 hover:shadow-xl hover:shadow-[#FF6B00]/[0.06] transition-all duration-300 glow-ring scroll-reveal ${DELAYS[i % DELAYS.length]}`}
              >
                {/* Image */}
                {project.preview_image ? (
                  <div className="relative h-44 overflow-hidden border-b border-white/[0.04] shrink-0">
                    <img
                      src={project.preview_image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-60" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#FF6B00]/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-44 bg-[#0A0A0C] flex items-center justify-center border-b border-white/[0.04] shrink-0 relative overflow-hidden">
                    <span className="font-heading font-black text-5xl text-[#1e1e1e] select-none">
                      {project.name.charAt(0)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-[#FF6B00] transition-colors leading-snug">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#71717A] leading-relaxed flex-grow line-clamp-2 mb-4">
                    {project.short_description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        onClick={(e) => { e.preventDefault(); setFilter(tech); }}
                        className="px-2 py-0.5 text-[10px] font-code font-semibold bg-white/[0.03] text-[#71717A] border border-white/[0.06] rounded-full tracking-wider uppercase hover:border-[#FF6B00]/40 hover:text-[#FF6B00] transition-all cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-code font-semibold text-[#52525B] tracking-wider">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-code text-[#52525B] tracking-widest uppercase">
                      View case
                    </span>
                    <span className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-[#52525B] group-hover:bg-[#FF6B00] group-hover:border-[#FF6B00] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {!error && filtered.length > 0 && view === "list" && (
          <div className="flex flex-col gap-3">
            {filtered.map((project, i) => (
              <a
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`group flex items-center gap-4 sm:gap-6 bg-[#111113] rounded-2xl border border-white/[0.06] p-4 sm:p-5 hover:border-[#FF6B00]/30 hover:bg-[#161618] transition-all duration-300 glow-ring scroll-reveal ${DELAYS[i % DELAYS.length]}`}
              >
                {/* Thumbnail */}
                <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/[0.04]">
                  {project.preview_image ? (
                    <img
                      src={project.preview_image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0A0A0C] flex items-center justify-center">
                      <span className="font-heading font-black text-2xl text-[#1e1e1e]">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-heading font-bold text-white text-base sm:text-lg mb-1 group-hover:text-[#FF6B00] transition-colors truncate">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#71717A] leading-relaxed line-clamp-1 mb-2 hidden sm:block">
                    {project.short_description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        onClick={(e) => { e.preventDefault(); setFilter(tech); }}
                        className="px-2 py-0.5 text-[10px] font-code font-semibold bg-white/[0.03] text-[#52525B] border border-white/[0.06] rounded-full tracking-wider uppercase hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-[#52525B] group-hover:bg-[#FF6B00] group-hover:border-[#FF6B00] group-hover:text-white transition-all duration-300 ml-2">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 mt-8 border-t border-white/[0.06] bg-[#050505]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="flex items-baseline gap-2 group">
            <span className="font-heading text-xl font-black text-white group-hover:text-[#FF6B00] transition-colors">
              W.
            </span>
            <span className="text-sm text-[#71717A]">@buildwithwinner</span>
          </a>
          <p className="text-sm text-[#52525B]">
            © {new Date().getFullYear()} Winner OrluVictor. All rights reserved.
          </p>
          <div className="flex gap-4 text-[#71717A]">
            <a
              href="https://github.com/winnerdebest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6B00] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/winner-orluvictor-944175333"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6B00] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/buildwithwinner"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6B00] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
