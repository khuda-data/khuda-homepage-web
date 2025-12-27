import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tracks = [
  { value: "nlp", label: "NLP (자연어처리)" },
  { value: "cv", label: "CV (컴퓨터비전)" },
  { value: "de", label: "DE (데이터엔지니어링)" },
  { value: "da", label: "DA (데이터분석)" },
  { value: "aie", label: "AIE (AI엔지니어링)" },
  { value: "fin", label: "FIN (금융AI)" },
];

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    studentId: "",
    track1: "",
    track2: "",
    motivation: "",
    experience: "",
    agreement: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      toast({
        title: "동의가 필요합니다",
        description: "개인정보 수집 및 이용에 동의해 주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">지원이 완료되었습니다!</h1>
          <p className="text-muted-foreground mb-8">
            {formData.name}님의 지원서가 정상적으로 접수되었습니다.<br />
            결과는 입력하신 이메일로 안내드리겠습니다.
          </p>
          <Link to="/">
            <Button variant="heroOutline" className="rounded-md">
              메인으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로</span>
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">KHUDA 7기 지원</h1>
            <p className="text-muted-foreground">
              KHUDA와 함께 성장할 준비가 되셨나요?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold pb-2 border-b border-border">기본 정보</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@khu.ac.kr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department">학과 *</Label>
                  <Input
                    id="department"
                    placeholder="컴퓨터공학과"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentId">학번 *</Label>
                  <Input
                    id="studentId"
                    placeholder="2023123456"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Track Selection */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold pb-2 border-b border-border">트랙 선택</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>1지망 트랙 *</Label>
                  <Select
                    value={formData.track1}
                    onValueChange={(value) => setFormData({ ...formData, track1: value })}
                    required
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="트랙을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {tracks.map((track) => (
                        <SelectItem key={track.value} value={track.value}>
                          {track.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>2지망 트랙</Label>
                  <Select
                    value={formData.track2}
                    onValueChange={(value) => setFormData({ ...formData, track2: value })}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="트랙을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {tracks.map((track) => (
                        <SelectItem key={track.value} value={track.value}>
                          {track.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Essay */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold pb-2 border-b border-border">자기소개</h2>
              
              <div className="space-y-2">
                <Label htmlFor="motivation">지원 동기 *</Label>
                <Textarea
                  id="motivation"
                  placeholder="KHUDA에 지원하게 된 동기와 활동을 통해 이루고 싶은 목표를 작성해주세요. (500자 이내)"
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  required
                  className="min-h-[150px] bg-secondary border-border focus:border-primary"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.motivation.length}/500
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">관련 경험 (선택)</Label>
                <Textarea
                  id="experience"
                  placeholder="AI/데이터 관련 프로젝트, 스터디, 공모전 등의 경험이 있다면 작성해주세요. (500자 이내)"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="min-h-[150px] bg-secondary border-border focus:border-primary"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.experience.length}/500
                </p>
              </div>
            </div>

            {/* Agreement */}
            <div className="space-y-4 p-6 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="agreement"
                  checked={formData.agreement}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreement: checked as boolean })
                  }
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="agreement" className="cursor-pointer font-medium">
                    개인정보 수집 및 이용 동의 (필수)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    수집항목: 이름, 이메일, 학과, 학번<br />
                    수집목적: KHUDA 7기 지원자 심사 및 결과 안내<br />
                    보유기간: 모집 완료 후 1년
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "지원서 제출하기"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Apply;
