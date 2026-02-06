import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { APPLICATION_FORM_CONFIG } from "@/lib/constants";

const YBODialogs = () => {
  const [isYBDialogOpen, setIsYBDialogOpen] = useState(false);
  const [isOBDialogOpen, setIsOBDialogOpen] = useState(false);

  return (
    <>
      {/* YB/OB 안내 버튼 */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8 sm:mb-12 mt-6 sm:mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsYBDialogOpen(true)}
          className="flex-1 rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-medium border-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 min-h-[44px]"
        >
          YB 수료 조건 안내
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOBDialogOpen(true)}
          className="flex-1 rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-medium border-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 min-h-[44px]"
        >
          OB 혜택 안내
        </Button>
      </div>

      {/* YB 수료 조건 안내 모달 */}
      <Dialog open={isYBDialogOpen} onOpenChange={setIsYBDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">
              {APPLICATION_FORM_CONFIG.ybCompletionRequirements.title}
            </DialogTitle>
            <DialogDescription className="text-base text-foreground mb-6">
              {APPLICATION_FORM_CONFIG.ybCompletionRequirements.intro}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* 수료 조건 */}
            <div className="space-y-4">
              {APPLICATION_FORM_CONFIG.ybCompletionRequirements.requirements.map((req, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 space-y-1">
                  <h4 className="font-semibold text-base">{req.title}</h4>
                  {req.period && (
                    <p className="text-sm text-muted-foreground">기간: {req.period}</p>
                  )}
                  <p className="text-sm text-foreground">{req.description}</p>
                  {req.obligation && (
                    <p className="text-sm text-muted-foreground">의무: {req.obligation}</p>
                  )}
                </div>
              ))}
            </div>

            {/* 안내사항 */}
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground">
                {APPLICATION_FORM_CONFIG.ybCompletionRequirements.notice}
              </p>
            </div>

            {/* 혜택 */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">{APPLICATION_FORM_CONFIG.ybCompletionRequirements.benefits.title}</h3>
              {APPLICATION_FORM_CONFIG.ybCompletionRequirements.benefits.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-base">{item.title}</h4>
                  <p className="text-sm text-foreground">{item.description}</p>
                  {item.benefit && (
                    <p className="text-sm text-muted-foreground">혜택: {item.benefit}</p>
                  )}
                  {item.operation && (
                    <p className="text-sm text-muted-foreground">운영: {item.operation}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OB 혜택 안내 모달 */}
      <Dialog open={isOBDialogOpen} onOpenChange={setIsOBDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">
              {APPLICATION_FORM_CONFIG.obBenefits.title}
            </DialogTitle>
            <DialogDescription className="text-base text-foreground mb-6">
              {APPLICATION_FORM_CONFIG.obBenefits.intro}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* 혜택 목록 */}
            <div className="space-y-4">
              {APPLICATION_FORM_CONFIG.obBenefits.benefits.map((benefit, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 space-y-1">
                  <h4 className="font-semibold text-base">{benefit.title}</h4>
                  <p className="text-sm text-foreground">{benefit.description}</p>
                  {benefit.feature && (
                    <p className="text-sm text-muted-foreground">특징: {benefit.feature}</p>
                  )}
                  {benefit.benefit && (
                    <p className="text-sm text-muted-foreground">혜택: {benefit.benefit}</p>
                  )}
                  {benefit.operation && (
                    <p className="text-sm text-muted-foreground">운영: {benefit.operation}</p>
                  )}
                  {benefit.purpose && (
                    <p className="text-sm text-muted-foreground">취지: {benefit.purpose}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default YBODialogs;
