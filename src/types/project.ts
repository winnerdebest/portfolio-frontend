export interface ProjectImage {
  id: number;
  image_url: string | null;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  preview_image_url: string | null;
  technologies: string[];
  project_link: string;
  updated_at: string;
  images: ProjectImage[];
}
