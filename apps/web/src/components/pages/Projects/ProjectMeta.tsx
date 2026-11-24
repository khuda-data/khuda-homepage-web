import { TRACK_ACCENT_CLASS } from "@/lib/constants";
import type { Project } from "@/data/projects";

// "CV · 9기" / "토이 프로젝트 · 8기" 줄. 카드와 상세 화면이 같이 쓴다.
// 토이 프로젝트는 트랙 이름과 구분되도록 색을 다르게 한다.
export const ProjectTrackLabel = ({ project }: { project: Project }) => (
  <span className={project.type === "토이" ? "text-emerald-600" : TRACK_ACCENT_CLASS}>
    {project.tracks.join(" · ")}
  </span>
);

export const ProjectTags = ({ tags, size = "md" }: { tags: string[]; size?: "sm" | "md" }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
      <span
        key={tag}
        className={
          size === "sm"
            ? "px-2 py-0.5 rounded-full bg-muted text-[11px] font-medium text-foreground/60"
            : "px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground/60"
        }
      >
        {tag}
      </span>
    ))}
  </div>
);
