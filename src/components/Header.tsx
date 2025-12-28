import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection, IMAGE_PATHS, HEADER_CONFIG, HEADER_STYLES, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_CONFIG.scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (href: string) => {
    scrollToSection(href);
    setIsMobileMenuOpen(false);
  };

  // 네비게이션 링크 렌더링 컴포넌트
  const NavLinkButton = ({ 
    link, 
    className 
  }: { 
    link: typeof HEADER_CONFIG.navLinks[0]; 
    className?: string;
  }) => (
    <button
      onClick={() => handleScrollToSection(link.href)}
      className={className}
    >
      {link.label}
    </button>
  );

  return (
    <header
      className={cn(
        HEADER_STYLES.header.base,
        isScrolled ? HEADER_STYLES.header.scrolled : HEADER_STYLES.header.transparent
      )}
    >
      <div className={cn(HEADER_STYLES.container.base, HEADER_STYLES.container.padding)}>
        <div className={cn(HEADER_STYLES.wrapper.base, HEADER_STYLES.height.base)}>
          <Link to={ROUTES.home} className={HEADER_STYLES.logo.container}>
            <img 
              src={IMAGE_PATHS.logo} 
              alt={HEADER_CONFIG.logo.alt} 
              className={cn(HEADER_STYLES.logo.height, HEADER_STYLES.logo.width, HEADER_STYLES.logo.image)}
            />
          </Link>

          <nav className={HEADER_STYLES.nav.desktop.container}>
            {HEADER_CONFIG.navLinks.map((link) => (
              <NavLinkButton
                key={link.label}
                link={link}
                className={HEADER_STYLES.nav.desktop.link}
              />
            ))}
          </nav>

          <div className={HEADER_STYLES.button.desktop.container}>
            <Link to={ROUTES.apply}>
              <Button variant="default" size="default" className={HEADER_STYLES.button.desktop.apply}>
                {HEADER_CONFIG.applyButton.desktop}
              </Button>
            </Link>
          </div>

          <button
            className={HEADER_STYLES.button.mobile.menuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={HEADER_STYLES.icon.size} /> : <Menu size={HEADER_STYLES.icon.size} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={cn(HEADER_STYLES.height.mobileMenuOffset, HEADER_STYLES.nav.mobile.container)}>
            <nav className={HEADER_STYLES.nav.mobile.menu}>
              {HEADER_CONFIG.navLinks.map((link) => (
                <NavLinkButton
                  key={link.label}
                  link={link}
                  className={HEADER_STYLES.nav.mobile.link}
                />
              ))}
              <Link to={ROUTES.apply} className={HEADER_STYLES.nav.mobile.applyLink}>
                <Button variant="nav" size="default" className={HEADER_STYLES.button.mobile.apply}>
                  {HEADER_CONFIG.applyButton.mobile}
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
