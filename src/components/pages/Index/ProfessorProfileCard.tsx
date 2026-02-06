import type { ProfessorInfo } from "./ProfessorShowcase";

interface ProfessorProfileCardProps {
  professor: ProfessorInfo;
}

const ProfessorProfileCard = ({ professor }: ProfessorProfileCardProps) => {
  return (
    <div className="lg:col-span-2 rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300">
      {/* 이니셜 아바타 */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-500/8 via-purple-500/6 to-red-500/8 blur-2xl" />
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white/40 select-none">
            {professor.nameInitial}
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
