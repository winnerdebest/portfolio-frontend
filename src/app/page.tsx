"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Github, Linkedin, Mail, MapPin, Phone,
  ArrowRight, Palette, Terminal, MessageSquare, Users
} from 'lucide-react';
import ClientProjectsSection from "@/components/ProjectsSection";
import TypeWriter from "@/components/TypeWriter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xxxxxxx';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'aBcDeFgHiJ123456';

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

const marqueeSkills = [...skills, ...skills, ...skills];

const experiences = [
  {
    company: 'Quickcarts',
    role: 'Founder & Lead Developer',
    duration: '2023 - Present',
    current: true,
  },
  {
    company: 'Rivers State ICT Department',
    role: 'IT Support Specialist',
    duration: '1 year',
    current: false,
  },
  {
    company: 'Serverlink',
    role: 'Web Developer & IT Support',
    duration: '6 months',
    current: false,
  },
  {
    company: 'Career On Track',
    role: 'Full Stack Developer',
    duration: 'Current',
    current: true,
  },
];

const Portfolio = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const pageRef = useScrollReveal();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('loading');
    setFormError('');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setFormStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setFormError('Failed to send. Please email me directly at winnerbrown9@gmail.com');
    }
  };

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="min-h-screen bg-[#050505] text-[#A1A1AA] overflow-x-hidden font-body">

      {/* Nav is rendered globally via layout.tsx — IslandNav component */}

      {/* ── Hero ── */}
      <section id="home" className="min-h-screen flex items-center dot-grid relative overflow-hidden">

        {/* Ambient orange glow — subtle background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10 flex flex-col items-center text-center">

          {/* ── Avatar ── */}
          <div className="mb-8">
            <div className="relative group cursor-default">
              {/* Spinning dashed ring */}
              <div className="absolute -inset-3 rounded-full border border-dashed border-[#FF6B00]/30 animate-spin" style={{ animationDuration: '12s' }} />
              {/* Outer glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#FF6B00]/50 to-[#FFB800]/20 blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              {/* Image circle */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#FF6B00]/40 shadow-2xl shadow-[#FF6B00]/10">
                <img
                  src="/winners image.jpeg"
                  alt="Winner OrluVictor"
                  className="w-full h-full object-cover object-top scale-110 transition-transform duration-700 group-hover:scale-115"
                  style={{ filter: 'grayscale(100%) contrast(1.15) brightness(0.85)' }}
                />
                {/* Orange tint on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* ── Status badge ── */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse shadow-lg shadow-[#FF6B00]/50" />
            <span className="text-xs font-code text-[#A1A1AA] tracking-widest uppercase font-semibold">
              Available for work
            </span>
          </div>

          {/* ── Heading ── */}
          <div className="space-y-3 mb-5">
            <h1 className="font-heading font-black text-white leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
              Hey, I&apos;m Winner OrluVictor.
            </h1>
            {/* Typewriter role */}
            <div className="text-lg sm:text-xl lg:text-2xl font-body text-[#FF6B00] font-medium flex items-center justify-center gap-2">
              <TypeWriter texts={TYPEWRITER_TEXTS} />
            </div>
          </div>

          {/* ── Tagline ── */}
          <p className="font-body text-[#71717A] text-base sm:text-lg max-w-lg leading-relaxed mb-10">
            Building scalable web apps and clean digital experiences.
            I handle the technical side so you can focus on what matters.
          </p>

          {/* ── CTAs ── */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-7 py-3 rounded-xl bg-[#FF6B00] text-white font-semibold text-sm hover:bg-[#FF8533] hover:shadow-xl hover:shadow-[#FF6B00]/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              See My Work <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3 rounded-xl border border-white/[0.12] text-[#A1A1AA] bg-white/[0.03] text-sm font-medium hover:bg-white/[0.07] hover:text-white hover:border-white/[0.22] transition-all backdrop-blur-sm"
            >
              Let&apos;s Talk
            </button>
          </div>

        </div>
      </section>




      {/* ── About ── */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="section-number">01</div>
          <div className="mb-12 md:mb-16 relative z-10 pt-4 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">About Me</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-2/5 space-y-8">
              <div className="border-l-4 border-[#FF6B00] pl-6 py-2 scroll-reveal delay-100">
                <p className="font-heading italic text-2xl md:text-3xl text-white leading-tight">
                  &quot;If it&apos;s complex, tedious, or critical — that&apos;s my lane.&quot;
                </p>
              </div>
              <div className="flex flex-wrap gap-3 scroll-reveal delay-200">
                {['#Backend', '#Python', '#React', '#DevOps'].map(tag => (
                  <span key={tag}
                    className="font-code text-sm px-4 py-2 border border-white/[0.08] rounded-full text-[#A1A1AA] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all cursor-default bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:w-3/5 space-y-12">
              <div className="space-y-6 text-lg text-[#A1A1AA] leading-relaxed scroll-reveal delay-200">
                <p>I build and maintain websites, manage servers, and make sure everything runs smoothly behind the scenes.</p>
                <p>It took years to build these skills with a fair share of mistakes along the way but trust me, those days are long gone 😄. Proficient in both frontend and backend technologies, you won&apos;t have to worry about a thing.</p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-6 scroll-reveal delay-300">Core Philosophy</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: <Palette className="w-8 h-8" />, title: 'User First', desc: 'User experience drives technical decisions', delay: 'delay-300' },
                    { icon: <Terminal className="w-8 h-8" />, title: 'Growth', desc: 'Continuous learning and improvement', delay: 'delay-400' },
                    { icon: <Users className="w-8 h-8" />, title: 'Teamwork', desc: 'Collaboration creates better products', delay: 'delay-500' },
                  ].map(p => (
                    <div key={p.title}
                      className={`bg-[#111113] p-6 border border-white/[0.06] rounded-xl card-shadow hover:border-[#FF6B00]/30 transition-all group glow-ring scroll-reveal ${p.delay}`}>
                      <div className="text-[#71717A] mb-4 group-hover:text-[#FF6B00] transition-colors">{p.icon}</div>
                      <h4 className="font-heading font-bold text-white mb-2">{p.title}</h4>
                      <p className="text-sm text-[#71717A]">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills — Single Marquee Row ── */}
      <section id="skills" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20 scroll-reveal">
          <span className="section-label">02 — EXPERTISE</span>
          <h2 className="font-heading font-black text-white leading-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.03em' }}>
            Technologies I work with
          </h2>
        </div>

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
      <ClientProjectsSection endpoint="/projects/" limit={4} />

      {/* ── Experience ── */}
      <section id="experience" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="section-number">04</div>

          <div className="mb-12 md:mb-16 relative z-10 pt-4 scroll-reveal">
            <span className="section-label">04 — JOURNEY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Career Journey
            </h2>
            <p className="text-lg text-[#71717A]">Professional experience and growth in the tech industry</p>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 md:pl-14">
            <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] bg-white/[0.06]" />

            <div className="space-y-8 sm:space-y-10">
              {experiences.map((exp, index) => (
                <div key={index} className={`relative group scroll-reveal ${['delay-0','delay-100','delay-200','delay-300'][index] ?? 'delay-300'}`}>
                  {/* Dot */}
                  <div className={`absolute -left-[35px] md:-left-[43px] top-7 w-5 h-5 rounded-full bg-[#050505] border-2 z-10 transition-all duration-300 group-hover:scale-110 ${exp.current
                    ? 'border-[#FF6B00] shadow-[0_0_0_4px_rgba(255,107,0,0.15)]'
                    : 'border-[#333] group-hover:border-[#FF6B00]'
                  }`}>
                    {exp.current && (
                      <span className="absolute inset-[3px] rounded-full bg-[#FF6B00] animate-pulse" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="bg-[#111113] rounded-2xl border border-white/[0.06] p-6 md:p-8 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/30 hover:shadow-lg glow-ring">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-code text-[#FF6B00] tracking-widest uppercase mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] inline-block animate-pulse" />
                            Current Role
                          </span>
                        )}
                        <h3 className="text-xl md:text-2xl font-bold font-heading text-white">{exp.company}</h3>
                        <p className="text-[#FF6B00] font-medium text-sm mt-1 tracking-wide">{exp.role}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/[0.03] text-[#71717A] rounded-full text-xs font-code tracking-wide border border-white/[0.06] self-start">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF6B00]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div className="section-number" style={{ color: 'rgba(255,255,255,0.02)' }}>05</div>
          <div className="mb-12 md:mb-16 relative z-10 pt-4 text-center scroll-reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Got a project? Let&apos;s build something.
            </h2>
            <p className="text-lg text-[#71717A] max-w-2xl mx-auto">
              Based in Rivers State, Nigeria — working with clients globally
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-1/3 space-y-6 scroll-reveal delay-100">
              {[
                { href: 'mailto:winnerbrown9@gmail.com', icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'winnerbrown9@gmail.com' },
                { href: 'tel:+2348142310497', icon: <Phone className="w-6 h-6" />, label: 'Phone', value: '+234 814 231 0497' },
              ].map(c => (
                <a key={c.label} href={c.href}
                  className="flex items-center gap-4 bg-[#111113] p-5 rounded-xl border border-white/[0.06] card-shadow hover:-translate-y-1 transition-all group glow-ring">
                  <div className="w-12 h-12 bg-white/[0.03] rounded-lg flex items-center justify-center group-hover:bg-[#FF6B00] transition-colors text-[#71717A] group-hover:text-white">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-sm text-[#71717A] mb-1">{c.label}</div>
                    <div className="font-medium text-white">{c.value}</div>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-4 bg-[#111113] p-5 rounded-xl border border-white/[0.06] card-shadow">
                <div className="w-12 h-12 bg-white/[0.03] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#71717A]" />
                </div>
                <div>
                  <div className="text-sm text-[#71717A] mb-1">Location</div>
                  <div className="font-medium text-white">Rivers State, Nigeria</div>
                </div>
              </div>
              <div className="pt-6">
                <h4 className="font-heading font-bold text-lg text-white mb-4">Connect with me</h4>
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
                      className="w-12 h-12 bg-[#111113] border border-white/[0.06] rounded-lg flex items-center justify-center card-shadow hover:-translate-y-1 hover:border-[#FF6B00]/50 hover:text-[#FF6B00] transition-all text-[#71717A] glow-ring">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 scroll-reveal delay-200">
              <form ref={formRef} onSubmit={handleContactSubmit} className="bg-[#111113] p-6 md:p-8 rounded-xl border border-white/[0.06] card-shadow space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="floating-label-group">
                    <input type="text" id="name" name="from_name" placeholder=" " required />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="floating-label-group">
                    <input type="email" id="email" name="from_email" placeholder=" " required />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="floating-label-group">
                  <input type="text" id="subject" name="subject" placeholder=" " required />
                  <label htmlFor="subject">Subject</label>
                </div>
                <div className="floating-label-group">
                  <textarea id="message" name="message" rows={5} placeholder=" " required></textarea>
                  <label htmlFor="message">Project details...</label>
                </div>

                {formStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <span className="text-emerald-400 text-lg">✅</span>
                    <div>
                      <p className="text-emerald-400 font-semibold text-sm">Message sent!</p>
                      <p className="text-emerald-400/70 text-xs mt-0.5">I&apos;ll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-red-400 text-lg">❌</span>
                    <p className="text-red-400 text-sm">{formError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full sm:w-auto px-8 py-4 bg-[#FF6B00] text-white rounded-lg font-semibold hover:bg-[#FF8533] transition-all card-shadow hover:shadow-lg hover:shadow-[#FF6B00]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : formStatus === 'success' ? '✅ Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050505] text-[#71717A] text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 @buildwithwinner. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/winnerdebest" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/winner-orluvictor-944175333" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="https://x.com/buildwithwinner" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/+2348142310497" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FF6B00] rounded-full flex items-center justify-center shadow-lg shadow-[#FF6B00]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF6B00]/40 transition-all duration-300">
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default Portfolio;