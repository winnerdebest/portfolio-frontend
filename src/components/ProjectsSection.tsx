// src/components/ClientProjectsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';

export type Project = {
  id: number;
  name: string;
  short_description: string;
  preview_image: string | null;
  technologies: string[];
  slug: string;
};

type ClientProjectsSectionProps = {
  endpoint: string;
};

export default function ClientProjectsSection({
  endpoint,
}: ClientProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
          setProjects(data);
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

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div
              className="inline-block w-10 h-10 border-3 rounded-full animate-spin"
              style={{ borderColor: '#E8E8E4', borderTopColor: '#E8651A' }}
            />
            <p className="mt-4 text-sm" style={{ color: '#999' }}>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center py-16 text-sm" style={{ color: '#E8651A' }}>
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
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center py-16 text-sm" style={{ color: '#999' }}>
            No projects found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Section number decoration */}
        <div className="section-number">03</div>

        <div className="mb-12 md:mb-16 relative z-10 pt-4">
          <p className="font-code uppercase tracking-widest text-[#E8651A] text-xs md:text-sm font-medium mb-3">
            03 — Projects
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D]">
            Featured Work
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-xl text-[#444] font-body">
            A selection of recent projects that showcase my skills and approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 relative z-10">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block bg-white rounded-xl overflow-hidden border border-[#E8E8E4] border-t-[3px] border-t-[#E8651A] card-shadow hover:-translate-y-2 card-shadow-hover transition-all duration-300 flex flex-col h-full"
            >
              {project.preview_image && (
                <div className="relative h-56 sm:h-64 overflow-hidden border-b border-[#E8E8E4]">
                  <img
                    src={project.preview_image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              )}

              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0D0D0D] mb-3">
                  {project.name}
                </h3>
                <p className="text-sm md:text-base text-[#444] font-body mb-6 leading-relaxed flex-grow">
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-code font-medium bg-[#F5F4F0] text-[#444] border border-[#E8E8E4] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#E8651A] font-body group-hover:gap-3 transition-all duration-300">
                    View Details
                    <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="text-center mt-12 md:mt-16 relative z-10">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#E8651A] hover:bg-[#F5F4F0] px-6 py-3 rounded-lg transition-colors border border-transparent hover:border-[#E8E8E4]"
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}