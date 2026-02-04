import Header from "@/components/shared/Header";
import SponsorSection from "@/components/pages/Sponsor/SponsorSection";
import Footer from "@/components/shared/Footer";

const Sponsor = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SponsorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
