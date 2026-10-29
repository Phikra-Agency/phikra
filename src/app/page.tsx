"use client";

import { useApp } from "@/stores/use-app";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Cursor } from "@/components/site/cursor";
import { PageTransition } from "@/components/site/page-transition";
import { LoadingScreen } from "@/components/site/loading-screen";
import { BackToTop } from "@/components/site/back-to-top";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { HomePage } from "@/components/pages/home";
import { AgencyPage } from "@/components/pages/agency";
import { ServicesPage } from "@/components/pages/services";
import { PortfolioPage } from "@/components/pages/portfolio";
import { ProjectDetailPage } from "@/components/pages/project-detail";
import { NewsPage } from "@/components/pages/news";
import { ArticleDetailPage } from "@/components/pages/article-detail";
import { ContactPage } from "@/components/pages/contact";
import { LegalPage } from "@/components/pages/legal";

export default function Home() {
  const view = useApp((s) => s.view);

  const renderView = () => {
    switch (view) {
      case "home":
        return <HomePage />;
      case "agency":
        return <AgencyPage />;
      case "services":
        return <ServicesPage />;
      case "portfolio":
        return <PortfolioPage />;
      case "project":
        return <ProjectDetailPage />;
      case "news":
        return <NewsPage />;
      case "article":
        return <ArticleDetailPage />;
      case "contact":
        return <ContactPage />;
      case "legal":
      case "privacy":
        return <LegalPage type={view} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <LoadingScreen />
      <div className="relative flex min-h-screen flex-col">
        {/* Skip to content — accessibilité */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-crimson focus:px-4 focus:py-2 focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Aller au contenu
        </a>
        <ScrollProgress />
        <Cursor />
        <BackToTop />
        <SmoothScroll />
        <Header />
        <main id="main-content" className="flex-1" role="main">
          <PageTransition>{renderView()}</PageTransition>
        </main>
        <Footer />
      </div>
    </>
  );
}
