import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import {
  ALL_GENERATIONS,
  ALL_TRACKS,
  getGenerationOptions,
  getTrackOptions,
  type Project,
} from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import CustomSelect from "./CustomSelect";

const DEFAULT_GENERATION = ALL_GENERATIONS;
const DEFAULT_TRACK = ALL_TRACKS;

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  // 프로젝트가 많아 섹션이 화면보다 훨씬 길다. 비율(threshold) 기준이면 모바일에서
  // 영영 나타나지 않으므로, 섹션이 조금이라도 보이면 바로 나타나게 한다.
  const { ref, isVisible } = useScrollAnimation({ threshold: 0, rootMargin: "0px" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedGeneration = searchParams.get("generation") ?? DEFAULT_GENERATION;
  const selectedTrack = searchParams.get("track") ?? DEFAULT_TRACK;
  const searchQuery = searchParams.get("q") ?? "";
  const trackOptions = useMemo(() => getTrackOptions(projects), [projects]);
  const generationOptions = useMemo(() => getGenerationOptions(projects), [projects]);

  const setFilter = useCallback(
    (key: string, value: string, defaultValue: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value === defaultValue) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      const qs = next.toString();
      // 필터 변경은 히스토리를 오염시키지 않도록 replace + 스크롤 유지
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // 트랙은 현재 이름(searchTracks)으로 찾는다. 카드에는 당시 이름(tracks)이 보인다.
  // 검색어는 제목·한 줄 소개·설명·태그·당시 트랙 이름에서 찾는다.
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesGeneration =
        selectedGeneration === DEFAULT_GENERATION || project.generation === selectedGeneration;
      const matchesTrack =
        selectedTrack === DEFAULT_TRACK || project.searchTracks.includes(selectedTrack);
      const matchesSearch =
        query === "" ||
        [project.title, project.summary, project.description, ...project.tags, ...project.tracks]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesGeneration && matchesTrack && matchesSearch;
    });
  }, [projects, selectedGeneration, selectedTrack, searchQuery]);

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
                options={generationOptions}
              />
            </div>

            <div className="relative flex-1 w-full sm:w-auto sm:max-w-xs sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="프로젝트 검색 (제목, 키워드..)"
                value={searchQuery}
                onChange={(e) => setFilter("q", e.target.value, "")}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border hover:border-foreground/20 focus:border-foreground/30 focus:outline-none text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200"
              />
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
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
