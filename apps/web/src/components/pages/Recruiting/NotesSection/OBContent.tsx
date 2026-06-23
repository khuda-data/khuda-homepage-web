import { APPLICATION_FORM_CONFIG } from "@/lib/constants";

const OBContent = () => {
  return (
    <>
      {/* Intro */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
        {APPLICATION_FORM_CONFIG.obBenefits.intro}
      </p>

      {/* 혜택 목록 */}
      <div className="space-y-4 sm:space-y-5">
        {APPLICATION_FORM_CONFIG.obBenefits.benefits.map((benefit, index) => (
          <div key={index} className="border-l-2 border-blue-600/50 pl-4 sm:pl-5 py-1">
            <h4 className="text-sm sm:text-[15px] font-semibold text-foreground mb-2">{benefit.title}</h4>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-2">{benefit.description}</p>
            {benefit.feature && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">특징: {benefit.feature}</p>
            )}
            {benefit.benefit && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">혜택: {benefit.benefit}</p>
            )}
            {benefit.operation && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">운영: {benefit.operation}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OBContent;
