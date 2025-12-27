import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center">
                <span className="text-lg font-bold">K</span>
              </div>
              <span className="text-xl font-bold">KHUDA</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              경희대학교 AI/빅데이터 연합동아리
            </p>
            <p className="text-muted-foreground text-sm">
              KHUDA와 함께, 당신의 성장을 설계하는 여정을 시작하세요.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-6">
              Copyright © 2025 KHUDA. All Rights Reserved.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:khuda.official@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">khuda.official@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/khuda_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm">@khuda_official</span>
              </a>
              <a
                href="https://open.kakao.com/o/gKHUDA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">카카오톡 문의</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Location</h4>
            <p className="text-muted-foreground text-sm">
              서울특별시 동대문구 경희대로 26<br />
              경희대학교
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex justify-center gap-6">
            <a
              href="https://instagram.com/khuda_official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:khuda.official@gmail.com"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
