import Header from "@/components/Header";
import RecruitingSection from "@/components/RecruitingSection";
import UnifiedActionButton from "@/components/UnifiedActionButton";
import Footer from "@/components/Footer";
import { SECTION_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Recruiting = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <RecruitingSection />
        <section className={cn(SECTION_STYLES.section.base, "py-16 sm:py-20 md:py-24")}>
          <div className={SECTION_STYLES.container.base}>
            <div className="flex flex-col items-center justify-center gap-6">
              <UnifiedActionButton size="lg" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Recruiting;
