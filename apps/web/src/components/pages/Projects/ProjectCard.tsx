import type { Project } from "@/data/projects";
import { ProjectTags, ProjectTrackLabel } from "./ProjectMeta";

// 목록에서는 카드 높이를 맞추려고 태그를 앞의 3개만 보여 준다. 전체는 상세 화면에서 보인다.
const CARD_TAG_LIMIT = 3;

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full text-left rounded-xl sm:rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg cursor-pointer"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-muted flex items-center justify-center">
      {project.thumbnail ? (
        <>
          <img
            src={project.thumbnail}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      ) : (
        <p className="text-muted-foreground text-sm">이미지 준비중</p>
      )}
    </div>

    <div className="p-4 sm:p-5">
      <p className="text-sm font-semibold mb-2">
        <ProjectTrackLabel project={project} />
        <span className="text-muted-foreground/40 mx-1.5">·</span>
        <span className="text-foreground/60">{project.generation}</span>
      </p>
      <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
        {project.title}
      </h3>
      {project.tags.length > 0 && (
        <div className="mt-3">
          <ProjectTags tags={project.tags.slice(0, CARD_TAG_LIMIT)} size="sm" />
        </div>
      )}
    </div>
  </button>
);

export default ProjectCard;
