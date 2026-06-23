import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { APPLICATION_TRACKS, APPLICATION_TYPE_LABEL } from "@/types/application";
import { formatDateTime } from "@/lib/format";
import { useApplications } from "./api";
import { applicationsToCsv, downloadCsv } from "./csv";
import { ApplicationDetailDrawer } from "./ApplicationDetailDrawer";

type TypeFilter = "all" | ApplicationType;
type TrackFilter = "all" | (typeof APPLICATION_TRACKS)[number];
type SortKey = "recent" | "oldest" | "name";

export const ApplicationsPage = () => {
  const { data, isLoading } = useApplications();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [selected, setSelected] = useState<Application | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const applications = data ?? [];

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const result = applications.filter((app) => {
      const matchesKeyword =
        keyword === "" ||
        app.name.toLowerCase().includes(keyword) ||
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

  const openDetail = (app: Application) => {
    setSelected(app);
    setDrawerOpen(true);
  };

  const handleExport = () => {
    const csv = applicationsToCsv(filtered);
    downloadCsv(`khuda-applications-${filtered.length}.csv`, csv);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">지원서</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {applications.length}건 중 {filtered.length}건 표시
          </p>
        </div>
        <Button variant="outline" onClick={handleExport} disabled={filtered.length === 0}>
          <Download className="size-4" />
          CSV 내보내기
        </Button>
      </div>

      {/* 검색, 필터, 정렬 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름, 연락처 검색"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
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
            <SelectTrigger className="w-40">
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
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
              <SelectItem value="name">이름순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 목록 */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>이름</TableHead>
              <TableHead>지원유형</TableHead>
              <TableHead>트랙</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>제출일시</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="py-16 text-center text-sm text-muted-foreground">
                  조건에 맞는 지원서가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((app) => (
                <TableRow
                  key={app.id}
                  className="cursor-pointer"
                  onClick={() => openDetail(app)}
                >
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {APPLICATION_TYPE_LABEL[app.applicationType]}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.track}</TableCell>
                  <TableCell className="text-muted-foreground">{app.phone}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(app.submittedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ApplicationDetailDrawer
        application={selected}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
};
