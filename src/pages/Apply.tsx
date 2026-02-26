import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import SEO from "@/components/shared/SEO";

const Apply = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SEO
        title="지원하기 | KHUDA"
        description="KHUDA 신규 부원 지원서를 작성하세요."
        path="/apply"
        noindex={true}
      />
      <div className="text-center w-full">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 sm:mb-12">
          아직 모집 기간이 아니에요.
        </p>
        <Link 
          to={ROUTES.home} 
          className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-foreground text-background font-semibold text-sm sm:text-base rounded-lg hover:bg-foreground/90 transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Apply;
