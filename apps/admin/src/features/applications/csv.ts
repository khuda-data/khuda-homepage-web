import type { Application } from "@/types/application";
import { APPLICATION_TYPE_LABEL } from "@/types/application";

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// 기본 컬럼 + 모든 문항(첫 등장 순서) 컬럼 + 면접 희망시간을 포함한 CSV 생성
export function applicationsToCsv(applications: Application[]): string {
  const questionCols: string[] = [];
  const seen = new Set<string>();
  for (const app of applications) {
    for (const a of app.answers) {
      const key = `[${a.section}] ${a.question}`;
      if (!seen.has(key)) {
        seen.add(key);
        questionCols.push(key);
      }
    }
  }

  const header = ["이름", "지원유형", "트랙", "연락처", "이메일", "제출일시", ...questionCols, "면접 희망시간"];

  const rows = applications.map((app) => {
    const answerMap = new Map(app.answers.map((a) => [`[${a.section}] ${a.question}`, a.answer]));
    const cells = [
      app.name,
      APPLICATION_TYPE_LABEL[app.applicationType],
      app.track,
      app.phone,
      app.email,
      app.submittedAt,
      ...questionCols.map((col) => answerMap.get(col) ?? ""),
      (app.interviewTimes ?? []).join(", "),
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
