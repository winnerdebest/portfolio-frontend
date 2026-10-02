import PortfolioClient from "@/components/PortfolioClient";
import { get } from "@/lib/api";
import { Project } from "@/components/ProjectsSection";
import { SiteContent } from "@/types/content";

export const revalidate = 60; // revalidate every 60 seconds

export default async function Page() {
  let initialProjects: Project[] = [];
  let initialContent: SiteContent | null = null;
  
  try {
    const [projectsData, contentData] = await Promise.all([
      get<Project[]>("/projects/").catch((err) => {
        console.error("Failed to fetch initial projects:", err);
        return [];
      }),
      get<SiteContent>("/api/content/").catch((err) => {
        console.error("Failed to fetch site content:", err);
        return null;
      }),
    ]);

    if (Array.isArray(projectsData)) {
      initialProjects = [...projectsData].sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return b.id - a.id;
      });
    }

    initialContent = contentData;
  } catch (error) {
    console.error("Failed to fetch page data:", error);
  }

  return <PortfolioClient initialProjects={initialProjects} initialContent={initialContent} />;
}