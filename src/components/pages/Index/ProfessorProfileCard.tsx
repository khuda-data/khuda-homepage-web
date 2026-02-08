import type { ProfessorInfo } from "./ProfessorShowcase";

interface ProfessorProfileCardProps {
  professor: ProfessorInfo;
}

const ProfessorProfileCard = ({ professor }: ProfessorProfileCardProps) => {
  return (
    <div className="lg:col-span-2 rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      {/* 프로필 이미지 영역 */}
      <div className="relative mb-6 sm:mb-8 w-full flex-1 flex items-center justify-center">
        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-500/8 via-purple-500/6 to-red-500/8 blur-2xl" />
        <div className="relative w-full h-full max-w-[500px] max-h-[500px] rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <span className="text-lg sm:text-xl md:text-2xl font-medium text-white/60 select-none leading-relaxed">
            프로필 이미지
          </span>
        </div>
      </div>

      {/* 이름 & 직함 */}
      <p className="text-sm sm:text-base text-white/40 font-medium mb-1">
        {professor.title}
      </p>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
        {professor.name}
      </h3>
      <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
        {professor.department}
      </p>
    </div>
  );
};

export default ProfessorProfileCard;
