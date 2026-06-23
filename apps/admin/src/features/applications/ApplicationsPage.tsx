import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, RefreshCw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { Application, ApplicationType } from "@/types/application";
import { APPLICATION_TRACKS } from "@/types/application";
import { formatDateTime } from "@/lib/format";
import { useApplications } from "./api";
import { applicationsToCsv, downloadCsv } from "./csv";
import { ApplicationTypeBadge } from "./ApplicationTypeBadge";

type TypeFilter = "all" | ApplicationType;
type TrackFilter = "all" | (typeof APPLICATION_TRACKS)[number];
type SortKey = "recent" | "oldest" | "name";

// 한 페이지에 표시할 지원서 수
const PAGE_SIZE = 10;

// 스와이프 인식 최소 이동 거리(px)
const SWIPE_THRESHOLD = 50;

export const ApplicationsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useApplications();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [page, setPage] = useState(1);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const touchStartX = useRef<number | null>(null);

  const applications = data ?? [];

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const result = applications.filter((app) => {
      const matchesKeyword =
        keyword === "" ||
        app.name.toLowerCase().includes(keyword) ||
        app.email.toLowerCase().includes(keyword) ||
        app.phone.replace(/-/g, "").includes(keyword.replace(/-/g, ""));
      const matchesType = typeFilter === "all" || app.applicationType === typeFilter;
      const matchesTrack = trackFilter === "all" || app.track === trackFilter;
      return matchesKeyword && matchesType && matchesTrack;
    });

    return [...result].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "ko");
      const diff = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      return sort === "recent" ? -diff : diff;
    });
  }, [applications, search, typeFilter, trackFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // 검색·필터·정렬이 바뀌면 첫 페이지로
  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, trackFilter, sort]);

  const goToPage = (next: number) => {
    if (next < 1 || next > totalPages || next === currentPage) return;
    setSlideDir(next > currentPage ? "left" : "right");
    setPage(next);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      goToPage(currentPage + (diff > 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const openDetail = (app: Application) => {
    navigate(`/applications/${app.id}`);
  };

  const handleExport = () => {
    const csv = applicationsToCsv(filtered);
    downloadCsv(`khuda-applications-${filtered.length}.csv`, csv);
  };

  return (
    <div className="animate-fade-up space-y-5">
      <div>
        <h1 className="text-xl font-bold">지원 정보 확인</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          총 {applications.length}건 중 {filtered.length}건
        </p>
      </div>

      {/* 검색, 필터, 정렬, 액션을 한 줄에 정렬 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름, 연락처, 이메일 검색"
            className="pl-9"
          />
        </div>

        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            <SelectItem value="yb">YB</SelectItem>
            <SelectItem value="ob">OB</SelectItem>
          </SelectContent>
        </Select>

        <Select value={trackFilter} onValueChange={(v) => setTrackFilter(v as TrackFilter)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 트랙</SelectItem>
            {APPLICATION_TRACKS.map((track) => (
              <SelectItem key={track} value={track}>
                {track}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
            <SelectItem value="name">이름순</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 sm:ml-auto">
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={cn("size-4", isFetching && "animate-spin")} />
            새로고침
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={filtered.length === 0}>
            <Download className="size-4" />
            CSV 내보내기
          </Button>
        </div>
      </div>

      {/* 목록 (모바일에서 좌우 스와이프로 페이지 이동) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>이름</TableHead>
              <TableHead>지원유형</TableHead>
              <TableHead className="hidden md:table-cell">트랙</TableHead>
              <TableHead className="hidden md:table-cell">연락처</TableHead>
              <TableHead className="hidden lg:table-cell">이메일</TableHead>
              <TableHead>제출일시</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody
            key={currentPage}
            className={cn(
              "animate-in fade-in duration-300",
              slideDir === "left" ? "slide-in-from-right-4" : "slide-in-from-left-4"
            )}
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: 6 }).map((__, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                  조건에 맞는 지원서가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((app) => (
                <TableRow
                  key={app.id}
                  className="cursor-pointer"
                  onClick={() => openDetail(app)}
                >
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>
                    <ApplicationTypeBadge type={app.applicationType} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{app.track}</TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {app.phone}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {app.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(app.submittedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 (화살표 + 도트) */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-all duration-200",
              currentPage === 1
                ? "cursor-not-allowed text-foreground/20"
                : "text-foreground hover:bg-foreground/10 active:scale-95"
            )}
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goToPage(n)}
                aria-label={`${n}페이지`}
                aria-current={n === currentPage}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  n === currentPage
                    ? "w-6 bg-foreground"
                    : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-all duration-200",
              currentPage === totalPages
                ? "cursor-not-allowed text-foreground/20"
                : "text-foreground hover:bg-foreground/10 active:scale-95"
            )}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};
