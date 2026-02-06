import { ExternalLink } from "lucide-react";
import type { ProfessorInfo } from "./ProfessorShowcase";

interface ProfessorDetailCardsProps {
  professor: ProfessorInfo;
}

const ProfessorDetailCards = ({ professor }: ProfessorDetailCardsProps) => {
  return (
    <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">
      {/* 인사말 & 소개 */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 flex-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug sm:leading-normal mb-5 sm:mb-6 whitespace-pre-line">
          {professor.greeting}
        </h3>
        <div className="space-y-4">
          {professor.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm sm:text-base text-white/55 leading-relaxed sm:leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 md:p-10 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300">
        <h4 className="text-base sm:text-lg font-semibold text-white/90 mb-4 sm:mb-5">
          {professor.title} {professor.name}
        </h4>
        <ul className="space-y-2.5 sm:space-y-3">
          {professor.details.map((detail, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm sm:text-base text-white/55"
            >
              <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5 text-sm sm:text-base text-white/55">
            <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            <span>
              연구 분야: {professor.researchAreas.join(", ")}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-2 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            <a
              href={professor.labUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-blue-400/80 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
            >
              {professor.labName} 웹사이트
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessorDetailCards;
