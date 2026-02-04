import Header from "@/components/shared/Header";
import FAQSection from "@/components/shared/FAQSection";
import Footer from "@/components/shared/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
