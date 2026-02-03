import Header from "@/components/Header";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

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
