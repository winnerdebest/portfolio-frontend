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
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Section number decoration */}
        <div className="section-number">03</div>

        <div className="mb-12 md:mb-16">
          <p
            className="uppercase tracking-widest text-xs mb-3"
            style={{ fontFamily: 'var(--font-code), monospace', color: '#E8651A' }}
          >
            03 — Projects
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#0D0D0D' }}
          >
            Featured Work
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: '#444' }}>
            A selection of recent projects that showcase my skills and approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E8E4',
                borderTop: '3px solid #E8651A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {project.preview_image && (
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.preview_image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-5 sm:p-6">
                <h3
                  className="text-lg sm:text-xl font-bold mb-2"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#0D0D0D' }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: '#444' }}
                >
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-full"
                      style={{
                        border: '1px solid #E8E8E4',
                        color: '#444',
                        fontFamily: 'var(--font-code), monospace',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: '#E8651A' }}
                  >
                    View Details
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="text-center mt-10">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
            style={{ color: '#E8651A' }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}