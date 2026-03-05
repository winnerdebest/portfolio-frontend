"use client";

import React, { useState, useEffect } from 'react';
import {
  Menu, X, Github, Linkedin, Mail, MapPin, Phone,
  ArrowRight, Palette, Terminal, MessageSquare, Users
} from 'lucide-react';
import ClientProjectsSection from "@/components/ProjectsSection";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── Single marquee row ── */
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 32s linear infinite;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }
    .marquee-wrapper {
      overflow: hidden;
      width: 100%;
      position: relative;
    }
    .marquee-wrapper::before,
    .marquee-wrapper::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 140px;
      z-index: 2;
      pointer-events: none;
    }
    .marquee-wrapper::before {
      left: 0;
      background: linear-gradient(to right, #ffffff, transparent);
    }
    .marquee-wrapper::after {
      right: 0;
      background: linear-gradient(to left, #ffffff, transparent);
    }
    .marquee-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 32px;
      border: 1.5px solid #0D0D0D;
      border-radius: 100px;
      margin-right: 20px;
      white-space: nowrap;
      transition: all 0.2s ease;
      cursor: default;
      flex-shrink: 0;
    }
    .marquee-item:hover {
      background: #0D0D0D;
      color: #fff;
    }
    .marquee-item:hover i {
      filter: grayscale(100%) brightness(10) !important;
    }
    .marquee-item i {
      font-size: 30px;
      filter: grayscale(100%);
      transition: filter 0.2s ease;
      line-height: 1;
    }
    .marquee-item span {
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: inherit;
    }

    /* ── Hero image — IN FRONT of text ── */
    .hero-image {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 92vh;
      width: auto;
      max-width: 52vw;
      z-index: 10;
      object-fit: contain;
      object-position: bottom right;
      filter: drop-shadow(-12px 0px 40px rgba(0,0,0,0.10));
      background: transparent;
      mix-blend-mode: multiply;
      pointer-events: none;
    }
    @media (max-width: 1024px) {
      .hero-image { height: 70vh; max-width: 50vw; }
    }
    @media (max-width: 768px) {
      .hero-image {
        position: relative !important;
        width: 100% !important;
        height: 360px !important;
        max-width: 100% !important;
        object-fit: contain !important;
        object-position: bottom center !important;
        bottom: auto !important;
        right: auto !important;
        filter: none !important;
        mix-blend-mode: multiply !important;
        margin-top: -32px;
        z-index: 1 !important;
        pointer-events: auto;
      }
    }

    /* ── Typewriter fix ── */
    .typewriter-wrapper {
      min-width: 340px;
      width: fit-content;
      overflow: visible;
      display: block;
    }
    @media (max-width: 640px) {
      .typewriter-wrapper { min-width: 220px; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }
  `;
  if (!document.querySelector('style[data-animation="portfolio"]')) {
    style.setAttribute('data-animation', 'portfolio');
    document.head.appendChild(style);
  }
}

const TYPEWRITER_TEXTS = ['Full Stack Developer', 'Python Expert', 'Problem Solver'];

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

// Triple-duplicate for truly seamless infinite loop
const marqueeSkills = [...skills, ...skills, ...skills];

const experiences = [
  {
    company: 'Rivers State ICT Department',
    role: 'IT Support Specialist',
    duration: '1 year',
    current: false,
    description: [
      'Managed government IT infrastructure and systems',
      'Led system upgrades affecting 100+ users',
      'Provided technical training to staff members',
    ],
  },
  {
    company: 'Serverlink',
    role: 'Web Developer & IT Support',
    duration: '6 months',
    current: false,
    description: [
      'Developed scalable web applications using Django and React',
      'Implemented RESTful APIs serving 10k+ daily requests',
      'Provided technical support and system maintenance',
    ],
  },
  {
    company: 'Career On Track',
    role: 'Full Stack Developer',
    duration: 'Current',
    current: true,
    description: [
      'Built a full-featured job portal using Django REST framework and React',
      'Optimized application performance leading to 30% faster load times',
      'Integrated third-party services for payment and notifications',
    ],
  },
];

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 100 && r.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#444] overflow-x-hidden font-body">

      {/* ── Navbar ── */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E8E4]'
          : 'bg-white border-b border-[#E8E8E4]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black font-heading text-[#0D0D0D]">W.</span>
              <span className="text-xs sm:text-sm font-medium text-[#888]">@buildwithwinner</span>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(item => (
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`nav-link capitalize py-1 ${activeSection === item ? 'active' : ''}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => scrollToSection('contact')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1A1A2E] text-white font-medium text-sm transition-transform hover:scale-105">
                Hire Me
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#0D0D0D] hover:bg-[#F5F4F0] transition-colors"
                aria-label="Toggle menu">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E8E8E4] shadow-lg mobile-drawer">
            <div className="px-4 py-4 flex flex-col space-y-2">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(item => (
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`text-left capitalize px-4 py-3 rounded-md transition-colors text-base ${activeSection === item
                      ? 'bg-[#F5F4F0] text-[#1A1A2E] font-medium border-l-2 border-[#E8651A]'
                      : 'text-[#444] hover:bg-gray-50'
                    }`}>
                  {item}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-[#E8E8E4] px-4">
                <button onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center justify-center px-5 py-3 rounded-lg bg-[#1A1A2E] text-white font-medium">
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="hero dot-grid">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row items-center relative lg:min-h-screen px-4 sm:px-6 lg:px-8">

          {/* Text — z-index 2, image sits on top at z-index 10 */}
          <div className="w-full lg:w-[60%] space-y-4 lg:space-y-6 relative z-[2] pt-28 lg:pt-32 pb-4 lg:pb-32 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#0D0D0D] rounded-full shadow-sm mb-2 lg:mb-4">
              <div className="w-2 h-2 bg-[#E8651A] rounded-full animate-pulse" />
              <span className="text-xs font-code text-[#0D0D0D] tracking-widest uppercase font-semibold">
                Available for work
              </span>
            </div>

            <h1 className="font-heading font-black text-[#0D0D0D] tracking-tight leading-[0.85] uppercase w-full"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}>
              <span className="block">WINNER</span>
              <span className="block">ORLU</span>
              <span className="block">VICTOR</span>
            </h1>

            <div className="pt-4 lg:pt-6 space-y-4 lg:space-y-6 flex flex-col items-center lg:items-start w-full">
              <div className="typewriter-wrapper text-lg sm:text-xl lg:text-2xl font-body text-[#444] h-8 flex items-center justify-center lg:justify-start">
                <TypeWriter texts={TYPEWRITER_TEXTS} />
              </div>

              <p className="text-sm sm:text-base font-body text-[#666] max-w-sm leading-relaxed mx-auto lg:mx-0">
                Web developer who handles the technical side so clients can focus on what matters.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 lg:pt-4 justify-center lg:justify-start w-full">
                <button onClick={() => scrollToSection('projects')}
                  className="px-4 lg:px-5 py-2 lg:py-2.5 border border-[#0D0D0D] text-[#0D0D0D] bg-white text-xs sm:text-sm font-medium hover:bg-[#0D0D0D] hover:text-white transition-colors flex items-center gap-2">
                  See My Work <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollToSection('contact')}
                  className="px-4 lg:px-5 py-2 lg:py-2.5 border border-[#0D0D0D] text-[#0D0D0D] bg-white text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                  Let's Talk
                </button>
              </div>
            </div>
          </div>

          {/* Image — z-index 10, floats IN FRONT of text */}
          <div className="w-full lg:w-0 flex-grow flex justify-center lg:justify-end lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55%]">
            <img
              src="https://res.cloudinary.com/dvlfnmxxw/image/upload/e_background_removal,f_png/v1757463768/1749113539780_adejvm.jpg"
              alt="Winner OrluVictor"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="w-full relative z-[20] pt-12 lg:pt-20 pb-12 border-t border-[#E8E8E4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-center lg:justify-start items-center gap-6 sm:gap-12 lg:gap-16">
            {[
              { val: '5+', label: 'Years Experience' },
              { val: '10+', label: 'Clients' },
              { val: '5+', label: 'Projects' },
              { val: '95%', label: 'Client Satisfaction' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center">
                  <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0D0D0D]">{s.val}</span>
                  <span className="text-xs sm:text-sm text-[#888] font-body mt-1">{s.label}</span>
                </div>
                {i < arr.length - 1 && <div className="w-px h-10 bg-[#E8E8E4]" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="section-number">01</div>
          <div className="mb-12 md:mb-16 relative z-10 pt-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D]">About Me</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-2/5 space-y-8">
              <div className="border-l-4 border-[#E8651A] pl-6 py-2">
                <p className="font-heading italic text-2xl md:text-3xl text-[#0D0D0D] leading-tight">
                  "If it's complex, tedious, or critical — that's my lane."
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['#Backend', '#Python', '#React', '#DevOps'].map(tag => (
                  <span key={tag}
                    className="font-code text-sm px-4 py-2 border border-[#E8E8E4] rounded-full text-[#444] hover:border-[#E8651A] hover:text-[#E8651A] transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:w-3/5 space-y-12">
              <div className="space-y-6 text-lg text-[#444] leading-relaxed">
                <p>I build and maintain websites, manage servers, and make sure everything runs smoothly behind the scenes.</p>
                <p>It took years to build these skills with a fair share of mistakes along the way but trust me, those days are long gone 😄. Proficient in both frontend and backend technologies, you won't have to worry about a thing.</p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0D0D0D] mb-6">Core Philosophy</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: <Palette className="w-8 h-8" />, title: 'User First', desc: 'User experience drives technical decisions' },
                    { icon: <Terminal className="w-8 h-8" />, title: 'Growth', desc: 'Continuous learning and improvement' },
                    { icon: <Users className="w-8 h-8" />, title: 'Teamwork', desc: 'Collaboration creates better products' },
                  ].map(p => (
                    <div key={p.title}
                      className="bg-white p-6 border border-[#E8E8E4] rounded-xl card-shadow hover:border-t-4 hover:border-t-[#E8651A] transition-all group">
                      <div className="text-[#1A1A2E] mb-4 group-hover:text-[#E8651A] transition-colors">{p.icon}</div>
                      <h4 className="font-heading font-bold text-[#0D0D0D] mb-2">{p.title}</h4>
                      <p className="text-sm text-[#444]">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills — Single Marquee Row ── */}
      <section id="skills" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
          <span className="section-label">02 — EXPERTISE</span>
          {/* BIGGER heading */}
          <h2 className="font-heading font-black text-[#0D0D0D] leading-tight"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.03em' }}>
            Technologies I work with
          </h2>
        </div>

        {/* Single row marquee */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {marqueeSkills.map((skill, i) => (
              <div key={`s-${i}`} className="marquee-item">
                <i className={skill.iconClass} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <ClientProjectsSection endpoint="/projects/" />

      {/* ── Experience — Clean white, no dark background ── */}
      <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F4F0] relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="section-number">04</div>

          <div className="mb-12 md:mb-16 relative z-10 pt-4">
            <span className="section-label">04 — JOURNEY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0D0D0D] mb-4">
              Career Journey
            </h2>
            <p className="text-lg text-[#666]">Professional experience and growth in the tech industry</p>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 md:pl-14">
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] bg-[#E8E8E4]" />

            <div className="space-y-8 sm:space-y-10">
              {experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Dot */}
                  <div className={`absolute -left-[35px] md:-left-[43px] top-7 w-5 h-5 rounded-full bg-white border-2 z-10 transition-all duration-300 group-hover:scale-110 ${exp.current
                      ? 'border-[#E8651A] shadow-[0_0_0_4px_rgba(232,101,26,0.15)]'
                      : 'border-[#D0D0D0] group-hover:border-[#E8651A]'
                    }`}>
                    {exp.current && (
                      <span className="absolute inset-[3px] rounded-full bg-[#E8651A] animate-pulse" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl border border-[#E8E8E4] p-6 md:p-8 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-[#E8651A] hover:shadow-lg">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-code text-[#E8651A] tracking-widest uppercase mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8651A] inline-block animate-pulse" />
                            Current Role
                          </span>
                        )}
                        <h3 className="text-xl md:text-2xl font-bold font-heading text-[#0D0D0D]">{exp.company}</h3>
                        <p className="text-[#E8651A] font-medium text-sm mt-1 tracking-wide">{exp.role}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1.5 bg-[#F5F4F0] text-[#666] rounded-full text-xs font-code tracking-wide border border-[#E8E8E4] self-start">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-[#F0F0EC] mb-5" />

                    {/* Bullets */}
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#555] text-sm md:text-base leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E8651A] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
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
              {[
                { href: 'mailto:winnerbrown9@gmail.com', icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'winnerbrown9@gmail.com' },
                { href: 'tel:+2348142310497', icon: <Phone className="w-6 h-6" />, label: 'Phone', value: '+234 814 231 0497' },
              ].map(c => (
                <a key={c.label} href={c.href}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-[#E8E8E4] card-shadow hover:-translate-y-1 transition-transform group">
                  <div className="w-12 h-12 bg-[#F5F4F0] rounded-lg flex items-center justify-center group-hover:bg-[#E8651A] transition-colors text-[#1A1A2E] group-hover:text-white">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-sm text-[#444] mb-1">{c.label}</div>
                    <div className="font-medium text-[#0D0D0D]">{c.value}</div>
                  </div>
                </a>
              ))}
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
                  {[
                    { href: 'https://github.com/winnerdebest', icon: <Github className="w-6 h-6" /> },
                    { href: 'https://linkedin.com/in/winner-orluvictor-944175333', icon: <Linkedin className="w-6 h-6" /> },
                    {
                      href: 'https://x.com/buildwithwinner', icon: (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )
                    },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 bg-white border border-[#E8E8E4] rounded-lg flex items-center justify-center card-shadow hover:-translate-y-1 hover:border-[#E8651A] hover:text-[#E8651A] transition-all text-[#1A1A2E]">
                      {s.icon}
                    </a>
                  ))}
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
                <button type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#1A1A2E] text-white rounded-lg font-semibold hover:bg-[#E8651A] transition-colors card-shadow">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-[#E8E8E4] bg-white text-[#444] text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 @buildwithwinner. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/winnerdebest" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8651A] transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/winner-orluvictor-944175333" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8651A] transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="https://x.com/buildwithwinner" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8651A] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/+2348142310497" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1A1A2E] rounded-full flex items-center justify-center card-shadow hover:-translate-y-1 hover:bg-[#E8651A] transition-all duration-300">
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

// ── TypeWriter ──
const TypeWriter = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) setTimeout(() => setIsDeleting(true), 2000);
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
    <span style={{ whiteSpace: 'nowrap', display: 'inline-block', minWidth: '300px' }}>
      {currentText}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
};

export default Portfolio;