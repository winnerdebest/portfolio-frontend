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
    
    /* Mobile-specific improvements */
    @media (max-width: 640px) {
      .mobile-text-lg {
        font-size: 1.125rem;
      }
      .mobile-p-4 {
        padding: 1rem;
      }
      .mobile-gap-4 {
        gap: 1rem;
      }
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

const TYPEWRITER_TEXTS = ['Web Developer', 'Python Developer', 'Fun Dev', '🤷‍♀️'];

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

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

  const skills = [
    { name: 'Python', iconClass: 'devicon-python-plain colored' },
    { name: 'Django', iconClass: 'devicon-django-plain' },
    { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
    { name: 'TypeScript', iconClass: 'devicon-typescript-plain colored' },
    { name: 'React', iconClass: 'devicon-react-original colored' },
    { name: 'Next.js', iconClass: 'devicon-nextjs-plain' },
    { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain colored' },
    { name: 'MongoDB', iconClass: 'devicon-mongodb-plain colored' },
    { name: 'Figma', iconClass: 'devicon-figma-plain colored' },
    { name: 'Docker', iconClass: 'devicon-docker-plain colored' },
    { name: 'Git', iconClass: 'devicon-git-plain colored' },
    { name: 'Linux', iconClass: 'devicon-linux-plain' },
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
    <div className="min-h-screen bg-white text-[#444] overflow-x-hidden font-body">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E8E4]'
        : 'bg-white border-b border-[#E8E8E4]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black font-heading text-[#0D0D0D]">W.</span>
              <span className="text-xs sm:text-sm font-medium text-[#888]">@buildwithwinner</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`nav-link capitalize py-1 ${activeSection === item ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right side CTA / Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1A1A2E] text-white font-medium text-sm transition-transform hover:scale-105"
              >
                Hire Me
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#0D0D0D] hover:bg-[#F5F4F0] transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E8E8E4] shadow-lg mobile-drawer">
            <div className="px-4 py-4 flex flex-col space-y-2">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-left capitalize px-4 py-3 rounded-md transition-colors text-base ${activeSection === item
                    ? 'bg-[#F5F4F0] text-[#1A1A2E] font-medium border-l-2 border-[#E8651A]'
                    : 'text-[#444] hover:bg-gray-50'
                    }`}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-[#E8E8E4] px-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center justify-center px-5 py-3 rounded-lg bg-[#1A1A2E] text-white font-medium"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex flex-col relative pt-24 px-4 sm:px-6 lg:px-8 dot-grid pb-12">
        <div className="flex-grow flex items-center max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full min-h-[80vh]">
            {/* Left Column - Content */}
            <div className="w-full lg:w-3/5 space-y-4 relative z-10 order-2 lg:order-1 pt-8 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E8E8E4] rounded-full shadow-sm mb-4">
                <div className="w-2 h-2 bg-[#E8651A] rounded-full animate-pulse" />
                <span className="text-xs font-code text-[#888] tracking-widest uppercase">
                  Available for work
                </span>
              </div>

              <h1 className="font-heading font-black text-[#0D0D0D] tracking-[[-0.04em]] leading-[0.85] uppercase" style={{ fontSize: 'clamp(4rem, 11vw, 10rem)' }}>
                <span className="block">WINNER</span>
                <span className="block">ORLU</span>
                <span className="block">VICTOR</span>
              </h1>

              <div className="pt-6 space-y-6">
                <div className="text-xl sm:text-2xl font-body text-[#444]">
                  Full Stack Developer
                </div>

                <p className="text-sm sm:text-base font-body text-[#666] max-w-sm leading-relaxed">
                  Web developer who handles the technical side so clients can focus on what matters.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-4 py-2 border border-[#0D0D0D] text-[#0D0D0D] bg-white text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    See My Work
                    <ArrowRight className="w-4 h-4 translate-y-[1px]" />
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-4 py-2 border border-[#0D0D0D] text-[#0D0D0D] bg-white text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    Let's Talk
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end items-end order-1 lg:order-2 h-full self-end pt-12 lg:pt-0 pb-16">
              <div className="relative w-full max-w-[500px] flex justify-end translate-x-4 lg:translate-x-12">
                <img
                  src="https://res.cloudinary.com/dvlfnmxxw/image/upload/v1757463768/1749113539780_adejvm.jpg"
                  alt="Winner OrluVictor"
                  className="w-[110%] max-w-none h-auto object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full relative z-10 pt-12 lg:pt-20 pb-0 border-t border-[#E8E8E4] mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-row justify-center lg:justify-start items-center gap-6 sm:gap-12 lg:gap-16">
              <div className="flex flex-col items-center lg:items-center">
                <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D]">5+</span>
                <span className="text-xs sm:text-sm text-[#888] font-body mt-1">Years Experience</span>
              </div>
              <div className="w-px h-10 bg-[#E8E8E4]" />
              <div className="flex flex-col items-center lg:items-center">
                <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D]">10+</span>
                <span className="text-xs sm:text-sm text-[#888] font-body mt-1">Clients</span>
              </div>
              <div className="w-px h-10 bg-[#E8E8E4]" />
              <div className="flex flex-col items-center lg:items-center">
                <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D]">5+</span>
                <span className="text-xs sm:text-sm text-[#888] font-body mt-1">Projects</span>
              </div>
              <div className="w-px h-10 bg-[#E8E8E4]" />
              <div className="flex flex-col items-center lg:items-center">
                <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D]">95%</span>
                <span className="text-xs sm:text-sm text-[#888] font-body mt-1">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="section-number">01</div>

          <div className="mb-12 md:mb-16 relative z-10 pt-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D]">
              About Me
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Column - Quote & Tags */}
            <div className="lg:w-2/5 space-y-8">
              <div className="border-l-4 border-[#E8651A] pl-6 py-2">
                <p className="font-heading italic text-2xl md:text-3xl text-[#0D0D0D] leading-tight">
                  "If it's complex, tedious, or critical — that's my lane."
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {['#Backend', '#Python', '#React', '#DevOps'].map((tag) => (
                  <span
                    key={tag}
                    className="font-code text-sm px-4 py-2 border border-[#E8E8E4] rounded-full text-[#444] hover:border-[#E8651A] hover:text-[#E8651A] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Paragraph & Philosophy */}
            <div className="lg:w-3/5 space-y-12">
              <div className="space-y-6 text-lg text-[#444] leading-relaxed">
                <p>
                  I build and maintain websites, manage servers, and make sure everything runs smoothly behind the scenes.
                </p>
                <p>
                  It took years to build these skills with a fair share of mistakes along the way but trust me, those days are long gone 😄.
                  Proficient in both frontend and backend technologies, you won’t have to worry about a thing.
                  Take a look at some of my projects and see if my style fits what you’re looking for.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-[#0D0D0D] mb-6">Core Philosophy</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Philosophy Card 1 */}
                  <div className="bg-white p-6 border border-[#E8E8E4] rounded-xl card-shadow hover:border-t-4 hover:border-t-[#E8651A] transition-all group">
                    <Palette className="w-8 h-8 text-[#1A1A2E] mb-4 group-hover:text-[#E8651A] transition-colors" />
                    <h4 className="font-heading font-bold text-[#0D0D0D] mb-2">User First</h4>
                    <p className="text-sm text-[#444]">User experience drives technical decisions</p>
                  </div>
                  {/* Philosophy Card 2 */}
                  <div className="bg-white p-6 border border-[#E8E8E4] rounded-xl card-shadow hover:border-t-4 hover:border-t-[#E8651A] transition-all group">
                    <Terminal className="w-8 h-8 text-[#1A1A2E] mb-4 group-hover:text-[#E8651A] transition-colors" />
                    <h4 className="font-heading font-bold text-[#0D0D0D] mb-2">Growth</h4>
                    <p className="text-sm text-[#444]">Continuous learning and improvement</p>
                  </div>
                  {/* Philosophy Card 3 */}
                  <div className="bg-white p-6 border border-[#E8E8E4] rounded-xl card-shadow hover:border-t-4 hover:border-t-[#E8651A] transition-all group">
                    <Users className="w-8 h-8 text-[#1A1A2E] mb-4 group-hover:text-[#E8651A] transition-colors" />
                    <h4 className="font-heading font-bold text-[#0D0D0D] mb-2">Teamwork</h4>
                    <p className="text-sm text-[#444]">Collaboration creates better products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F4F0] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="section-number" style={{ color: 'rgba(0,0,0,0.04)' }}>02</div>

          <div className="mb-12 md:mb-16 relative z-10 pt-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D] mb-4">
              Expertise
            </h2>
            <p className="text-lg text-[#444] max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white p-6 md:p-8 border border-[#E8E8E4] rounded-xl card-shadow flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 card-shadow-hover hover:border-[#E8651A]"
              >
                <i className={`${skill.iconClass} text-5xl md:text-6xl mb-4 transition-transform group-hover:scale-110`}></i>
                <h3 className="font-body font-medium text-[#0D0D0D]">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ClientProjectsSection endpoint="/projects/" />

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="section-number">04</div>

          <div className="mb-12 md:mb-16 relative z-10 pt-4 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D] mb-4">
              Journey
            </h2>
            <p className="text-lg text-[#444]">
              Professional experience and growth in the tech industry
            </p>
          </div>

          <div className="relative pl-8 md:pl-12">
            {/* Timeline line */}
            <div className="absolute left-[11px] md:left-[15px] top-6 bottom-6 w-[2px] bg-[#E8E8E4]" />

            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => {
                const isCurrent = exp.duration.toLowerCase() === 'current';
                return (
                  <div key={index} className="relative group">
                    {/* Timeline dot */}
                    <div className={`absolute -left-[35px] md:-left-[39px] top-6 w-4 h-4 rounded-full bg-white border-4 border-[#E8651A] z-10 transition-transform group-hover:scale-125 ${isCurrent ? 'pulse-amber' : ''}`} />

                    <div className="bg-white p-6 md:p-8 rounded-xl border border-[#E8E8E4] card-shadow transition-all duration-300 hover:border-[#E8651A] hover:-translate-y-1 card-shadow-hover ml-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold font-heading text-[#0D0D0D] mb-1">{exp.company}</h3>
                          <p className="text-[#E8651A] font-medium font-body">{exp.role}</p>
                        </div>
                        <span className="inline-block px-3 py-1 bg-[#F5F4F0] text-[#444] rounded-full text-sm font-code">
                          {isCurrent && <span className="inline-block w-2 h-2 rounded-full bg-[#E8651A] mr-2 animate-pulse" />}{exp.duration}
                        </span>
                      </div>

                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start text-[#444] text-sm md:text-base leading-relaxed">
                            <span className="mr-3 text-[#E8651A] font-bold mt-[-2px]">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F4F0] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="section-number" style={{ color: 'rgba(0,0,0,0.04)' }}>05</div>

          <div className="mb-12 md:mb-16 relative z-10 pt-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D] mb-4">
              Got a project? Let's build something.
            </h2>
            <p className="text-lg text-[#444] max-w-2xl mx-auto">
              Based in Rivers State, Nigeria — working with clients globally
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-1/3 space-y-6">
              <a href="mailto:winnerbrown9@gmail.com" className="flex items-center gap-4 bg-white p-5 rounded-xl border border-[#E8E8E4] card-shadow hover:-translate-y-1 transition-transform group">
                <div className="w-12 h-12 bg-[#F5F4F0] rounded-lg flex items-center justify-center group-hover:bg-[#E8651A] transition-colors">
                  <Mail className="w-6 h-6 text-[#1A1A2E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-[#444] mb-1">Email</div>
                  <div className="font-medium text-[#0D0D0D]">winnerbrown9@gmail.com</div>
                </div>
              </a>

              <a href="tel:+2348142310497" className="flex items-center gap-4 bg-white p-5 rounded-xl border border-[#E8E8E4] card-shadow hover:-translate-y-1 transition-transform group">
                <div className="w-12 h-12 bg-[#F5F4F0] rounded-lg flex items-center justify-center group-hover:bg-[#E8651A] transition-colors">
                  <Phone className="w-6 h-6 text-[#1A1A2E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-[#444] mb-1">Phone</div>
                  <div className="font-medium text-[#0D0D0D]">+234 814 231 0497</div>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-[#E8E8E4] card-shadow">
                <div className="w-12 h-12 bg-[#F5F4F0] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#1A1A2E]" />
                </div>
                <div>
                  <div className="text-sm text-[#444] mb-1">Location</div>
                  <div className="font-medium text-[#0D0D0D]">Rivers State, Nigeria</div>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="font-heading font-bold text-lg text-[#0D0D0D] mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/winnerdebest" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white border border-[#E8E8E4] rounded-lg flex items-center justify-center card-shadow hover:-translate-y-1 hover:border-[#E8651A] hover:text-[#E8651A] transition-all text-[#1A1A2E]">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/winner-orluvictor-944175333" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white border border-[#E8E8E4] rounded-lg flex items-center justify-center card-shadow hover:-translate-y-1 hover:border-[#E8651A] hover:text-[#E8651A] transition-all text-[#1A1A2E]">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://x.com/buildwithwinner" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white border border-[#E8E8E4] rounded-lg flex items-center justify-center card-shadow hover:-translate-y-1 hover:border-[#E8651A] hover:text-[#E8651A] transition-all text-[#1A1A2E]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <form className="bg-white p-6 md:p-8 rounded-xl border border-[#E8E8E4] card-shadow space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="floating-label-group">
                    <input type="text" id="name" placeholder=" " required />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="floating-label-group">
                    <input type="email" id="email" placeholder=" " required />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="floating-label-group">
                  <input type="text" id="subject" placeholder=" " required />
                  <label htmlFor="subject">Subject</label>
                </div>
                <div className="floating-label-group">
                  <textarea id="message" rows={5} placeholder=" " required></textarea>
                  <label htmlFor="message">Project details...</label>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#1A1A2E] text-white rounded-lg font-semibold hover:bg-[#E8651A] transition-colors card-shadow"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-[#E8E8E4] bg-white text-[#444] text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 @buildwithwinner. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/winnerdebest" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8651A] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/winner-orluvictor-944175333" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8651A] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/buildwithwinner" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8651A] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+2348142310497"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 w-14 h-14 bg-[#1A1A2E] right-6 z-50 rounded-full flex items-center justify-center card-shadow hover:-translate-y-1 hover:bg-[#E8651A] transition-all duration-300"
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