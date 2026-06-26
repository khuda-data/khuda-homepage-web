import { APPLICATION_FORM_CONFIG } from "@/lib/constants";
import NoteItem from "./NoteItem";

const OBContent = () => {
  const { intro, benefits } = APPLICATION_FORM_CONFIG.obBenefits;

  return (
    <>
      {/* Intro */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
        {intro}
      </p>

      {/* 혜택 목록 */}
      <div className="space-y-4 sm:space-y-5">
        {benefits.map((benefit, index) => (
          <NoteItem key={index} item={benefit} borderClass="border-blue-600/50" />
        ))}
      </div>
    </>
  );
};

export default OBContent;
