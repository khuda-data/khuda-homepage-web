import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import ProjectsSection from "@/components/pages/Projects/ProjectsSection";
import Footer from "@/components/shared/Footer";
import SEO from "@/components/shared/SEO";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="프로젝트 | KHUDA"
        description="KHUDA 구성원들이 기획하고 개발한 프로젝트들을 소개합니다."
        path="/projects"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
              { "@type": "ListItem", position: 2, name: "프로젝트", item: "https://www.khuda.co.kr/projects" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "프로젝트 | KHUDA",
            description: "KHUDA 구성원들이 기획하고 개발한 프로젝트들을 소개합니다.",
            url: "https://www.khuda.co.kr/projects",
            isPartOf: { "@type": "WebSite", url: "https://www.khuda.co.kr" },
          },
        ]}
      />
      <Header />
      <main>
        <PageHeroSection
          title="KHUDA의 프로젝트"
          subtitle="KHUDA 구성원들이 기획하고 개발한 프로젝트들을 소개합니다."
          backgroundImage="/images/headers/hello.png"
        />

        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
