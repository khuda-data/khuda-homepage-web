"use client";

import PageHeroSection from "@/components/shared/PageHeroSection";
import ProjectsSection from "@/components/pages/Projects/ProjectsSection";
import type { Project } from "@/data/projects";

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <PageHeroSection
          title="KHUDA의 프로젝트"
          subtitle="KHUDA 구성원들이 기획하고 개발한 프로젝트들을 소개합니다."
          backgroundImage="/images/headers/page-header.png"
        />

        <ProjectsSection projects={projects} />
      </main>
    </div>
  );
};

export default Projects;
