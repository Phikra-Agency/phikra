import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/components/site/app-provider";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PHIKRA — Creative Intelligence Studio | WE THINK. YOU LEAD.",
    template: "%s — PHIKRA",
  },
  description:
    "PHIKRA est un studio de création qui pense avant de produire. Stratégie, branding, image, digital. On construit des marques qui se tiennent.",
  keywords: [
    "PHIKRA",
    "studio créatif",
    "agence de marque",
    "branding",
    "stratégie de marque",
    "audiovisuel",
    "motion design",
    "design digital",
    "Maroc",
    "creative studio",
  ],
  authors: [{ name: "PHIKRA" }],
  creator: "PHIKRA",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/?lang=en" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: "PHIKRA",
    title: "PHIKRA — Creative Intelligence Studio",
    description:
      "WE THINK. YOU LEAD. Studio de création. Stratégie, branding, image, digital.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "PHIKRA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHIKRA — Creative Intelligence Studio",
    description: "WE THINK. YOU LEAD. Stratégie, branding, image, digital.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  category: "design",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PHIKRA",
  alternateName: "PHIKRA — Creative Intelligence Studio",
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  slogan: "WE THINK. YOU LEAD.",
  description:
    "Studio de création qui pense avant de produire. Stratégie, branding, image, digital.",
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.line1,
    addressLocality: siteConfig.contact.address.city,
    addressCountry: "MA",
  },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
    siteConfig.social.behance,
  ].filter(Boolean),
  knowsAbout: [
    "Brand strategy",
    "Brand identity",
    "Brand design",
    "Art direction",
    "Brand films",
    "Motion design",
    "Photography",
    "Editorial design",
    "Digital product design",
    "Next.js development",
    "Web performance",
    "Creative direction",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} grain antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProvider>{children}</AppProvider>
        <Toaster />
        {/* Bord cramoisi 1px = l'« edge » de l'objet papier (charte PHIKRA) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90]"
          style={{ border: "1px solid rgba(229,13,74,0.25)", boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)" }}
        />
      </body>
    </html>
  );
}
