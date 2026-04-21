// src/app/projects/page.tsx
import { get } from "@/lib/api";
import type { Metadata } from "next";
import AllProjectsClient from "./AllProjectsClient";

export const metadata: Metadata = {
  title: "All Projects | Winner OrluVictor",
  description:
    "Browse all projects by Winner OrluVictor — Full Stack Developer specializing in Python, Django, React, and Next.js.",
};

type Project = {
  id: number;
  name: string;
  short_description: string;
  preview_image: string | null;
  technologies: string[];
  slug: string;
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await get<Project[]>("/projects/");
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load projects";
  }

  return <AllProjectsClient projects={projects} error={error} />;
}
