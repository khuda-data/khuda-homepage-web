import { useState, useEffect } from "react";
import { X, Github, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { TRACK_ACCENT_CLASS } from "@/lib/constants";

const SlideCarousel = ({ slides, title }: { slides: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative group/carousel">
      <div className="relative aspect-[2/1] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        {currentSlide ? (
          <>
            <img
              src={currentSlide}
              alt={`${title} ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {slides.length > 1 && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-xs text-white/80 backdrop-blur-sm">
                {currentIndex + 1} / {slides.length}
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground text-sm">이미지 준비중</p>
        )}
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

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
      <div className="relative w-full max-w-[780px] max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="sticky top-5 float-right mr-8 z-10 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-10 sm:px-14 pt-12 sm:pt-14 pb-10 sm:pb-12">
          <div className="flex items-center gap-1.5 mb-4 text-sm font-semibold">
            <span className={TRACK_ACCENT_CLASS}>{project.track}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-foreground/60">{project.generation}</span>
            {project.githubUrl && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2.5">
            {project.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            {project.members}
          </p>

          <div className="mb-8">
            <SlideCarousel
              slides={project.slides.length > 0 ? project.slides : [project.thumbnail]}
              title={project.title}
            />
          </div>

          <div>
            <p className="text-[15px] text-foreground/65 leading-[1.8]">
              {project.longDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
