import { Instagram, Link2, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/khu_da.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Instagram className="w-4 h-4 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm">@khu_da.official</span>
              </a>
              <a
                href="https://linktr.ee/khuda_data"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Link2 className="w-4 h-4 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm">Linktree</span>
              </a>
              <a
                href="https://github.com/khuda-data"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Github className="w-4 h-4 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm">KHUDA Github</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Location</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
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
