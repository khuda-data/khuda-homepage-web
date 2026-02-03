import Header from "@/components/Header";
import SponsorSection from "@/components/SponsorSection";
import Footer from "@/components/Footer";

const Sponsor = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SponsorSection variant="detailed" />
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
