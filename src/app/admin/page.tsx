"use client";

import React, { useState, useEffect } from "react";
import {
  User, LayoutDashboard, FileText, Code2, FolderGit2, Briefcase,
  MessageSquareQuote, Send, LogOut, ExternalLink, Save, Plus, Trash2,
  Upload, Eye, CheckCircle2, AlertCircle, Sparkles, Star, ArrowUpRight,
  ShieldCheck, Lock, RefreshCw, X, Link as LinkIcon
} from "lucide-react";
import {
  getSiteContent, updateSiteContent, loginAdmin, getStoredToken,
  clearStoredAuth, getStoredUser, uploadMedia, get, post, put, del, getMe
} from "@/lib/api";
import { SiteContent, AuthUser, ProjectItem, SkillCategory, TestimonialItem, ExperienceItem } from "@/types/content";

type TabType = "overview" | "hero" | "about" | "skills" | "projects" | "experiences" | "testimonials" | "contact";

export default function AdminPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Site content state
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Verify and load auth session from backend
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setIsLoadingAuth(false);
        return;
      }

      try {
        const verifiedUser = await getMe(storedToken);
        setUser(verifiedUser);
        setToken(storedToken);
      } catch (err) {
        console.warn("Stored session invalid or expired:", err);
        clearStoredAuth();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    verifyAuth();
  }, []);

  // Fetch content & projects when authenticated
  useEffect(() => {
    if (token) {
      fetchContent();
      fetchProjects();
    }
  }, [token]);


  const showToast = (message: string, type: "success" | "error" = "success") => {
    setSaveToast({ type, message });
    setTimeout(() => {
      setSaveToast(null);
    }, 4000);
  };

  const fetchContent = async () => {
    setIsLoadingContent(true);
    try {
      const data = await getSiteContent();
      setContent(data);
    } catch (err: any) {
      showToast("Failed to load site content from API: " + err.message, "error");
    } finally {
      setIsLoadingContent(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const data = await get<ProjectItem[]>("/projects/");
      setProjects(data);
    } catch (err: any) {
      console.error("Failed to load projects", err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await loginAdmin(loginUsername, loginPassword);
      setToken(res.access);
      setUser(res.user);
      showToast("Logged in successfully as " + res.user.username);
    } catch (err: any) {
      setLoginError(err.message || "Invalid username or password");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
  };

  const handleSaveContent = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const updated = await updateSiteContent(content);
      setContent(updated);
      showToast("Site content saved and published live!");
    } catch (err: any) {
      showToast(err.message || "Failed to update site content", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !content) return;
    setIsUploadingImage(true);
    try {
      const url = await uploadMedia(file, token);
      setContent({ ...content, avatar_url: url });
      showToast("Avatar uploaded successfully!");
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;
    setIsUploadingImage(true);
    try {
      const url = await uploadMedia(file, token);
      setEditingProject({ ...editingProject, preview_image: url });
      showToast("Project preview image uploaded!");
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;
    setIsUploadingGallery(true);
    try {
      const newUrls: { id: number; image: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadMedia(files[i], token);
        newUrls.push({ id: Date.now() + i, image: url });
      }
      setEditingProject({
        ...editingProject,
        images: [...(editingProject.images || []), ...newUrls],
      });
      showToast(`${files.length} gallery image(s) uploaded!`);
    } catch (err: any) {
      showToast("Gallery upload failed: " + err.message, "error");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    if (!editingProject) return;
    const imgs = (editingProject.images || []).filter((_, i) => i !== index);
    setEditingProject({ ...editingProject, images: imgs });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.name) return;
    setIsSavingProject(true);
    try {
      const payload = {
        name: editingProject.name,
        short_description: editingProject.short_description || "",
        description: editingProject.description || "",
        technologies: Array.isArray(editingProject.technologies)
          ? editingProject.technologies
          : (editingProject.technologies as any || "").split(",").map((t: string) => t.trim()),
        project_link: editingProject.project_link || "https://",
        is_featured: !!editingProject.is_featured,
        preview_image: editingProject.preview_image,
        gallery_images: editingProject.images?.map((img: any) => typeof img === "string" ? img : img.image) || [],
      };

      if (editingProject.id) {
        // Update
        await put(`/api/projects/${editingProject.id}/`, payload, token);
        showToast("Project updated successfully!");
      } else {
        // Create
        await post(`/api/projects/create/`, payload, token);
        showToast("Project created successfully!");
      }
      setProjectModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err: any) {
      showToast(err.message || "Failed to save project", "error");
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    try {
      await del(`/api/projects/${id}/`, token);
      showToast("Project deleted successfully");
      fetchProjects();
    } catch (err: any) {
      showToast("Failed to delete: " + err.message, "error");
    }
  };

  // Typewriter helper
  const addTypewriterText = () => {
    if (!content) return;
    setContent({
      ...content,
      typewriter_texts: [...(content.typewriter_texts || []), "New Role / Title"],
    });
  };

  const updateTypewriterText = (index: number, val: string) => {
    if (!content) return;
    const list = [...(content.typewriter_texts || [])];
    list[index] = val;
    setContent({ ...content, typewriter_texts: list });
  };

  const removeTypewriterText = (index: number) => {
    if (!content) return;
    const list = (content.typewriter_texts || []).filter((_, i) => i !== index);
    setContent({ ...content, typewriter_texts: list });
  };

  // About paragraphs helper
  const addAboutParagraph = () => {
    if (!content) return;
    setContent({
      ...content,
      about_paragraphs: [...(content.about_paragraphs || []), ""],
    });
  };

  const updateAboutParagraph = (index: number, val: string) => {
    if (!content) return;
    const list = [...(content.about_paragraphs || [])];
    list[index] = val;
    setContent({ ...content, about_paragraphs: list });
  };

  const removeAboutParagraph = (index: number) => {
    if (!content) return;
    const list = (content.about_paragraphs || []).filter((_, i) => i !== index);
    setContent({ ...content, about_paragraphs: list });
  };

  // About tags helper
  const addAboutTag = () => {
    if (!content) return;
    setContent({
      ...content,
      about_tags: [...(content.about_tags || []), "#NewTag"],
    });
  };

  const updateAboutTag = (index: number, val: string) => {
    if (!content) return;
    const list = [...(content.about_tags || [])];
    list[index] = val;
    setContent({ ...content, about_tags: list });
  };

  const removeAboutTag = (index: number) => {
    if (!content) return;
    const list = (content.about_tags || []).filter((_, i) => i !== index);
    setContent({ ...content, about_tags: list });
  };

  // Skill category helpers
  const addSkillCategory = () => {
    if (!content) return;
    const newCat: SkillCategory = {
      title: "New Category",
      skills: [{ name: "Skill Name", iconClass: "devicon-python-plain colored" }],
    };
    setContent({
      ...content,
      skill_categories: [...(content.skill_categories || []), newCat],
    });
  };

  const updateCategoryTitle = (catIndex: number, title: string) => {
    if (!content) return;
    const cats = [...(content.skill_categories || [])];
    cats[catIndex] = { ...cats[catIndex], title };
    setContent({ ...content, skill_categories: cats });
  };

  const removeCategory = (catIndex: number) => {
    if (!content) return;
    const cats = (content.skill_categories || []).filter((_, i) => i !== catIndex);
    setContent({ ...content, skill_categories: cats });
  };

  const addSkillToCategory = (catIndex: number) => {
    if (!content) return;
    const cats = [...(content.skill_categories || [])];
    cats[catIndex] = {
      ...cats[catIndex],
      skills: [...(cats[catIndex].skills || []), { name: "New Skill", iconClass: "devicon-javascript-plain colored" }],
    };
    setContent({ ...content, skill_categories: cats });
  };

  const updateSkill = (catIndex: number, skillIndex: number, field: "name" | "iconClass", val: string) => {
    if (!content) return;
    const cats = [...(content.skill_categories || [])];
    const skills = [...(cats[catIndex].skills || [])];
    skills[skillIndex] = { ...skills[skillIndex], [field]: val };
    cats[catIndex] = { ...cats[catIndex], skills };
    setContent({ ...content, skill_categories: cats });
  };

  const removeSkillFromCategory = (catIndex: number, skillIndex: number) => {
    if (!content) return;
    const cats = [...(content.skill_categories || [])];
    cats[catIndex] = {
      ...cats[catIndex],
      skills: (cats[catIndex].skills || []).filter((_, i) => i !== skillIndex),
    };
    setContent({ ...content, skill_categories: cats });
  };

  // Experience helpers
  const addExperience = () => {
    if (!content) return;
    const newExp: ExperienceItem = {
      company: "Company Name",
      role: "Software Engineer",
      duration: "Present",
      current: true,
      impact: "Key contributions and accomplishments...",
    };
    setContent({
      ...content,
      experiences: [newExp, ...(content.experiences || [])],
    });
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, val: any) => {
    if (!content) return;
    const list = [...(content.experiences || [])];
    list[index] = { ...list[index], [field]: val };
    setContent({ ...content, experiences: list });
  };

  const removeExperience = (index: number) => {
    if (!content) return;
    const list = (content.experiences || []).filter((_, i) => i !== index);
    setContent({ ...content, experiences: list });
  };

  // Testimonials helpers
  const addTestimonial = () => {
    if (!content) return;
    const newTest: TestimonialItem = {
      name: "Client Name",
      role: "Company / Project",
      quote: "Great working with Winner! Excellent problem solving and fast delivery.",
    };
    setContent({
      ...content,
      testimonials: [...(content.testimonials || []), newTest],
    });
  };

  const updateTestimonial = (index: number, field: keyof TestimonialItem, val: string) => {
    if (!content) return;
    const list = [...(content.testimonials || [])];
    list[index] = { ...list[index], [field]: val };
    setContent({ ...content, testimonials: list });
  };

  const removeTestimonial = (index: number) => {
    if (!content) return;
    const list = (content.testimonials || []).filter((_, i) => i !== index);
    setContent({ ...content, testimonials: list });
  };

  // Loading screen
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#A1A1AA]">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#FF6B00]" />
          <span>Loading admin session...</span>
        </div>
      </div>
    );
  }

  // Login screen
  if (!token || !user) {
    return (
      <div className="min-h-screen bg-[#050505] dot-grid flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00]/[0.05] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-[#FF6B00]/30 shadow-2xl shadow-[#FF6B00]/20 mb-4">
              <ShieldCheck className="w-8 h-8 text-[#FF6B00]" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-white tracking-tight">Portfolio Admin CMS</h1>
            <p className="text-sm text-[#71717A] mt-1">Sign in with your admin credentials to edit live portfolio content</p>
          </div>

          <div className="bg-[#111113] border border-white/[0.08] rounded-2xl p-6 sm:p-8 card-shadow backdrop-blur-xl">
            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. winneradmin"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#52525B] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#52525B] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-all text-sm"
                  />
                  <Lock className="w-4 h-4 text-[#52525B] absolute right-4 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-sm hover:bg-[#FF8533] shadow-lg shadow-[#FF6B00]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Enter Dashboard</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-xs text-[#71717A] hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Return to live website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-[#050505] text-[#A1A1AA] font-body flex flex-col">
      {/* Toast notification */}
      {saveToast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-xl transition-all animate-bounce ${
            saveToast.type === "success"
              ? "bg-[#111113]/95 border-emerald-500/40 text-emerald-400"
              : "bg-[#111113]/95 border-red-500/40 text-red-400"
          }`}
        >
          {saveToast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="text-sm font-medium">{saveToast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black font-heading text-white">
              W<span className="text-[#FF6B00]">.</span>
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] font-semibold uppercase tracking-wider">
              Admin CMS
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/[0.08] text-xs font-medium text-[#A1A1AA] hover:text-white hover:border-white/[0.2] transition-all"
            >
              <span>View Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-white">
              <User className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{user.username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="bg-[#0A0A0C] border-b border-white/[0.06] px-4 sm:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2.5 min-w-max">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "hero", label: "Hero & Profile", icon: User },
            { id: "about", label: "About & Bio", icon: FileText },
            { id: "skills", label: "Skills & Stack", icon: Code2 },
            { id: "projects", label: "Projects Manager", icon: FolderGit2, badge: projects.length },
            { id: "experiences", label: "Career Journey", icon: Briefcase, badge: content?.experiences?.length },
            { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, badge: content?.testimonials?.length },
            { id: "contact", label: "Contact & Socials", icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20"
                    : "text-[#71717A] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-code ${
                      isActive ? "bg-black/30 text-white" : "bg-white/[0.06] text-[#A1A1AA]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {isLoadingContent ? (
          <div className="py-24 text-center text-[#71717A] flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#FF6B00]" />
            <p>Fetching content...</p>
          </div>
        ) : (
          <div>
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">Portfolio Overview</h2>
                  <p className="text-sm text-[#71717A] mt-1">Manage and edit all content on your live portfolio.</p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#111113] p-5 rounded-2xl border border-white/[0.06] card-shadow">
                    <div className="text-xs font-code text-[#71717A] mb-1">TOTAL PROJECTS</div>
                    <div className="text-3xl font-black font-heading text-white">{projects.length}</div>
                    <div className="text-xs text-[#FF6B00] mt-1">{projects.filter(p => p.is_featured).length} Featured</div>
                  </div>

                  <div className="bg-[#111113] p-5 rounded-2xl border border-white/[0.06] card-shadow">
                    <div className="text-xs font-code text-[#71717A] mb-1">SKILL CATEGORIES</div>
                    <div className="text-3xl font-black font-heading text-white">{content?.skill_categories?.length || 0}</div>
                    <div className="text-xs text-[#71717A] mt-1">
                      {(content?.skill_categories || []).reduce((acc, c) => acc + (c.skills?.length || 0), 0)} Total skills
                    </div>
                  </div>

                  <div className="bg-[#111113] p-5 rounded-2xl border border-white/[0.06] card-shadow">
                    <div className="text-xs font-code text-[#71717A] mb-1">CAREER MILESTONES</div>
                    <div className="text-3xl font-black font-heading text-white">{content?.experiences?.length || 0}</div>
                    <div className="text-xs text-emerald-400 mt-1">Timeline events</div>
                  </div>

                  <div className="bg-[#111113] p-5 rounded-2xl border border-white/[0.06] card-shadow">
                    <div className="text-xs font-code text-[#71717A] mb-1">TESTIMONIALS</div>
                    <div className="text-3xl font-black font-heading text-white">{content?.testimonials?.length || 0}</div>
                    <div className="text-xs text-[#71717A] mt-1">Client reviews</div>
                  </div>
                </div>

                {/* Quick actions grid */}
                <div className="grid sm:grid-cols-3 gap-5">
                  <div
                    onClick={() => {
                      setEditingProject({
                        name: "",
                        short_description: "",
                        description: "",
                        technologies: [],
                        project_link: "https://",
                        is_featured: false,
                        preview_image: null,
                      });
                      setProjectModalOpen(true);
                    }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-[#FF6B00]/10 to-transparent border border-[#FF6B00]/30 hover:border-[#FF6B00] transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg">Add New Project</h3>
                    <p className="text-xs text-[#71717A] mt-1">Upload images, add descriptions and link github or demo URLs.</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("hero")}
                    className="p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg">Edit Hero & Bio</h3>
                    <p className="text-xs text-[#71717A] mt-1">Update your title, tagline, avatar image, and resume link.</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("contact")}
                    className="p-6 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.15] transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <Send className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg">Socials & Contact</h3>
                    <p className="text-xs text-[#71717A] mt-1">Change email, phone, whatsapp number, and social links.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. HERO & PROFILE TAB */}
            {activeTab === "hero" && content && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">Hero & Profile Settings</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Control the primary headline, typewriter roles, avatar, and resume.</p>
                  </div>
                  <button
                    onClick={handleSaveContent}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                </div>

                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-6 card-shadow">
                  {/* Avatar section */}
                  <div>
                    <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-3">
                      Avatar Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#FF6B00]/40 bg-[#050505]">
                        <img
                          src={content.avatar_url || "/winners image.jpeg"}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={content.avatar_url}
                            onChange={(e) => setContent({ ...content, avatar_url: e.target.value })}
                            placeholder="/winners image.jpeg or https://..."
                            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                          <label className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium cursor-pointer flex items-center gap-2 transition-all border border-white/[0.08]">
                            <Upload className="w-4 h-4 text-[#FF6B00]" />
                            <span>{isUploadingImage ? "Uploading..." : "Upload File"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                              className="hidden"
                              disabled={isUploadingImage}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-[#71717A]">Upload an image directly or paste a hosted URL.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        Hero Main Title
                      </label>
                      <input
                        type="text"
                        value={content.hero_title}
                        onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                        placeholder="I'm Winner."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        Resume / CV Link or Path
                      </label>
                      <input
                        type="text"
                        value={content.resume_url}
                        onChange={(e) => setContent({ ...content, resume_url: e.target.value })}
                        placeholder="/WinnerOrluVictor_CV.pdf"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                      Hero Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={content.hero_tagline}
                      onChange={(e) => setContent({ ...content, hero_tagline: e.target.value })}
                      placeholder="Software Engineer building and deploying SaaS products."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none resize-none"
                    />
                  </div>

                  {/* Typewriter text list */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                        Rotating Typewriter Titles
                      </label>
                      <button
                        type="button"
                        onClick={addTypewriterText}
                        className="text-xs text-[#FF6B00] hover:text-[#FF8533] flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Title
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(content.typewriter_texts || []).map((text, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={text}
                            onChange={(e) => updateTypewriterText(idx, e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeTypewriterText(idx)}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ABOUT & BIO TAB */}
            {activeTab === "about" && content && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">About Me Section</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Customize your quote, narrative bio paragraphs, and highlighted tags.</p>
                  </div>
                  <button
                    onClick={handleSaveContent}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                </div>

                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-6 card-shadow">
                  <div>
                    <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                      Highlighted Quote / Punchline
                    </label>
                    <input
                      type="text"
                      value={content.about_quote}
                      onChange={(e) => setContent({ ...content, about_quote: e.target.value })}
                      placeholder="If it's complex, tedious, or critical, that's my lane."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                    />
                  </div>

                  {/* Bio paragraphs */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                        Bio Paragraphs
                      </label>
                      <button
                        type="button"
                        onClick={addAboutParagraph}
                        className="text-xs text-[#FF6B00] hover:text-[#FF8533] flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Paragraph
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(content.about_paragraphs || []).map((para, idx) => (
                        <div key={idx} className="relative group">
                          <textarea
                            rows={3}
                            value={para}
                            onChange={(e) => updateAboutParagraph(idx, e.target.value)}
                            placeholder={`Paragraph ${idx + 1}...`}
                            className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeAboutParagraph(idx)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                            title="Remove paragraph"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* About tags */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                        Feature Tags
                      </label>
                      <button
                        type="button"
                        onClick={addAboutTag}
                        className="text-xs text-[#FF6B00] hover:text-[#FF8533] flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Tag
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {(content.about_tags || []).map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => updateAboutTag(idx, e.target.value)}
                            className="w-24 bg-transparent text-xs text-white outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeAboutTag(idx)}
                            className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SKILLS TAB */}
            {activeTab === "skills" && content && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">Skills & Technologies</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Organize your technologies into categories with devicon icon classes.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={addSkillCategory}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#FF6B00]" /> Add Category
                    </button>
                    <button
                      onClick={handleSaveContent}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
                    >
                      {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {(content.skill_categories || []).map((category, catIdx) => (
                    <div key={catIdx} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 sm:p-6 card-shadow space-y-4">
                      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-xs font-code text-[#71717A]">#{catIdx + 1}</span>
                          <input
                            type="text"
                            value={category.title}
                            onChange={(e) => updateCategoryTitle(catIdx, e.target.value)}
                            className="text-lg font-bold font-heading text-white bg-transparent outline-none focus:text-[#FF6B00] border-b border-transparent focus:border-[#FF6B00]"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addSkillToCategory(catIdx)}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-white hover:bg-white/[0.08] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#FF6B00]" /> Add Skill
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCategory(catIdx)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Skills grid */}
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {(category.skills || []).map((skill, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <i className={`${skill.iconClass} text-xl text-[#FF6B00]`} />
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) => updateSkill(catIdx, sIdx, "name", e.target.value)}
                                  placeholder="Skill name"
                                  className="w-full bg-transparent text-xs font-semibold text-white outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSkillFromCategory(catIdx, sIdx)}
                                className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={skill.iconClass}
                              onChange={(e) => updateSkill(catIdx, sIdx, "iconClass", e.target.value)}
                              placeholder="devicon-...-plain"
                              className="w-full px-2.5 py-1 rounded bg-black/40 text-[10px] font-code text-[#71717A] focus:text-white outline-none border border-white/[0.04]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">Projects Manager</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Add, edit, feature, and remove showcase projects.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProject({
                        name: "",
                        short_description: "",
                        description: "",
                        technologies: [],
                        project_link: "https://",
                        is_featured: false,
                        preview_image: null,
                      });
                      setProjectModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                  </button>
                </div>

                {isLoadingProjects ? (
                  <div className="py-16 text-center text-[#71717A]">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="py-16 text-center bg-[#111113] rounded-2xl border border-white/[0.06] p-8">
                    <p className="text-white font-bold text-lg mb-2">No projects found</p>
                    <p className="text-sm text-[#71717A] mb-4">Get started by creating your first showcase project.</p>
                    <button
                      onClick={() => {
                        setEditingProject({
                          name: "",
                          short_description: "",
                          description: "",
                          technologies: [],
                          project_link: "https://",
                          is_featured: false,
                          preview_image: null,
                        });
                        setProjectModalOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs"
                    >
                      Add Project
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden card-shadow flex flex-col justify-between group hover:border-[#FF6B00]/30 transition-all"
                      >
                        {/* Preview Image */}
                        <div className="relative h-44 bg-[#050505] overflow-hidden">
                          {proj.preview_image ? (
                            <img
                              src={proj.preview_image}
                              alt={proj.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#52525B]">
                              <FolderGit2 className="w-12 h-12" />
                            </div>
                          )}

                          {proj.is_featured && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                              <Star className="w-3 h-3 fill-current" /> Featured
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="text-lg font-bold font-heading text-white line-clamp-1">{proj.name}</h3>
                            <p className="text-xs text-[#71717A] mt-1 line-clamp-2">
                              {proj.short_description || proj.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {(proj.technologies || []).slice(0, 4).map((t, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[#A1A1AA] border border-white/[0.06]">
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                            <a
                              href={`/projects/${proj.slug}`}
                              target="_blank"
                              className="text-xs text-[#71717A] hover:text-white flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> Preview
                            </a>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingProject(proj);
                                  setProjectModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-white font-medium transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. EXPERIENCES TAB */}
            {activeTab === "experiences" && content && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">Career Journey Timeline</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Manage your career history, roles, and accomplishments.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={addExperience}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#FF6B00]" /> Add Milestone
                    </button>
                    <button
                      onClick={handleSaveContent}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
                    >
                      {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {(content.experiences || []).map((exp, idx) => (
                    <div key={idx} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 card-shadow space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-code text-[#FF6B00]">Milestone #{idx + 1}</span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 text-xs text-[#A1A1AA] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(idx, "current", e.target.checked)}
                              className="accent-[#FF6B00] rounded"
                            />
                            <span>Current Role</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeExperience(idx)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(idx, "company", e.target.value)}
                            placeholder="Quickcarts"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Role / Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(idx, "role", e.target.value)}
                            placeholder="Lead Developer"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Duration</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                            placeholder="Present / 1 year"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Impact & Description</label>
                        <textarea
                          rows={2}
                          value={exp.impact}
                          onChange={(e) => updateExperience(idx, "impact", e.target.value)}
                          placeholder="What did you build or lead in this position?"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. TESTIMONIALS TAB */}
            {activeTab === "testimonials" && content && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">Client Testimonials</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Manage references, client reviews, and student endorsements.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#FF6B00]" /> Add Review
                    </button>
                    <button
                      onClick={handleSaveContent}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
                    >
                      {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {(content.testimonials || []).map((test, idx) => (
                    <div key={idx} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 card-shadow space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-code text-[#FF6B00]">Review #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeTestimonial(idx)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Author / Name</label>
                          <input
                            type="text"
                            value={test.name}
                            onChange={(e) => updateTestimonial(idx, "name", e.target.value)}
                            placeholder="e.g. John Doe / Team Lead"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Role / Organization</label>
                          <input
                            type="text"
                            value={test.role}
                            onChange={(e) => updateTestimonial(idx, "role", e.target.value)}
                            placeholder="Career On Track"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#71717A] uppercase mb-1">Quote Content</label>
                        <textarea
                          rows={3}
                          value={test.quote}
                          onChange={(e) => updateTestimonial(idx, "quote", e.target.value)}
                          placeholder="What did they say about your work?"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. CONTACT & SOCIALS TAB */}
            {activeTab === "contact" && content && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-heading text-white">Contact & Social Links</h2>
                    <p className="text-sm text-[#71717A] mt-0.5">Control contact details, WhatsApp button, and social profiles.</p>
                  </div>
                  <button
                    onClick={handleSaveContent}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs sm:text-sm hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                </div>

                <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-5 card-shadow">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={content.contact_email}
                        onChange={(e) => setContent({ ...content, contact_email: e.target.value })}
                        placeholder="winnerbrown9@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={content.contact_phone}
                        onChange={(e) => setContent({ ...content, contact_phone: e.target.value })}
                        placeholder="+234 814 231 0497"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        Location String
                      </label>
                      <input
                        type="text"
                        value={content.contact_location}
                        onChange={(e) => setContent({ ...content, contact_location: e.target.value })}
                        placeholder="Rivers State, Nigeria"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                        WhatsApp Number (with country code)
                      </label>
                      <input
                        type="text"
                        value={content.whatsapp_number}
                        onChange={(e) => setContent({ ...content, whatsapp_number: e.target.value })}
                        placeholder="+2348142310497"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] space-y-4">
                    <h3 className="text-sm font-bold font-heading text-white">Social Profiles</h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#71717A] uppercase mb-1.5">GitHub URL</label>
                      <input
                        type="url"
                        value={content.github_url}
                        onChange={(e) => setContent({ ...content, github_url: e.target.value })}
                        placeholder="https://github.com/winnerdebest"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#71717A] uppercase mb-1.5">LinkedIn URL</label>
                      <input
                        type="url"
                        value={content.linkedin_url}
                        onChange={(e) => setContent({ ...content, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/winner-orluvictor-944175333"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#71717A] uppercase mb-1.5">X (Twitter) URL</label>
                      <input
                        type="url"
                        value={content.x_url}
                        onChange={(e) => setContent({ ...content, x_url: e.target.value })}
                        placeholder="https://x.com/buildwithwinner"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Project Create/Edit Modal */}
      {/* Project Create/Edit Modal */}
      {projectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-[#111113] border border-white/[0.1] rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0E0E10] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                <h3 className="text-lg font-bold font-heading text-white">
                  {editingProject.id ? "Edit Project" : "Add New Project"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="text-[#71717A] hover:text-white p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveProject} id="projectForm" className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.name || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  placeholder="e.g. QuickCarts SaaS"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                />
              </div>

              {/* Preview image upload */}
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Main Thumbnail / Preview Image
                </label>
                <div className="space-y-3">
                  {editingProject.preview_image && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/60 border border-white/[0.08]">
                      <img
                        src={editingProject.preview_image}
                        alt="Preview"
                        className="w-full h-full object-contain bg-[#050505]"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingProject.preview_image || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, preview_image: e.target.value })}
                      placeholder="Image URL or upload below"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs focus:border-[#FF6B00] outline-none"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium cursor-pointer flex items-center gap-1.5 border border-white/[0.08] transition-all">
                      <Upload className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{isUploadingImage ? "Uploading..." : "Upload File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProjectImageUpload}
                        className="hidden"
                        disabled={isUploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Gallery Multiple Pictures (Detail page carousel) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                      Detail Page Gallery (Multiple Pictures)
                    </label>
                    <p className="text-[11px] text-[#71717A]">These appear in the interactive carousel on the project detail view.</p>
                  </div>
                  <label className="px-3 py-1.5 rounded-lg bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-semibold cursor-pointer flex items-center gap-1.5 border border-[#FF6B00]/30 transition-all shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingGallery ? "Uploading..." : "Add Picture(s)"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                      disabled={isUploadingGallery}
                    />
                  </label>
                </div>

                {editingProject.images && editingProject.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {editingProject.images.map((imgItem: any, idx: number) => {
                      const imgUrl = typeof imgItem === "string" ? imgItem : imgItem.image;
                      return (
                        <div key={idx} className="relative group rounded-xl overflow-hidden bg-black/60 border border-white/[0.08] aspect-video">
                          <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                              title="Delete this picture"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-code text-[#A1A1AA]">
                            #{idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-[#71717A] bg-white/[0.02] border border-dashed border-white/[0.08] rounded-xl p-4 text-center">
                    No gallery pictures uploaded yet. Click &quot;Add Picture(s)&quot; to upload screenshots.
                  </div>
                )}
              </div>


              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editingProject.short_description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  placeholder="One-line summary shown on cards"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Comprehensive explanation of what the project does, architecture, features..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingProject.technologies)
                      ? editingProject.technologies.join(", ")
                      : editingProject.technologies || ""
                  }
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(",").map(t => t.trim()) })}
                  placeholder="Python, Django, React, PostgreSQL, Tailwind"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Live Project URL / Demo Link
                </label>
                <input
                  type="url"
                  value={editingProject.project_link || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, project_link: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:border-[#FF6B00] outline-none"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={!!editingProject.is_featured}
                  onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-[#FF6B00] rounded cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-sm font-semibold text-white cursor-pointer select-none">
                  Mark as Featured Project on homepage
                </label>
              </div>
            </form>

            {/* Fixed Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.08] bg-[#0E0E10] shrink-0">
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#71717A] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="projectForm"
                disabled={isSavingProject}
                className="px-6 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#FF8533] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50"
              >
                {isSavingProject ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{editingProject.id ? "Update Project" : "Create Project"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
