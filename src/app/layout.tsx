import type { Metadata } from "next";
import "./globals.css";
// Fonts will be loaded via Google Fonts <link> tags in the <head>

// SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://buildwithwinner.name.ng'),

  title: {
    default: 'Winner OrluVictor | Full Stack Developer & Python Expert',
    template: '%s | Winner OrluVictor'
  },

  description: 'Winner OrluVictor (@buildwithwinner) - Full Stack Developer specializing in Python, Django, React, and Next.js. Building scalable web applications and delivering exceptional digital experiences in Rivers State, Nigeria.',

  keywords: [
    'Winner OrluVictor',
    'buildwithwinner',
    'full stack developer',
    'python developer',
    'Django developer',
    'React developer',
    'Next.js developer',
    'web developer Nigeria',
    'Rivers State developer',
    'JavaScript developer',
    'TypeScript developer',
    'frontend developer',
    'backend developer',
    'IT support specialist',
    'Career On Track',
    'Serverlink developer',
    'job portal developer',
    'web application development',
    'REST API development',
    'database design',
    'UI/UX design',
    'DevOps',
    'Port Harcourt developer',
    'Nigerian tech talent'
  ],

  authors: [{ name: 'Winner OrluVictor', url: 'https://buildwithwinner.name.ng' }],
  creator: 'Winner OrluVictor',
  publisher: 'Winner OrluVictor',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildwithwinner.name.ng',
    siteName: 'Winner OrluVictor Portfolio',
    title: 'Winner OrluVictor | Full Stack Developer & Python Expert',
    description: 'Full Stack Developer specializing in Python, Django, React, and Next.js. Building scalable web applications and delivering exceptional digital experiences.',
    images: [
      {
        url: 'https://res.cloudinary.com/dvlfnmxxw/image/upload/v1757463768/1749113539780_adejvm.jpg',
        width: 1200,
        height: 630,
        alt: 'Winner OrluVictor - Full Stack Developer',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Winner OrluVictor | Full Stack Developer',
    description: 'Full Stack Developer specializing in Python, Django, React, and Next.js. Building scalable web applications in Nigeria.',
    creator: '@buildwithwinner',
    images: ['https://res.cloudinary.com/dvlfnmxxw/image/upload/v1757463768/1749113539780_adejvm.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'RA76_p9_RveWlebBRkmL6hjPT2nhW-vwgLP08cpb0-o',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />

        {/* Devicons CDN for skill icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Winner OrluVictor",
              "url": "https://buildwithwinner.name.ng",
              "image": "https://res.cloudinary.com/dvlfnmxxw/image/upload/v1757463768/1749113539780_adejvm.jpg",
              "sameAs": [
                "https://github.com/winnerdebest",
                "https://linkedin.com/in/winner-orluvictor-944175333",
                "https://x.com/buildwithwinner"
              ],
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Career On Track"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rivers State",
                "addressCountry": "Nigeria"
              },
              "email": "winnerbrown9@gmail.com",
              "telephone": "+2348142310497",
              "knowsAbout": [
                "Python",
                "Django",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Web Development",
                "Full Stack Development",
                "Database Design",
                "REST API"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Winner OrluVictor Portfolio",
              "url": "https://buildwithwinner.name.ng",
              "description": "Full Stack Developer Portfolio - Python, Django, React, Next.js",
              "author": {
                "@type": "Person",
                "name": "Winner OrluVictor"
              }
            })
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}