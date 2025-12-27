import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Activities", href: "#curriculum" },
    { label: "Recruiting", href: "#recruiting" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/khuda-logo.png" 
              alt="KHUDA" 
              className="h-[50px] md:h-[60px] w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-sm tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/apply">
              <Button variant="nav" size="default" className="rounded-full px-6">
                지원하기
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
            <nav className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left py-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link to="/apply" className="mt-4">
                <Button variant="hero" className="w-full rounded-md">
                  지원하기
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
