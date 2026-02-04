import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { scrollToSection, IMAGE_PATHS, HEADER_CONFIG, HEADER_STYLES, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_CONFIG.scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 홈 페이지로 이동할 때 맨 위로 스크롤
    if (location.pathname === ROUTES.home) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href === ROUTES.about) {
      if (location.pathname === ROUTES.home) {
        e?.preventDefault();
        scrollToSection("#about");
      } else {
        setTimeout(() => scrollToSection("#about"), 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === ROUTES.home) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // 카운트업 재시작 이벤트 발생
      window.dispatchEvent(new CustomEvent('countup-reset'));
    }
    setIsMobileMenuOpen(false);
  };

  // 네비게이션 링크 렌더링 컴포넌트
  const NavLink = ({ 
    link, 
    className 
  }: { 
    link: typeof HEADER_CONFIG.navLinks[0]; 
    className?: string;
  }) => {
    if (link.href === ROUTES.about) {
      return (
        <Link
          to={ROUTES.home}
          onClick={(e) => handleNavClick(link.href, e)}
          className={className}
        >
          {link.label}
        </Link>
      );
    }
    
    return (
      <Link
        to={link.href}
        onClick={() => handleNavClick(link.href)}
        className={className}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        HEADER_STYLES.header.base,
        isScrolled ? HEADER_STYLES.header.scrolled : HEADER_STYLES.header.transparent
      )}
    >
      <div className={cn(HEADER_STYLES.container.base, HEADER_STYLES.container.padding)}>
        <div className={cn(HEADER_STYLES.wrapper.base, HEADER_STYLES.height.base, "relative")}>
          <Link to={ROUTES.home} onClick={handleLogoClick} className={HEADER_STYLES.logo.container}>
            <img 
              src={IMAGE_PATHS.logo} 
              alt={HEADER_CONFIG.logo.alt} 
              className={cn(HEADER_STYLES.logo.height, HEADER_STYLES.logo.width, HEADER_STYLES.logo.image)}
            />
          </Link>

          <nav className={HEADER_STYLES.nav.desktop.container}>
            {HEADER_CONFIG.navLinks.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                className={HEADER_STYLES.nav.desktop.link}
              />
            ))}
          </nav>

          <button
            className={cn(HEADER_STYLES.button.mobile.menuToggle, "ml-auto")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={HEADER_STYLES.icon.size} /> : <Menu size={HEADER_STYLES.icon.size} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={cn(HEADER_STYLES.height.mobileMenuOffset, HEADER_STYLES.nav.mobile.container)}>
            <nav className={HEADER_STYLES.nav.mobile.menu}>
              {HEADER_CONFIG.navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  link={link}
                  className={HEADER_STYLES.nav.mobile.link}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
