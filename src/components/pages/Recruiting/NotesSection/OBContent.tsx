import { APPLICATION_FORM_CONFIG } from "@/lib/constants";

const OBContent = () => {
  return (
    <>
      {/* Intro */}
      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
        {APPLICATION_FORM_CONFIG.obBenefits.intro}
      </p>

      {/* 혜택 목록 */}
      <div className="space-y-3">
        {APPLICATION_FORM_CONFIG.obBenefits.benefits.map((benefit, index) => (
          <div key={index} className="border-l-2 border-purple-400/50 pl-4">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-1">{benefit.title}</h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{benefit.description}</p>
            {benefit.feature && (
              <p className="text-xs sm:text-sm text-white/60 mt-1">특징: {benefit.feature}</p>
            )}
            {benefit.benefit && (
              <p className="text-xs sm:text-sm text-white/60 mt-1">혜택: {benefit.benefit}</p>
            )}
            {benefit.operation && (
              <p className="text-xs sm:text-sm text-white/60 mt-1">운영: {benefit.operation}</p>
            )}
            {benefit.purpose && (
              <p className="text-xs sm:text-sm text-white/60 mt-1">취지: {benefit.purpose}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OBContent;
