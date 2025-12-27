import { Link } from "react-router-dom";
import { Instagram, Link2, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-sm mb-4">
              경희대학교 데이터분석/AI 학회
            </p>
            <p className="text-muted-foreground text-sm">
              데이터와 AI로 미래를 만들어가는 KHUDA와 함께하세요.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-6">
              Copyright © 2025 KHUDA. All Rights Reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/khu_da.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm">@khu_da.official</span>
              </a>
              <a
                href="https://linktr.ee/khuda_data"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link2 className="w-4 h-4" />
                <span className="text-sm">Linktree</span>
              </a>
              <a
                href="https://github.com/khuda-data"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">KHUDA Github</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Location</h4>
            <p className="text-muted-foreground text-sm">
              경기도 용인시 기흥구 덕영대로 1732<br />
              경희대학교 국제캠퍼스
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
