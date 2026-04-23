// src/components/ClientProjectsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export type Project = {
  id: number;
  name: string;
  short_description: string;
  preview_image: string | null;
  technologies: string[];
  slug: string;
  is_featured?: boolean;
};

const PROJECT_CONTEXT_LINES: Record<string, string> = {
  'quickcarts': 'Multi-tenant SaaS for Nigerian vendors, live on AWS with escrow payments and Claude AI integration.',
  'career-on-track': 'AI-powered career guidance platform, built and maintained as Full-Stack Developer, handling auth, CI/CD, and AI features.',
  'ani': 'Strategic AI agent built with FastAPI and Pyrogram, automated workflows with Supabase as the data layer.',
  'mindful-canva': 'Lightweight note-taking app, clean Next.js and Supabase implementation with a focus on UX simplicity.',
};

type ClientProjectsSectionProps = {
  endpoint?: string;
  limit?: number;
  initialProjects?: Project[];
};

export default function ClientProjectsSection({
  endpoint,
  limit,
  initialProjects,
}: ClientProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjects) return; // Skip fetch if we have initial data

    let isMounted = true;

    async function fetchProjects() {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const data = await response.json();

        if (isMounted) {
          const sortedData = [...data].sort((a, b) => {
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            return b.id - a.id;
          });
          setProjects(sortedData);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load projects");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (endpoint) {
      fetchProjects();
    }

    return () => {
      isMounted = false;
    };
  }, [endpoint, initialProjects]);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#050505]"
      >
        <div className="max-w-6xl mx-auto relative">
          <div className="section-number">03</div>
          <div className="mb-12 md:mb-16 relative z-10 pt-4">
            <p className="font-code uppercase tracking-widest text-[#FF6B00] text-xs md:text-sm font-medium mb-3">
              03 — Projects
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
              Featured Work
            </h2>
            <p className="mt-4 text-base md:text-lg max-w-xl text-[#A1A1AA] font-body">
              A selection of recent projects that showcase my skills and approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
            {Array.from({ length: limit || 4 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-[#111113] rounded-2xl overflow-hidden border border-white/[0.04]">
                <div className="h-48 sm:h-56 bg-white/[0.02] animate-pulse shrink-0 border-b border-white/[0.04]" />
                <div className="p-5 sm:p-6 flex flex-col flex-grow gap-4">
                  <div className="h-6 w-3/4 bg-white/[0.03] rounded animate-pulse" />
                  <div className="space-y-2 mb-5">
                    <div className="h-4 w-full bg-white/[0.02] rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/[0.02] rounded animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-white/[0.03] rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-white/[0.03] rounded-full animate-pulse" />
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-4 w-20 bg-white/[0.02] rounded animate-pulse" />
                    <div className="h-7 w-7 bg-white/[0.03] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#050505]"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center py-16 text-sm text-[#FF6B00]">
            Error loading projects: {error}
          </p>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section
        id="projects"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#050505]"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center py-16 text-sm text-[#71717A]">
            No projects found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Section number decoration */}
        <div className="section-number">03</div>

        <div className="mb-12 md:mb-16 relative z-10 pt-4">
          <p className="font-code uppercase tracking-widest text-[#FF6B00] text-xs md:text-sm font-medium mb-3">
            03 — Projects
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Featured Work
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-xl text-[#A1A1AA] font-body">
            A selection of recent projects that showcase my skills and approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative z-10">

          {(limit ? projects.slice(0, limit) : projects).map((project, i) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              style={{
                animation: 'slideUp 0.55s ease-out both',
                animationDelay: `${i * 120}ms`,
              }}
              className="group flex flex-col bg-[#111113] rounded-2xl overflow-hidden border border-white/[0.06] card-shadow hover:-translate-y-2 hover:border-[#FF6B00]/30 hover:shadow-xl hover:shadow-[#FF6B00]/[0.06] transition-all duration-300 glow-ring"
            >
              {/* Image */}
              {project.preview_image ? (
                <div className="relative h-48 sm:h-56 overflow-hidden border-b border-white/[0.04] shrink-0">
                  <img
                    src={project.preview_image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-[#FF6B00]/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="h-48 sm:h-56 bg-[#0A0A0C] flex items-center justify-center border-b border-white/[0.04] shrink-0 relative overflow-hidden">
                  <span className="font-heading font-black text-6xl text-[#1e1e1e] select-none">
                    {project.name.charAt(0)}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-white text-xl mb-2 group-hover:text-[#FF6B00] transition-colors leading-snug">
                  {project.name}
                </h3>
                <p className="text-sm text-[#71717A] leading-relaxed flex-grow line-clamp-2 mb-5">
                  {project.short_description}
                </p>

                {/* Tech tags — limited to 3 */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-code font-semibold bg-white/[0.03] text-[#71717A] border border-white/[0.06] rounded-full tracking-wider uppercase"
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

                {/* Context / result line */}
                {PROJECT_CONTEXT_LINES[project.slug] && (
                  <p className="text-xs text-[#A1A1AA]/70 leading-relaxed mb-5 font-body border-l-2 border-[#FF6B00]/30 pl-3">
                    {PROJECT_CONTEXT_LINES[project.slug]}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-code text-[#52525B] tracking-widest uppercase">
                    View case
                  </span>
                  <span className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-[#52525B] group-hover:bg-[#FF6B00] group-hover:border-[#FF6B00] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Projects link — only show if we have projects and a limit is set and there are more projects to see */}
        {limit && projects.length > limit && (
          <div className="text-center mt-12 md:mt-16 relative z-10">
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#FF6B00] hover:bg-white/[0.03] px-6 py-3 rounded-xl transition-all border border-white/[0.08] hover:border-white/[0.18] hover:shadow-lg hover:shadow-[#FF6B00]/10"
            >
              View More Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}