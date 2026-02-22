import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import ProjectsSection from "@/components/pages/Projects/ProjectsSection";
import Footer from "@/components/shared/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
