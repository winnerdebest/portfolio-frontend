// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { get } from "@/lib/api";
import ProjectDetail from "./ProjectDetail";

type Project = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  project_link: string;
  technologies: string[];
  images: { id: number; image: string }[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ✅ SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // ✅ Await params
  
  try {
    const project = await get<Project>(`/projects/${slug}/`);

    return {
      title: `${project.name} | Winner OrluVictor`,
      description: project.short_description,
      openGraph: {
        title: project.name,
        description: project.short_description,
        images: project.images?.[0]?.image
          ? [{ url: project.images[0].image }]
          : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: project.name,
        description: project.short_description,
        images: project.images?.[0]?.image
          ? [project.images[0].image]
          : [],
      },
    };
  } catch {
    return {
      title: "Project Not Found",
      description: "This project does not exist.",
    };
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params; // ✅ Await params
  let project: Project;

  try {
    project = await get<Project>(`/projects/${slug}/`);
  } catch {
    notFound();
  }

  return <ProjectDetail project={project} />;
}