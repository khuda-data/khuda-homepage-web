import type { Application } from "@/types/application";
import { APPLICATION_TYPE_LABEL } from "@/types/application";
import { formatDateTime } from "@/lib/format";

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// 목록 요약 컬럼을 CSV로 내보낸다. 문항별 상세 답변은 상세 화면에서 확인한다.
export function applicationsToCsv(applications: Application[]): string {
  const header = ["이름", "지원유형", "트랙", "연락처", "이메일", "제출일시"];

  const rows = applications.map((app) => {
    const cells = [
      app.name,
      APPLICATION_TYPE_LABEL[app.applicationType],
      app.track,
      app.phone,
      app.email,
      formatDateTime(app.submittedAt),
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
