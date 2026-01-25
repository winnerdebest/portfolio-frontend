// src/components/ClientProjectsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react";

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
  isDarkMode?: boolean;
};

export default function ClientProjectsSection({
  endpoint,
  isDarkMode = false,
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
        className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-b from-slate-900 to-gray-900"
            : "bg-gradient-to-b from-gray-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 sm:py-20">
            <div className="inline-block w-10 h-10 sm:w-12 sm:h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-b from-slate-900 to-gray-900"
            : "bg-gradient-to-b from-gray-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-center py-12 sm:py-20 text-sm sm:text-base text-red-500">
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
        className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-b from-slate-900 to-gray-900"
            : "bg-gradient-to-b from-gray-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-center py-12 sm:py-20 text-sm sm:text-base text-gray-500">
            No projects found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-gray-900"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            A selection of my recent projects that showcase my skills and approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              className={`group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-violet-700 hover:shadow-violet-900/30"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={project.preview_image ?? "/placeholder.png"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-4 sm:p-6">
                <h3
                  className={`text-lg sm:text-2xl font-bold mb-2 sm:mb-3 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {project.name}
                </h3>
                <p
                  className={`text-sm sm:text-base mb-3 sm:mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-violet-900/30 text-violet-400 border-violet-800"
                          : "bg-violet-50 text-violet-700 border-violet-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-violet-600 font-semibold group-hover:underline">
                  View Details
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}