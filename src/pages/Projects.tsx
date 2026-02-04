import Header from "@/components/shared/Header";
import ProjectsSection from "@/components/pages/Projects/ProjectsSection";
import Footer from "@/components/shared/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
