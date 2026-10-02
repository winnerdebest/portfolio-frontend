export interface SkillItem {
  name: string;
  iconClass: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  current: boolean;
  impact: string;
}

export interface SiteContent {
  id?: number;
  hero_title: string;
  hero_tagline: string;
  typewriter_texts: string[];
  avatar_url: string;
  resume_url: string;
  status_badge: string;

  about_quote: string;
  about_paragraphs: string[];
  about_tags: string[];

  skill_categories: SkillCategory[];
  testimonials: TestimonialItem[];
  experiences: ExperienceItem[];

  contact_email: string;
  contact_phone: string;
  contact_location: string;
  whatsapp_number: string;
  github_url: string;
  linkedin_url: string;
  x_url: string;
  updated_at?: string;
}

export interface ProjectImage {
  id: number;
  image: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  preview_image: string | null;
  technologies: string[];
  images?: ProjectImage[];
  project_link: string;
  is_featured: boolean;
  updated_at?: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  is_staff: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}
