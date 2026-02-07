import { APPLICATION_FORM_CONFIG } from "@/lib/constants";

const YBContent = () => {
  return (
    <>
      {/* Intro */}
      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
        {APPLICATION_FORM_CONFIG.ybCompletionRequirements.intro}
      </p>

      {/* 수료 조건 */}
      <div className="space-y-3">
        {APPLICATION_FORM_CONFIG.ybCompletionRequirements.requirements.map((req, index) => (
          <div key={index} className="border-l-2 border-purple-400/50 pl-4">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-1">{req.title}</h4>
            {req.period && (
              <p className="text-xs sm:text-sm text-white/60 mb-1">기간: {req.period}</p>
            )}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{req.description}</p>
            {req.obligation && (
              <p className="text-xs sm:text-sm text-white/60 mt-1">의무: {req.obligation}</p>
            )}
          </div>
        ))}
      </div>

      {/* 이외 혜택 */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-3">
          {APPLICATION_FORM_CONFIG.ybCompletionRequirements.benefits.title}
        </h4>
        <div className="space-y-3">
          {APPLICATION_FORM_CONFIG.ybCompletionRequirements.benefits.items.map((item, index) => (
            <div key={index} className="border-l-2 border-purple-400/30 pl-4">
              <h5 className="text-xs sm:text-sm font-semibold text-white mb-1">{item.title}</h5>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{item.description}</p>
              {item.benefit && (
                <p className="text-xs sm:text-sm text-white/60 mt-1">혜택: {item.benefit}</p>
              )}
              {item.operation && (
                <p className="text-xs sm:text-sm text-white/60 mt-1">운영: {item.operation}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 안내사항 */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
          {APPLICATION_FORM_CONFIG.ybCompletionRequirements.notice}
        </p>
      </div>
    </>
  );
};

export default YBContent;
