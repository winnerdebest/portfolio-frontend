import PortfolioClient from "@/components/PortfolioClient";
import { get } from "@/lib/api";
import { Project } from "@/components/ProjectsSection";

export const revalidate = 60; // revalidate every 60 seconds if needed, or leave dynamic

export default async function Page() {
  let initialProjects: Project[] = [];
  
  try {
    const data = await get<Project[]>("/projects/");
    // Apply sorting logic identical to ClientProjectsSection so it's consistent
    initialProjects = [...data].sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.id - a.id;
    });
  } catch (error) {
    console.error("Failed to fetch initial projects:", error);
  }

  return <PortfolioClient initialProjects={initialProjects} />;
}