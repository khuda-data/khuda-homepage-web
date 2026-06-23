"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { IMAGE_PATHS, HEADER_CONFIG, HEADER_STYLES, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import RecruitmentBanner from "./RecruitmentBanner";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_CONFIG.scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 홈 페이지로 이동할 때 맨 위로 스크롤
    if (pathname === ROUTES.home) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  useEffect(() => {
    // 모바일 메뉴가 열렸을 때 body 스크롤 막기
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === ROUTES.home) {
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
    const isActive = pathname === link.href;

    return (
      <Link
        href={link.href}
        onClick={handleNavClick}
        className={cn(className, isActive && "nav-link-active")}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <header className={HEADER_STYLES.header.base}>
        {/* 흰색 네비 바. 하단 경계선을 여기에 둬서 아래 배너에는 흰 줄이 남지 않게 한다. */}
        <div className={HEADER_STYLES.header.scrolled}>
        <div className={cn(HEADER_STYLES.container.base, HEADER_STYLES.container.padding)}>
          <div className={cn(HEADER_STYLES.wrapper.base, HEADER_STYLES.height.base, "relative")}>
            <Link href={ROUTES.home} onClick={handleLogoClick} className={HEADER_STYLES.logo.container}>
              <img
                src={IMAGE_PATHS.logo}
                alt={HEADER_CONFIG.logo.alt}
                width={320}
                height={100}
                fetchPriority="high"
                loading="eager"
                className={cn(HEADER_STYLES.logo.height, HEADER_STYLES.logo.width, HEADER_STYLES.logo.image)}
              />
            </Link>

            <nav className={cn(HEADER_STYLES.nav.desktop.container, "ml-auto")}>
              {HEADER_CONFIG.navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  link={link}
                  className={HEADER_STYLES.nav.desktop.link}
                />
              ))}
              <Link
                href={ROUTES.recruiting}
                className={HEADER_STYLES.nav.desktop.link}
              >
                {HEADER_CONFIG.applyButton.desktop}
              </Link>
            </nav>

            <button
              className={cn(
                HEADER_STYLES.button.mobile.menuToggle,
                "ml-auto",
                "text-black"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={HEADER_STYLES.icon.size} /> : <Menu size={HEADER_STYLES.icon.size} />}
            </button>
          </div>
        </div>
        </div>
        <RecruitmentBanner />
      </header>

      {/* 전체 화면 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
          <button
            className="absolute top-4 right-6 text-white p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {HEADER_CONFIG.navLinks.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                className="text-white text-2xl font-semibold tracking-wide hover:opacity-70 transition-opacity duration-300"
              />
            ))}
            <Link
              href={ROUTES.recruiting}
              onClick={handleNavClick}
              className="text-white text-2xl font-semibold tracking-wide hover:opacity-70 transition-opacity duration-300"
            >
              {HEADER_CONFIG.applyButton.desktop}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
