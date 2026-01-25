"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Github, Linkedin, Mail, MapPin, Phone, ChevronDown, 
  ArrowRight, Code, Database, Palette, Terminal, Cpu, Server,
  MessageSquare, Sparkles, Download,
  Calendar, Users, CheckCircle, Star
} from 'lucide-react';
import ClientProjectsSection from "@/components/ProjectsSection";



// Add custom CSS for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `;
  if (!document.querySelector('style[data-animation="float"]')) {
    style.setAttribute('data-animation', 'float');
    document.head.appendChild(style);
  }
}

// Type definitions
interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number;
  description: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const TYPEWRITER_TEXTS = ['Full-Stack Developer', 'Python Expert', 'Django Specialist', 'Problem Solver'];
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills: Skill[] = [
    { name: 'Python/Django', icon: <Terminal className="w-7 h-7" />, color: 'from-emerald-500 to-green-400', level: 95, description: 'Backend Development' },
    { name: 'JavaScript/TS', icon: <Code className="w-7 h-7" />, color: 'from-amber-500 to-yellow-400', level: 90, description: 'Frontend Logic' },
    { name: 'React/Next.js', icon: <Cpu className="w-7 h-7" />, color: 'from-sky-500 to-blue-400', level: 88, description: 'Modern Frameworks' },
    { name: 'Database', icon: <Database className="w-7 h-7" />, color: 'from-violet-500 to-purple-400', level: 85, description: 'SQL & NoSQL' },
    { name: 'UI/UX Design', icon: <Palette className="w-7 h-7" />, color: 'from-rose-500 to-pink-400', level: 82, description: 'Design Systems' },
    { name: 'DevOps', icon: <Server className="w-7 h-7" />, color: 'from-cyan-500 to-teal-400', level: 78, description: 'Deployment & CI/CD' },
  ];

  

  const experiences = [
    {
      company: 'Rivers State ICT Department',
      role: 'IT Support Specialist',
      duration: '1 year',
      description: [
        'Managed government IT infrastructure and systems',
        'Led system upgrades affecting 100+ users',
        'Provided technical training to staff members'
      ],
      color: 'from-blue-500 to-cyan-400'
    },
    {
      company: 'Serverlink',
      role: 'Web Developer & IT Support',
      duration: '6 months',
      description: [
        'Developed scalable web applications using Django and React',
        'Implemented RESTful APIs serving 10k+ daily requests',
        'Provided technical support and system maintenance'
      ],
      color: 'from-violet-500 to-purple-400'
    },
    {
      company: 'Career On Track',
      role: 'Full Stack Developer',
      duration: 'Current',
      description: [
        'Built a full-featured job portal using Django rest framework and React',
        'Optimized application performance leading to 30% faster load times',
        'Integrated third-party services for payment and notifications'
      ],
      color: 'from-yellow-500 to-cyan-400'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    } overflow-x-hidden`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? isDarkMode
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-800' 
            : 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              @buildwithwinner
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all relative ${
                    activeSection === item 
                      ? 'text-violet-600 font-semibold' 
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" />
                  )}
                </button>
              ))}
              
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
              
              <a 
                href="/resume.pdf" 
                download
                className="px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full hover:shadow-lg hover:shadow-violet-500/50 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
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
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left capitalize px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item
                      ? 'bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-600 font-semibold'
                      : isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
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
              
              <a 
                href="/resume.pdf" 
                download
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative pt-20 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-50 transition-colors duration-500 ${
            isDarkMode ? 'bg-violet-900' : 'bg-violet-100'
          }`} />
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-50 transition-colors duration-500 ${
            isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
          }`} />
          {isDarkMode && (
            <>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 relative z-10">
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-700' 
                  : 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200'
              }`}>
                <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full animate-pulse" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>
                  Available for opportunities
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className={`block transition-colors duration-300 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Hi, I'm
                </span>
                <span className="block bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent mt-2">
                  Winner OrluVictor
                </span>
              </h1>

              <div className={`text-xl sm:text-2xl h-12 flex items-center transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <TypeWriter texts={TYPEWRITER_TEXTS} />
                </div>

              <p className={`text-lg leading-relaxed max-w-xl transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                I craft beautiful, functional web applications with modern technologies. 
                Passionate about creating digital experiences that make a difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-4 border-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isDarkMode 
                      ? 'border-violet-600 text-violet-400 hover:bg-violet-900/30' 
                      : 'border-violet-200 text-violet-700 hover:bg-violet-50'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Get In Touch</span>
                </button>
              </div>

              <div className="flex items-center gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-violet-500" />
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Experience</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>5+ Years</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-violet-500" />
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Clients</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>10+</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-violet-500" />
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Projects</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>5+</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="relative lg:flex justify-center items-center">
              <div className="relative mx-auto lg:mx-0">
                {/* Decorative circles */}
                <div className={`absolute -top-6 -left-6 w-48 h-48 rounded-full blur-xl opacity-60 transition-colors duration-500 ${
                  isDarkMode ? 'bg-gradient-to-br from-violet-800 to-purple-800' : 'bg-gradient-to-br from-violet-200 to-purple-200'
                }`} />
                <div className={`absolute -bottom-6 -right-6 w-48 h-48 rounded-full blur-xl opacity-60 transition-colors duration-500 ${
                  isDarkMode ? 'bg-gradient-to-br from-purple-800 to-pink-800' : 'bg-gradient-to-br from-purple-200 to-pink-200'
                }`} />
                
                {/* Profile image container */}
                <div className="relative z-10">
                  <div className={`relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 transition-all duration-500 ${
                    isDarkMode ? 'ring-violet-900/50' : 'ring-violet-100/50'
                  }`}>
                    <img 
                      src="https://res.cloudinary.com/dvlfnmxxw/image/upload/v1757463768/1749113539780_adejvm.jpg"
                      alt="Winner OrluVictor"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 transition-colors duration-500 ${
                      isDarkMode ? 'bg-gradient-to-t from-black/30 to-transparent' : 'bg-gradient-to-t from-black/10 to-transparent'
                    }`} />
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-400 text-white px-4 py-2 rounded-full shadow-lg animate-float">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-semibold">Python Developer</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-violet-500 to-purple-400 text-white px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-semibold">Full-Stack Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce mt-12"
          >
            <ChevronDown className="w-8 h-8 text-violet-500" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-gradient-to-b from-gray-900 to-slate-900' : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate developer with expertise in modern web technologies and a focus on creating impactful digital solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I'm a dedicated full-stack developer specializing in Python, Django, and modern JavaScript frameworks. 
                  My journey in tech started with a curiosity for building things, which evolved into a passion for creating 
                  elegant solutions to complex problems.
                </p>
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  What drives me is the opportunity to bridge the gap between technical excellence and user experience. 
                  I believe that great software should not only work perfectly but also delight users and solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
                <div className={`p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="text-3xl font-bold text-violet-600 mb-2">12+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects Delivered</div>
                </div>
                <div className={`p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="text-3xl font-bold text-violet-600 mb-2">1+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Experience</div>
                </div>
                <div className={`p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="text-3xl font-bold text-violet-600 mb-2">100%</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-800' 
                  : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>My Philosophy</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>User experience drives technical decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Continuous learning and improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Collaboration creates better products</span>
                  </li>
                </ul>
              </div>

              <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-800' 
                  : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Currently Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'Docker', 'GraphQL', 'Machine Learning'].map((tech) => (
                    <span 
                      key={tech} 
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-800/80 text-blue-400' : 'bg-white/80 text-blue-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                My Expertise
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-b from-gray-800 to-slate-800 border-gray-700 hover:border-violet-700 hover:shadow-xl hover:shadow-violet-900/30' 
                    : 'bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-violet-300 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <div className="text-2xl font-bold text-violet-600">{skill.level}%</div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{skill.name}</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.description}</p>
                <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
       <ClientProjectsSection endpoint="/projects/" isDarkMode={isDarkMode} />

      {/* Experience Section */}
      <section id="experience" className={`py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My professional experience and growth in the tech industry
            </p>
          </div>

          <div className="space-y-8 relative">
            {/* Timeline line */}
            <div className={`absolute left-8 top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2 transition-colors duration-500 ${
              isDarkMode ? 'bg-gradient-to-b from-violet-800 to-purple-800' : 'bg-gradient-to-b from-violet-200 to-purple-200'
            }`} />

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full border-4 shadow-lg md:left-1/2 md:-translate-x-1/2 transition-colors duration-500 ${
                  isDarkMode ? 'border-gray-900' : 'border-white'
                }`} />

                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12">
                  <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isDarkMode 
                      ? `bg-gradient-to-br ${exp.color.replace('from-', 'from-').replace('to-', 'to-')}/20 border-gray-700` 
                      : `bg-gradient-to-br ${exp.color.replace('from-', 'from-').replace('to-', 'to-')}/10 border-gray-200`
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{exp.company}</h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                          {exp.role}
                        </p>
                      </div>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-100'
                      }`}>
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className={`flex items-start gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-gradient-to-b from-slate-900 to-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Get in touch</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about tech.
                </p>
              </div>

              <div className="space-y-4">
                <a href="mailto:winnerbrown9@gmail.com" className={`flex items-center gap-4 p-4 rounded-xl border transition-all group hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-violet-700 hover:shadow-lg hover:shadow-violet-900/30' 
                    : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-lg'
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Email</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>winnerbrown9@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+2348142310497" className={`flex items-center gap-4 p-4 rounded-xl border transition-all group hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-violet-700 hover:shadow-lg hover:shadow-violet-900/30' 
                    : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-lg'
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Phone</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>+234 814 231 0497</div>
                  </div>
                </a>

                <div className={`flex items-center gap-4 p-4 rounded-xl border ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Location</div>
                    <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Rivers State, Nigeria</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Connect with me</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/winnerdebest" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
                    isDarkMode ? 'bg-gray-800 hover:bg-violet-900/50 text-gray-300' : 'bg-gray-100 hover:bg-violet-100 text-gray-700'
                  }`}>
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/winner-orluvictor-944175333" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
                    isDarkMode ? 'bg-gray-800 hover:bg-blue-900/50' : 'bg-gray-100 hover:bg-blue-100'
                  }`}>
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </a>
                  <a href="https://x.com/buildwithwinner" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-black/10 text-gray-900'
                  }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-violet-600' 
                        : 'bg-white border-gray-300 focus:border-violet-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-violet-600' 
                        : 'bg-white border-gray-300 focus:border-violet-500'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject</label>
                <input
                  type="text"
                  placeholder="Project inquiry"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-violet-600' 
                      : 'bg-white border-gray-300 focus:border-violet-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all resize-none ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-violet-600' 
                      : 'bg-white border-gray-300 focus:border-violet-500'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-violet-500/50 hover:scale-[1.02] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
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
                @buildwithwinner
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>© 2025 @buildwithwinner. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6 text-sm">
              <button className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}`}>Privacy Policy</button>
              <button className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}`}>Terms of Service</button>
              <a href="#home" className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}`} onClick={() => scrollToSection('home')}>
                Back to Top
              </a>
            </div>
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

// TypeWriter Component
const TypeWriter = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Portfolio;