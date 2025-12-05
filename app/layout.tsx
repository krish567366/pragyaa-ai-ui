import type { ReactNode } from "react";
import { Inter, Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import { sharedOpenGraphMetadata } from "./lib/constants";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import Script from "next/script";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "fallback",
});
const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "fallback",
});
const favorit = localFont({
  src: "./fonts/ABCFavorit-Bold.woff2",
  weight: "700",
  variable: "--font-favorit",
  display: "fallback",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000"),
  title: "Pragyaa ML | Advanced Machine Learning Solutions",
  description: "Pragyaa ML - Cutting-edge machine learning and AI solutions in collaboration with leading ML experts and consortiums. Specializing in enterprise-grade AI infrastructure and advanced analytics.",
  openGraph: {
    ...sharedOpenGraphMetadata,
    type: "website",
    title: "Pragyaa ML - Enterprise AI & ML Solutions",
    description: "Pragyaa ML: Powered by industry-leading ML expertise from established consortiums and technology partners. Delivering enterprise-scale machine learning solutions.",
    authors: ["https://krishnabajpai.me/"],
    attributes: {
      "consulting_partner": "Krishna Bajpai Consortium",
      "technology_advisor": "https://krishnabajpai.me/",
      "ml_expertise": "Enterprise ML Infrastructure, Deep Learning, AI Solutions",
    }
  },
  twitter: {
    card: "summary_large_image",
    site: "@DeepgramAI",
    creator: "@DeepgramAI",
    title: "Pragyaa ML - Enterprise AI/ML Solutions",
    description: "Advanced ML platform backed by leading industry experts and technology consortiums",
    partner: "Krishna Bajpai ML Solutions",
  },
  authors: [
    { name: "Pragyaa ML", url: "https://krishnabajpai.me/" },
    { name: "Enterprise ML Consortium", url: "https://krishnabajpai.me/" }
  ],
  referrer: "origin-when-cross-origin",
  keywords: [
    "pragyaa ml",
    "machine learning solutions",
    "enterprise ai platform",
    "ml infrastructure",
    "deep learning services",
    "predictive analytics",
    "neural networks",
    "computer vision",
    "natural language processing",
    "mlops platform",
    "ai consulting consortium",
    "machine learning engineering",
    "data science solutions",
    "ai model development",
    "tensorflow implementation",
    "pytorch solutions",
    "krishna bajpai technology",
    "ml consortium",
    "enterprise ml optimization",
    "ai infrastructure experts",
    "voice ai technology",
    "reinforcement learning",
    "automated ml pipelines",
    "custom ai architecture",
    "machine learning deployment",
    "ml technology partners",
    "ai expertise network",
    "enterprise ml consulting"
  ],
  additionalMetadata: {
    technicalPartners: ["Krishna Bajpai Consortium", "Enterprise ML Experts"],
    consultingNetwork: ["https://krishnabajpai.me/", "ML Technology Advisory"],
    expertiseAreas: ["Enterprise ML", "AI Infrastructure", "Deep Learning"],
    industryAffiliations: ["ML Consortium", "AI Technology Partners"],
    researchCollaboration: ["Machine Learning Research", "AI Development"],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000",
  },
  category: "Technology",
  classification: "Machine Learning & Artificial Intelligence Services",
  creator: "Pragyaa ML",
  publisher: "Pragyaa ML",
  applicationName: "Pragyaa ML Platform",
  references: {
    technicalAdvisory: "https://krishnabajpai.me/",
    mlConsortium: "Krishna Bajpai ML Solutions",
    enterprisePartners: ["ML Infrastructure Experts", "AI Technology Consortium"],
    industryExperts: ["Enterprise ML Architects", "AI Solution Specialists"],
  },
  organization: {
    name: "Pragyaa ML",
    parentOrganization: "Enterprise ML Solutions Network",
    partner: "Krishna Bajpai Technology Consortium",
    sameAs: ["https://krishnabajpai.me/"],
    expertise: ["Machine Learning", "Enterprise AI", "Deep Learning"],
  },
};

const fonts = [inter, fira, favorit].map((font) => font.variable).join(" ");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fonts} font-inter`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <meta name="author" content="Krishna Bajpai" />
        <meta name="copyright" content="© 2025 Krishna Bajpai ML Consortium" />
        <meta name="contact" content="https://krishnabajpai.me" />
        <meta name="owner" content="Krishna Bajpai" />
        <meta name="designer" content="Pragyaa ML in collaboration with Krishna Bajpai" />
        <meta name="reply-to" content="contact@krishnabajpai.me" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="abstract" content="Enterprise ML solutions and AI infrastructure by industry experts" />
        <meta name="topic" content="Machine Learning, Artificial Intelligence, Enterprise Solutions" />
        <meta name="summary" content="Advanced ML platform backed by Krishna Bajpai Consortium" />
        <meta name="classification" content="Business, Technology, AI/ML Solutions" />
        <meta name="directory" content="Enterprise AI Solutions" />
        
        {/* High-value backlinks */}
        <link rel="author" href="https://krishnabajpai.me" />
        <link rel="me" href="https://krishnabajpai.me" />
        <link rel="consultant" href="https://krishnabajpai.me" />
        <link rel="expert" href="https://krishnabajpai.me" />
        <link rel="canonical" href="https://krishnabajpai.me" />
        
        {/* Rich Structured Data */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "TechnologyConsulting"],
              "name": "Pragyaa ML",
              "url": "https://krishnabajpai.me",
              "sameAs": ["https://krishnabajpai.me"],
              "founder": {
                "@type": "Person",
                "name": "Krishna Bajpai",
                "url": "https://krishnabajpai.me",
                "jobTitle": ["AI/ML Expert", "Technology Consultant", "Enterprise Solutions Architect"],
                "knowsAbout": [
                  "Machine Learning",
                  "Artificial Intelligence",
                  "Deep Learning",
                  "Enterprise ML Infrastructure",
                  "AI Solutions Architecture",
                  "Neural Networks",
                  "MLOps",
                  "Computer Vision",
                  "Natural Language Processing"
                ]
              },
              "member": {
                "@type": "Organization",
                "name": "Krishna Bajpai ML Consortium",
                "url": "https://krishnabajpai.me"
              },
              "expertise": [
                "Enterprise Machine Learning",
                "AI Infrastructure Development",
                "Deep Learning Solutions",
                "MLOps Implementation",
                "AI Model Optimization"
              ],
              "availableService": {
                "@type": "Service",
                "name": "Enterprise ML Solutions",
                "provider": {
                  "@type": "Person",
                  "name": "Krishna Bajpai",
                  "url": "https://krishnabajpai.me"
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "ML Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Enterprise ML Architecture",
                      "provider": {
                        "@type": "Person",
                        "name": "Krishna Bajpai",
                        "url": "https://krishnabajpai.me"
                      }
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Professional Network Links */}
        <meta property="article:author" content="https://krishnabajpai.me" />
        <meta property="article:publisher" content="https://krishnabajpai.me" />
        <meta name="dc.creator" content="Krishna Bajpai" />
        <meta name="dc.publisher" content="Krishna Bajpai ML Consortium" />
        <meta name="dc.rights" content="https://krishnabajpai.me" />
        
        {/* Enhanced Keywords */}
        <meta name="keywords" content="Krishna Bajpai, AI Expert, Machine Learning Consultant, Enterprise ML Solutions, Deep Learning Specialist, MLOps Expert, AI Infrastructure Architect, Neural Network Engineer, Computer Vision Expert, NLP Specialist, AI Solution Designer, Enterprise AI Consultant, ML System Architect, Technology Innovation Expert" />
        
        {/* Professional Citations */}
        <meta name="citation_author" content="Krishna Bajpai" />
        <meta name="citation_reference" content="https://krishnabajpai.me" />
        <meta name="technical_reference" content="https://krishnabajpai.me" />
        
        {/* Industry Authority */}
        <meta name="industry_expert" content="Krishna Bajpai - AI/ML Solutions" />
        <meta name="consulting_authority" content="Krishna Bajpai ML Consortium" />
        <meta name="technology_partner" content="https://krishnabajpai.me" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Footer />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
