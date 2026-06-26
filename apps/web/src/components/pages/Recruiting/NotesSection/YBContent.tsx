import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import NoteItem from "./NoteItem";

const YBContent = () => {
  const { intro, requirements, notice, benefits } =
    APPLICATION_FORM_CONFIG.ybCompletionRequirements;

  return (
    <>
      {/* Intro */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
        {intro}
      </p>

      {/* 수료 조건 */}
      <div className="space-y-4 sm:space-y-5 mb-5 sm:mb-6">
        {requirements.map((req, index) => (
          <NoteItem key={index} item={req} borderClass="border-blue-600/60" />
        ))}
      </div>

      {/* 이외 혜택 */}
      <div className="pt-4 sm:pt-5 border-t border-border">
        <h4 className="text-sm sm:text-[15px] font-semibold text-foreground mb-3 sm:mb-4">
          {benefits.title}
        </h4>
        <div className="space-y-4 sm:space-y-5">
          {benefits.items.map((item, index) => (
            <NoteItem key={index} item={item} borderClass="border-blue-600/40" titleSize="sm" />
          ))}
        </div>
      </div>

      {/* 안내사항 */}
      <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-border">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{notice}</p>
      </div>
    </>
  );
};

export default YBContent;
