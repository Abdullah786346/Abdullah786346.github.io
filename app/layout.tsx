import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://abdullahsajid.me";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdullah Sajid | Full-Stack Web Developer & Software Engineer | Muhammad Abdullah",
    template: "%s | Abdullah Sajid",
  },
  description:
    "Muhammad Abdullah (Abdullah Sajid) - Experienced Full-Stack Web Developer, Next.js Specialist, and UI/UX Designer based in Pakistan. Expert in React, Next.js, Node.js, TypeScript, Tailwind CSS, Redis, and Docker.",
  keywords: [
    "Abdullah Sajid",
    "Muhammad Abdullah",
    "Abdullah Sajid Portfolio",
    "Muhammad Abdullah Developer",
    "abdullahsajid.me",
    "Full-Stack Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Software Engineer Pakistan",
    "React Developer",
    "Node.js Developer",
    "UI UX Designer",
    "Web Developer Rawalpindi",
    "PMAS Arid Computer Science",
    "TypeScript Developer",
    "Tailwind CSS Specialist",
  ],
  authors: [{ name: "Muhammad Abdullah (Abdullah Sajid)", url: siteUrl }],
  creator: "Muhammad Abdullah (Abdullah Sajid)",
  publisher: "Abdullah Sajid",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Abdullah Sajid | Full-Stack Web Developer & Software Engineer",
    description:
      "Official portfolio of Muhammad Abdullah (Abdullah Sajid). Discover full-stack web applications, frontend architectures, Next.js projects, and engineering experience.",
    siteName: "Abdullah Sajid Portfolio",
    images: [
      {
        url: `${siteUrl}/assets/goodimage.png`,
        width: 800,
        height: 800,
        alt: "Muhammad Abdullah - Abdullah Sajid Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Sajid | Full-Stack Web Developer & Software Engineer",
    description:
      "Official portfolio of Muhammad Abdullah (Abdullah Sajid) - Next.js Specialist, React Developer, and Full-Stack Engineer.",
    images: [`${siteUrl}/assets/goodimage.png`],
    creator: "@AbdullahSajid",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Abdullah",
  alternateName: ["Abdullah Sajid", "AbdullahSajid"],
  url: siteUrl,
  image: `${siteUrl}/assets/goodimage.png`,
  jobTitle: "Full-Stack Web Developer & Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance & Software Consulting",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "PMAS-Arid Agriculture University, Rawalpindi",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rawalpindi",
    addressCountry: "Pakistan",
  },
  sameAs: [
    "https://www.linkedin.com/in/muhammad-abdullah-7572762b9",
    "https://github.com/Abdullah786346",
    "https://abdullahsajid.me",
  ],
  knowsAbout: [
    "Web Development",
    "Full-Stack Web Development",
    "Next.js",
    "React.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "UI/UX Design",
    "Redis",
    "Docker",
    "REST APIs",
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Abdullah Sajid Portfolio",
  alternateName: "Muhammad Abdullah Portfolio",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Muhammad Abdullah (Abdullah Sajid)",
  },
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Abdullah Sajid (Muhammad Abdullah)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Muhammad Abdullah (popularly known as Abdullah Sajid) is a Full-Stack Web Developer, Next.js Specialist, and Software Engineering student based in Rawalpindi, Pakistan. He specializes in building high-performance web applications using React.js, Next.js, Node.js, TypeScript, Docker, and Redis.",
      },
    },
    {
      "@type": "Question",
      name: "What web development services does Abdullah Sajid offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abdullah Sajid offers full-stack web application development, custom Next.js frontend architecture, RESTful API design with Node.js & Express, database modeling (MongoDB & SQL), Redis caching integration, Docker containerization, and responsive UI/UX design prototyping using Figma.",
      },
    },
    {
      "@type": "Question",
      name: "What tech stack does Abdullah Sajid specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "His primary technical stack includes Next.js (App Router, SSR, SSG), React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, Node.js, Express, Redis, Docker, Git/GitHub, and Figma.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact or hire Abdullah Sajid for software projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach out directly via email at muhammadabdullahfscem@gmail.com, call +92 344 5076088, or connect on LinkedIn (in/muhammad-abdullah-7572762b9) and GitHub (Abdullah786346).",
      },
    },
  ],
};

const jsonLdBreadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About Abdullah Sajid", item: `${siteUrl}/#AboutUs` },
    { "@type": "ListItem", position: 3, name: "Experience & Education", item: `${siteUrl}/#Qualification` },
    { "@type": "ListItem", position: 4, name: "Services", item: `${siteUrl}/#OurServices` },
    { "@type": "ListItem", position: 5, name: "FAQ", item: `${siteUrl}/#FAQ` },
    { "@type": "ListItem", position: 6, name: "Projects", item: `${siteUrl}/#MyProjects` },
    { "@type": "ListItem", position: 7, name: "Contact", item: `${siteUrl}/#ContactMe` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <Script
          id="json-ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
        <Script
          id="json-ld-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2607800826981704"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
