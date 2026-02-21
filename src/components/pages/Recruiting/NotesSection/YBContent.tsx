import { APPLICATION_FORM_CONFIG } from "@/lib/constants";

const YBContent = () => {
  return (
    <>
      {/* Intro */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
        {APPLICATION_FORM_CONFIG.ybCompletionRequirements.intro}
      </p>

      {/* 수료 조건 */}
      <div className="space-y-4 sm:space-y-5 mb-5 sm:mb-6">
        {APPLICATION_FORM_CONFIG.ybCompletionRequirements.requirements.map((req, index) => (
          <div key={index} className="border-l-2 border-primary/60 pl-4 sm:pl-5 py-1">
            <h4 className="text-sm sm:text-[15px] font-semibold text-foreground mb-2">{req.title}</h4>
            {req.period && (
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">기간: {req.period}</p>
            )}
            <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-2">{req.description}</p>
            {req.obligation && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">의무: {req.obligation}</p>
            )}
          </div>
        ))}
      </div>

      {/* 이외 혜택 */}
      <div className="pt-4 sm:pt-5 border-t border-border">
        <h4 className="text-sm sm:text-[15px] font-semibold text-foreground mb-3 sm:mb-4">
          {APPLICATION_FORM_CONFIG.ybCompletionRequirements.benefits.title}
        </h4>
        <div className="space-y-4 sm:space-y-5">
          {APPLICATION_FORM_CONFIG.ybCompletionRequirements.benefits.items.map((item, index) => (
            <div key={index} className="border-l-2 border-primary/40 pl-4 sm:pl-5 py-1">
              <h5 className="text-xs sm:text-sm font-semibold text-foreground mb-2">{item.title}</h5>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed mb-2">{item.description}</p>
              {item.benefit && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">혜택: {item.benefit}</p>
              )}
              {item.operation && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">운영: {item.operation}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 안내사항 */}
      <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-border">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {APPLICATION_FORM_CONFIG.ybCompletionRequirements.notice}
        </p>
      </div>
    </>
  );
};

export default YBContent;
