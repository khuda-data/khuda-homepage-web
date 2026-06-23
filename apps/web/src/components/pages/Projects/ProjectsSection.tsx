import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { projectsData, generations, trackOptions, trackDisplayOrder, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import CustomSelect from "./CustomSelect";

const DEFAULT_GENERATION = "모든 기수";
const DEFAULT_TRACK = "모든 트랙";

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedGeneration = searchParams.get("generation") ?? DEFAULT_GENERATION;
  const selectedTrack = searchParams.get("track") ?? DEFAULT_TRACK;
  const searchQuery = searchParams.get("q") ?? "";

  const setFilter = useCallback(
    (key: string, value: string, defaultValue: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === defaultValue) {
            next.delete(key);
          } else {
            next.set(key, value);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const filteredProjects = useMemo(() => {
    const filtered = projectsData.filter((project) => {
      const matchesGeneration =
        selectedGeneration === "모든 기수" || project.generation === selectedGeneration;
      const matchesTrack =
        selectedTrack === "모든 트랙" || project.track === selectedTrack;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.members.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGeneration && matchesTrack && matchesSearch;
    });
    return [...filtered].sort(
      (a, b) =>
        trackDisplayOrder.indexOf(a.track) - trackDisplayOrder.indexOf(b.track)
    );
  }, [selectedGeneration, selectedTrack, searchQuery]);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={ref}
        className={cn(
          "pt-8 sm:pt-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-12 relative bg-background transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-3">
              <CustomSelect
                value={selectedTrack}
                onChange={(v) => setFilter("track", v, DEFAULT_TRACK)}
                options={trackOptions}
              />
              <CustomSelect
                value={selectedGeneration}
                onChange={(v) => setFilter("generation", v, DEFAULT_GENERATION)}
                options={generations}
              />
            </div>

            <div className="relative flex-1 w-full sm:w-auto sm:max-w-xs sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="프로젝트 검색 (제목, 팀명..)"
                value={searchQuery}
                onChange={(e) => setFilter("q", e.target.value, "")}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border hover:border-foreground/20 focus:border-foreground/30 focus:outline-none text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200"
              />
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-24">
              <p className="text-muted-foreground text-sm sm:text-base">
                조건에 맞는 프로젝트가 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProjectsSection;
