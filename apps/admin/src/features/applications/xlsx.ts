import ExcelJS from "exceljs";
import type { Application, ApplicationType } from "@/types/application";
import { formatDateTime } from "@/lib/format";

// 체크리스트, 면접 일정 등 JSON 문자열 값을 읽기 좋게 편다.
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

// 기본 컬럼. 시트로 유형을 나누므로 지원유형 컬럼은 빼고 핵심 정보만 둔다.
const BASE_COLUMNS = ["이름", "트랙", "연락처", "이메일", "제출일시"] as const;
const BASE_WIDTH: Record<string, number> = {
  이름: 12,
  트랙: 18,
  연락처: 16,
  이메일: 26,
  제출일시: 20,
};

const HEADER_FILL = "FF3182F6"; // KHUDA 블루
const TYPE_LABEL: Record<ApplicationType, string> = { yb: "YB", ob: "OB" };

// 해당 유형 지원서들에 등장한 문항을 첫 등장 순서대로 모은다.
function collectQuestionCols(apps: Application[]): string[] {
  const cols: string[] = [];
  const seen = new Set<string>();
  for (const app of apps) {
    for (const a of app.answers) {
      if (!seen.has(a.question)) {
        seen.add(a.question);
        cols.push(a.question);
      }
    }
  }
  return cols;
}

function buildSheet(workbook: ExcelJS.Workbook, type: ApplicationType, apps: Application[]) {
  const sheet = workbook.addWorksheet(TYPE_LABEL[type], {
    views: [{ state: "frozen", ySplit: 1 }], // 헤더 행 틀고정
  });

  const questionCols = collectQuestionCols(apps);
  const headers = [...BASE_COLUMNS, ...questionCols];

  sheet.columns = headers.map((header) => ({
    header,
    key: header,
    width: BASE_WIDTH[header] ?? 40,
  }));

  // 헤더 서식: 굵게, 흰 글씨, 파란 배경, 가운데 정렬
  const headerRow = sheet.getRow(1);
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: HEADER_FILL } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = { bottom: { style: "thin", color: { argb: "FFBFC7D2" } } };
  });

  // 데이터 행
  for (const app of apps) {
    const answerMap = new Map(app.answers.map((a) => [a.question, readable(a.value)]));
    const row: Record<string, string> = {
      이름: app.name,
      트랙: app.track,
      연락처: app.phone,
      이메일: app.email,
      제출일시: formatDateTime(app.submittedAt),
    };
    for (const col of questionCols) {
      row[col] = answerMap.get(col) ?? "";
    }
    const added = sheet.addRow(row);
    added.alignment = { vertical: "top", wrapText: true };
  }

  // 헤더에 자동 필터
  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: headers.length },
  };

  return sheet;
}

// 지원서들을 YB, OB 시트로 나눈 엑셀 워크북을 만들어 내려받는다.
export async function exportApplicationsXlsx(applications: Application[], filename: string) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "KHUDA Admin";

  const types: ApplicationType[] = ["yb", "ob"];
  for (const type of types) {
    const apps = applications.filter((app) => app.applicationType === type);
    if (apps.length === 0) continue; // 해당 유형이 없으면 시트를 만들지 않는다.
    buildSheet(workbook, type, apps);
  }
  // 둘 다 비어 있으면(이론상 없음) 빈 시트라도 하나 둔다.
  if (workbook.worksheets.length === 0) {
    workbook.addWorksheet("지원서");
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
