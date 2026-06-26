import type { Application } from "@/types/application";
import { APPLICATION_TYPE_LABEL } from "@/types/application";
import { formatDateTime } from "@/lib/format";

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// 체크리스트, 면접 등 JSON 문자열 값을 읽기 좋게 편다.
function readable(value: string): string {
  if (!value) return "";
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.join(", ");
    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join(" / ");
    }
  } catch {
    // 평범한 문자열
  }
  return value;
}

// 기본 컬럼 + 모든 문항(첫 등장 순서) 컬럼을 포함한 CSV를 만든다.
export function applicationsToCsv(applications: Application[]): string {
  const questionCols: string[] = [];
  const seen = new Set<string>();
  for (const app of applications) {
    for (const a of app.answers) {
      if (!seen.has(a.question)) {
        seen.add(a.question);
        questionCols.push(a.question);
      }
    }
  }

  const header = ["이름", "지원유형", "트랙", "연락처", "이메일", "제출일시", ...questionCols];

  const rows = applications.map((app) => {
    const answerMap = new Map(app.answers.map((a) => [a.question, readable(a.value)]));
    const cells = [
      app.name,
      APPLICATION_TYPE_LABEL[app.applicationType],
      app.track,
      app.phone,
      app.email,
      formatDateTime(app.submittedAt),
      ...questionCols.map((col) => answerMap.get(col) ?? ""),
    ];
    return cells.map((v) => escapeCsv(String(v))).join(",");
  });

  return [header.map(escapeCsv).join(","), ...rows].join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  // 엑셀에서 한글이 깨지지 않도록 BOM 추가
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
