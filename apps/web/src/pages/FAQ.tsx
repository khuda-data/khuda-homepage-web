import Header from "@/components/shared/Header";
import FAQSection from "@/components/pages/Recruiting/FAQSection";
import Footer from "@/components/shared/Footer";
import SEO from "@/components/shared/SEO";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="자주 묻는 질문 | KHUDA"
        description="KHUDA에 대해 자주 묻는 질문들을 모아두었습니다. 궁금한 점을 확인해보세요."
        path="/faq"
        noindex={true}
      />
      <Header />
      <main>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
