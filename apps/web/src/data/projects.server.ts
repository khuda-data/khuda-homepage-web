// 이 파일은 빌드 시점에 서버(Vercel 빌드)에서만 실행된다. (fs로 .md 파일을 읽음)
// 파일명이 .server.ts 이고 page.tsx 에서만 import 하므로 브라우저 번들에는 포함되지 않는다.
import fs from "node:fs";
import path from "node:path";
import type { Project } from "./projects";

// 프로젝트 글 .md 파일들이 들어있는 폴더. (content/projects/<기수>/*.md)
const CONTENT_DIR = path.join(process.cwd(), "content/projects");
// .md 의 thumbnail/slides 에는 파일명만 적고, 실제 이미지는 여기에 올린다.
const IMAGE_BASE = "/images/projects";

// "my.png" -> "/images/projects/my.png". 이미 "/"로 시작하면 그대로 둔다.
function toImagePath(name: string): string {
  const value = name.trim();
  if (!value) return "";
  return value.startsWith("/") ? value : `${IMAGE_BASE}/${value}`;
}

// 아주 단순한 frontmatter 파서. (--- 사이의 key: value 들 + 그 아래 본문)
// 외부 라이브러리 없이 처리하려고 직접 구현했다. 형식이 단순하므로 이걸로 충분하다.
function parseMarkdown(raw: string): { data: Record<string, string>; body: string } | null {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) return null;
  const [, frontmatter, body] = match;

  const data: Record<string, string> = {};
  for (const line of frontmatter.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  }
  return { data, body: body.trim() };
}

// content/projects/<기수>/*.md 경로를 모두 모은다.
// "_"로 시작하는 파일(_template.md 등)과 README.md 는 글이 아니므로 건너뛴다.
function collectMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files: string[] = [];
  for (const generation of fs.readdirSync(CONTENT_DIR)) {
    const generationDir = path.join(CONTENT_DIR, generation);
    if (!fs.statSync(generationDir).isDirectory()) continue;
    for (const file of fs.readdirSync(generationDir)) {
      if (!file.endsWith(".md")) continue;
      if (file.startsWith("_") || file.toLowerCase() === "readme.md") continue;
      files.push(path.join(generationDir, file));
    }
  }
  return files.sort();
}

// 빌드 시점에 .md 들을 읽어 Project[] 로 변환한다. page.tsx 가 호출한다.
export function getProjects(): Project[] {
  const projects: Project[] = [];
  for (const file of collectMarkdownFiles()) {
    const parsed = parseMarkdown(fs.readFileSync(file, "utf8"));
    if (!parsed) continue;
    const { data, body } = parsed;

    const slides = (data.slides ?? "")
      .split(",")
      .map((slide) => toImagePath(slide))
      .filter(Boolean);

    projects.push({
      title: data.title ?? "",
      members: data.members ?? "",
      longDescription: body,
      generation: data.generation ?? "",
      track: data.track ?? "",
      thumbnail: toImagePath(data.thumbnail ?? ""),
      slides,
      githubUrl: data.github || undefined,
    });
  }
  return projects;
}
