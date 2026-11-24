import { useEffect } from "react";
import { X, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectTags, ProjectTrackLabel } from "./ProjectMeta";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[780px] max-h-[85vh] overflow-y-auto scrollbar-thin rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="sticky top-5 float-right mr-8 z-10 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-10 sm:px-14 pt-12 sm:pt-14 pb-10 sm:pb-12">
          <div className="flex items-center gap-1.5 mb-4 text-sm font-semibold">
            <ProjectTrackLabel project={project} />
            <span className="text-muted-foreground/40">·</span>
            <span className="text-foreground/60">{project.generation}</span>
            {project.githubUrl && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub에서 코드 보기"
                  title="GitHub에서 코드 보기"
                  className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              </>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            {project.title}
          </h2>
          <p className="mt-2 text-[15px] text-foreground/65 leading-[1.8]">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="mt-4">
              <ProjectTags tags={project.tags} />
            </div>
          )}
          {project.thumbnail && (
            <div className="mt-6 aspect-[2/1] rounded-lg overflow-hidden bg-muted">
              <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
