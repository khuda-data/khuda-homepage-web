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
          title="데이터와 AI로 만들어낸, KHUDA의 프로젝트"
          subtitle="KHUDA에서 활동하는 구성원들이 직접 기획하고 개발한 프로젝트들이에요."
          backgroundImage="/images/project.jpeg"
        />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
