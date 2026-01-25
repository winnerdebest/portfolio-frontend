// src/app/projects/[slug]/ProjectDetail.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ExternalLink, Github, Globe, X, 
  Code, ChevronRight, ArrowUpRight,
  CheckCircle, Layers, Zap, Calendar,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ProjectDetailProps = {
  project: {
    id: number;
    name: string;
    description: string;
    short_description: string;
    project_link: string;
    technologies: string[];
    images: { id: number; image: string }[];
  };
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check initial dark mode
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
      }
    };
    
    checkDarkMode();
    
    // Listen for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkNow = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDarkNow);
        }
      });
    });
    
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true });
    }
    
    return () => observer.disconnect();
  }, []);

  // Apply dark mode class to html
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const nextImage = () => {
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const parseDescription = (description: string) => {
    const sections = description.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('## ')) {
        return (
          <h3 
            key={index} 
            className={`text-xl sm:text-2xl font-bold mb-4 mt-6 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {section.replace('## ', '')}
          </h3>
        );
      } else if (section.startsWith('### ')) {
        return (
          <h4 
            key={index} 
            className={`text-lg font-semibold mb-3 mt-4 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            {section.replace('### ', '')}
          </h4>
        );
      } else if (section.startsWith('- ') || section.startsWith('• ')) {
        const items = section.split('\n').filter(item => item.trim());
        return (
          <ul key={index} className="space-y-2 mb-4">
            {items.map((item, i) => (
              <li 
                key={i} 
                className={`flex items-start gap-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                {item.replace(/^[-•]\s*/, '')}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p 
            key={index} 
            className={`mb-4 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-slate-900 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    }`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isDarkMode
          ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/#projects')}
              className={`inline-flex items-center gap-2 group transition-all duration-300 text-sm sm:text-base ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </button>
            
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              @buildwithwinner
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 ${
              isDarkMode 
                ? 'bg-violet-900/30 text-violet-400 border border-violet-800/50' 
                : 'bg-violet-50 text-violet-700 border border-violet-200'
            }`}>
              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">
                Featured Project
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {project.name}
              </span>
            </h1>
            
            <p className={`text-lg sm:text-xl max-w-3xl leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {project.short_description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={project.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              <span>View Live Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            
            <button
              onClick={() => window.history.back()}
              className={`px-6 sm:px-8 py-3 border rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
                isDarkMode 
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Projects</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Image Display */}
        {project.images && project.images.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
              {!imageError[project.images[currentImageIndex]?.image] ? (
                <div className="relative aspect-video sm:aspect-[21/9]">
                  <img
                    src={project.images[currentImageIndex].image}
                    alt={`${project.name} - View ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                    onClick={() => setSelectedImage(project.images[currentImageIndex].image)}
                    onError={() => handleImageError(project.images[currentImageIndex].image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </div>
              ) : (
                <div className={`aspect-video sm:aspect-[21/9] flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="text-center">
                    <Globe className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">Image unavailable</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {project.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {project.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-violet-500 ring-2 ring-violet-500/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    {!imageError[img.image] ? (
                      <img
                        src={img.image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(img.image)}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <Globe className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <Code className="w-6 h-6 text-violet-500" />
                Project Overview
              </h2>
              
              <div className="space-y-4">
                {parseDescription(project.description)}
              </div>
            </div>

            {/* Technology Stack */}
            <div className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <Layers className="w-6 h-6 text-violet-500" />
                Technology Stack
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Project Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Live & Active</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Performance</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Optimized</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Recently</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Like what you see?
              </h3>
              
              <p className={`mb-6 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Let's discuss how we can build something amazing together.
              </p>
              
              <a
                href="/#contact"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 p-8 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-800/30 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Ready to build something amazing?
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Let's collaborate on your next project.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={project.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Project
              </a>
              
              <a
                href="/#contact"
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isDarkMode 
                    ? 'border border-gray-700 text-gray-300 hover:bg-gray-800' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 px-4 sm:px-6 lg:px-8 border-t ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                @buildwithwinner
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} @buildwithwinner. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-4 text-sm">
              <a href="/" className={isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}>
                Portfolio
              </a>
              <a href="/#contact" className={isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation in Modal */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                    setSelectedImage(project.images[currentImageIndex].image);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                    setSelectedImage(project.images[currentImageIndex].image);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-violet-700 text-white' 
            : 'bg-violet-600 text-white'
        }`}
      >
        <ArrowUpRight className="w-5 h-5 rotate-90" />
      </button>
    </div>
  );
}