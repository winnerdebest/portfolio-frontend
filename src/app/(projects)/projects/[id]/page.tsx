"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Github, Linkedin, Mail, ExternalLink, 
  ChevronLeft, ChevronRight, Calendar, Code, Database,
  Palette, Terminal, Server, Globe, Smartphone, Cloud,
  Layers, Sparkles, MessageSquare, X, Menu,
  Loader2 // Added for loading state
} from 'lucide-react';
import Image from 'next/image';

interface ProjectDetailProps {
  project?: {
    id: number;
    name: string;
    short_description: string;
    description: string;
    project_link: string;
    technologies: string[];
    images: {
      url: string;
      alt: string;
    }[];
    features?: string[];
    challenges?: string[];
    role?: string;
    duration?: string;
  };
}

// Default placeholder project data
const placeholderProject = {
  id: 1,
  name: "E-Commerce Platform",
  short_description: "A modern full-stack e-commerce solution with advanced features and seamless user experience.",
  description: "This project is a comprehensive e-commerce platform built with modern technologies to provide a seamless shopping experience. It includes features like user authentication, product catalog, shopping cart, payment processing, and order management. The platform is designed to be scalable, secure, and user-friendly.",
  project_link: "#",
  technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  images: [
    { url: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80", alt: "E-commerce dashboard" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", alt: "Product catalog view" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", alt: "Checkout process" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", alt: "Admin panel" }
  ],
  features: [
    "User authentication and authorization system",
    "Product catalog with advanced filtering and search",
    "Shopping cart with real-time updates",
    "Secure payment processing with Stripe integration",
    "Order tracking and management system",
    "Admin dashboard for product and order management"
  ],
  challenges: [
    "Scalability: Implemented microservices architecture to handle 10k+ concurrent users",
    "Performance: Optimized database queries and implemented caching for faster load times",
    "Security: Implemented proper authentication, authorization, and data encryption"
  ],
  role: "Full-Stack Developer",
  duration: "3 Months"
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  // Use the provided project or fallback to placeholder
  const currentProject = project || placeholderProject;
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Set to false since we have placeholder

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
  };

  const getTechIcon = (tech: string) => {
    const techIcons: Record<string, React.ReactNode> = {
      'Python': <Terminal className="w-8 h-8" />,
      'Django': <Code className="w-8 h-8" />,
      'PostgreSQL': <Database className="w-8 h-8" />,
      'React': <Layers className="w-8 h-8" />,
      'Next.js': <Globe className="w-8 h-8" />,
      'TypeScript': <Code className="w-8 h-8" />,
      'Tailwind CSS': <Palette className="w-8 h-8" />,
      'HTML/CSS': <Palette className="w-8 h-8" />,
      'JavaScript': <Code className="w-8 h-8" />,
      'Redis': <Database className="w-8 h-8" />,
      'Docker': <Server className="w-8 h-8" />,
      'AWS': <Cloud className="w-8 h-8" />,
      'REST API': <Globe className="w-8 h-8" />,
      'GraphQL': <Globe className="w-8 h-8" />,
      'Mobile': <Smartphone className="w-8 h-8" />,
      'Node.js': <Server className="w-8 h-8" />,
    };

    return techIcons[tech] || <Code className="w-8 h-8" />;
  };

  const getTechColor = (tech: string) => {
    const colorMap: Record<string, string> = {
      'Python': 'from-emerald-500 to-green-400',
      'Django': 'from-green-600 to-emerald-400',
      'React': 'from-cyan-500 to-blue-400',
      'Next.js': 'from-gray-800 to-gray-600',
      'TypeScript': 'from-blue-600 to-blue-400',
      'JavaScript': 'from-yellow-500 to-orange-400',
      'Tailwind CSS': 'from-teal-500 to-cyan-400',
      'PostgreSQL': 'from-blue-500 to-indigo-400',
      'Redis': 'from-red-500 to-orange-400',
      'Docker': 'from-blue-400 to-cyan-400',
      'AWS': 'from-orange-500 to-yellow-400',
      'Node.js': 'from-green-500 to-emerald-400',
    };

    return colorMap[tech] || 'from-violet-500 to-purple-400';
  };

  // Show loading state if needed
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-slate-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? isDarkMode
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-800' 
            : 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              WinnerDev
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className={`flex items-center gap-2 transition-all ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden transition-colors duration-300 border-t shadow-lg ${
            isDarkMode 
              ? 'bg-gray-900/95 backdrop-blur-xl border-gray-800' 
              : 'bg-white/95 backdrop-blur-xl border-gray-200'
          }`}>
            <div className="px-4 py-4 space-y-3">
              <a 
                href="/" 
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </a>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {isDarkMode ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Project Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-50 transition-colors duration-500 ${
              isDarkMode ? 'bg-violet-900' : 'bg-violet-100'
            }`} />
            <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-50 transition-colors duration-500 ${
              isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
            }`} />
          </div>

          <div className="text-center relative z-10">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 mb-8 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-700' 
                : 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200'
            }`}>
              <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full animate-pulse" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>
                Case Study
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                {currentProject.name}
              </span>
            </h1>

            <p className={`text-xl leading-relaxed max-w-3xl mx-auto mb-10 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {currentProject.short_description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              {currentProject.role && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                  </div>
                  <div className="text-left">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Role</div>
                    <div className="font-semibold">{currentProject.role}</div>
                  </div>
                </div>
              )}

              {currentProject.duration && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Duration</div>
                    <div className="font-semibold">{currentProject.duration}</div>
                  </div>
                </div>
              )}
            </div>

            <a
              href={currentProject.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
            >
              <span>View Live Project</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Description */}
            <section id="description" className="scroll-mt-20">
              <div className={`p-8 rounded-3xl border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-gray-800/50 to-slate-800/50 border-gray-700' 
                  : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'
              }`}>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                    Project Overview
                  </span>
                </h2>
                <div className={`prose dark:prose-invert max-w-none ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <p className="text-lg leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>
              </div>
            </section>

            {/* Project Gallery */}
            <section id="gallery" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                  Project Gallery
                </span>
              </h2>

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                <div className="relative h-96 w-full">
                  <Image
                    src={currentProject.images[currentImageIndex]?.url || '/placeholder.png'}
                    alt={currentProject.images[currentImageIndex]?.alt || 'Project screenshot'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="100vw"
                    unoptimized // Add this for external images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Navigation Buttons */}
                {currentProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-sm transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800/80 text-white hover:bg-gray-700/80' 
                          : 'bg-white/80 text-gray-800 hover:bg-white'
                      }`}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-sm transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800/80 text-white hover:bg-gray-700/80' 
                          : 'bg-white/80 text-gray-800 hover:bg-white'
                      }`}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {currentProject.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {currentProject.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-transparent' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 25vw, 16.666vw"
                        unoptimized // Add this for external images
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Project Features */}
            {currentProject.features && currentProject.features.length > 0 && (
              <section id="features" className="scroll-mt-20">
                <h2 className="text-3xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                    Key Features
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {currentProject.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-gray-800/50 to-slate-800/50 border-gray-700 hover:border-violet-700' 
                          : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" />
                        </div>
                        <h3 className="text-xl font-semibold">Feature {index + 1}</h3>
                      </div>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Technologies Stack */}
            <section id="technologies" className="scroll-mt-20">
              <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-gray-800/50 to-slate-800/50 border-gray-700' 
                  : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'
              }`}>
                <h3 className="text-2xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                    Tech Stack
                  </span>
                </h3>
                <div className="space-y-4">
                  {currentProject.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700 hover:border-violet-700' 
                          : 'bg-gray-50 border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTechColor(tech)} flex items-center justify-center text-white shadow-lg`}>
                        {getTechIcon(tech)}
                      </div>
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Project Challenges */}
            {currentProject.challenges && currentProject.challenges.length > 0 && (
              <section id="challenges" className="scroll-mt-20">
                <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-rose-900/20 to-pink-900/20 border-rose-800' 
                    : 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200'
                }`}>
                  <h3 className="text-2xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                      Challenges & Solutions
                    </span>
                  </h3>
                  <ul className="space-y-4">
                    {currentProject.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 mt-2 flex-shrink-0" />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {challenge}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Quick Stats */}
            <section id="stats" className="scroll-mt-20">
              <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-800' 
                  : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
              }`}>
                <h3 className="text-2xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Project Stats
                  </span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Technologies</span>
                    <span className="font-semibold">{currentProject.technologies.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Images</span>
                    <span className="font-semibold">{currentProject.images.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Status</span>
                    <span className="font-semibold text-green-500">Live</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Sidebar */}
            <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-violet-900/20 to-purple-900/20 border-violet-800' 
                : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'
            }`}>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                  Want Something Similar?
                </span>
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Interested in a custom solution for your business?
              </p>
              <div className="space-y-4">
                <a
                  href="/#contact"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Start a Project
                </a>
                <a
                  href="/#projects"
                  className={`block w-full text-center px-6 py-3 border rounded-xl font-semibold transition-all duration-300 ${
                    isDarkMode 
                      ? 'border-violet-600 text-violet-400 hover:bg-violet-900/30' 
                      : 'border-violet-200 text-violet-700 hover:bg-violet-50'
                  }`}
                >
                  View More Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-700' 
              : 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200'
          }`}>
            <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full animate-pulse" />
            <span className={`font-medium ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>
              Ready to Build Together?
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </span>
          </h2>
          
          <p className={`text-xl mb-10 max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Whether you need a custom web application or have an innovative idea to bring to life, 
            I'm here to help you achieve your digital goals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:winnerbrown9@gmail.com"
              className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </a>
            <a
              href="/#projects"
              className={`group px-8 py-4 border rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 ${
                isDarkMode 
                  ? 'border-violet-600 text-violet-400 hover:bg-violet-900/30' 
                  : 'border-violet-200 text-violet-700 hover:bg-violet-50'
              }`}
            >
              <span>View Portfolio</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent mb-2">
                Winner OrluVictor
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Full-Stack Developer & Digital Creator
              </p>
            </div>
            
            <div className="flex gap-6">
              <a 
                href="https://x.com/buildwithwinner" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 ${
                  isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/winnerdebest" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 ${
                  isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/winner-orluvictor-944175333" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors hover:scale-110 ${
                  isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              © 2025 Winner OrluVictor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+2348142310497"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 shadow-green-500/30 animate-pulse"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default ProjectDetail;