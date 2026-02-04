import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMMON_STYLES } from "@/lib/constants";

interface FormData {
  student_id: string;
  phone_number: string;
  name: string;
}

interface Errors {
  student_id?: string;
  phone_number?: string;
  name?: string;
}

interface ResultQueryFormProps {
  formData: FormData;
  errors: Errors;
  isLoading: boolean;
  isOpen: boolean;
  onStudentIdChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ResultQueryForm = ({
  formData,
  errors,
  isLoading,
  isOpen,
  onStudentIdChange,
  onPhoneChange,
  onNameChange,
  onSubmit,
}: ResultQueryFormProps) => {
  return (
    <Card className={cn(COMMON_STYLES.cardBase, "rounded-xl sm:rounded-2xl md:rounded-3xl")}>
      <CardHeader className="px-4 sm:px-6 pb-4 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">조회 정보 입력</CardTitle>
        <CardDescription className="text-xs sm:text-sm mt-1 sm:mt-2">
          지원 시 입력하신 정보를 정확히 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="student_id" className="text-sm sm:text-base font-medium">
              학번 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="student_id"
              type="text"
              inputMode="numeric"
              placeholder="2024123456"
              value={formData.student_id}
              onChange={(e) => onStudentIdChange(e.target.value)}
              disabled={isLoading}
              className={cn(
                "min-h-[48px] sm:min-h-[44px] text-base sm:text-sm",
                errors.student_id && "border-destructive focus-visible:ring-destructive"
              )}
              maxLength={10}
              minLength={10}
            />
            {errors.student_id && (
              <p className="text-xs sm:text-sm text-destructive mt-1">{errors.student_id}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="phone_number" className="text-sm sm:text-base font-medium">
              전화번호 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone_number"
              type="tel"
              inputMode="numeric"
              placeholder="01012345678"
              value={formData.phone_number}
              onChange={(e) => onPhoneChange(e.target.value)}
              disabled={isLoading}
              className={cn(
                "min-h-[48px] sm:min-h-[44px] text-base sm:text-sm",
                errors.phone_number && "border-destructive focus-visible:ring-destructive"
              )}
              maxLength={11}
              minLength={11}
            />
            {errors.phone_number ? (
              <p className="text-xs sm:text-sm text-destructive mt-1">{errors.phone_number}</p>
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                하이픈(-) 없이 숫자만 입력해주세요.
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base font-medium">
              이름 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => onNameChange(e.target.value)}
              disabled={isLoading}
              className={cn(
                "min-h-[48px] sm:min-h-[44px] text-base sm:text-sm",
                errors.name && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {errors.name && (
              <p className="text-xs sm:text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isOpen}
            className="w-full min-h-[48px] sm:min-h-[44px] text-base sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isLoading ? (
              <>
                <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2 animate-spin" />
                조회 중...
              </>
            ) : !isOpen ? (
              <>
                <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2" />
                2026년 1월 12일 오후 6시부터 조회 가능
              </>
            ) : (
              "결과 조회"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
