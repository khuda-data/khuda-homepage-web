"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BYLAWS, type BylawArticle } from "@/lib/constants";

const ArticleBlock = ({ article }: { article: BylawArticle }) => (
  <div className="space-y-2">
    <h3 className="text-sm sm:text-base font-bold text-gray-900">
      {article.article} ({article.title})
    </h3>
    <ul className="space-y-2 pl-1">
      {article.items.map((item, index) => (
        <li key={index} className="flex gap-2 text-xs sm:text-sm md:text-base leading-relaxed text-gray-700 break-keep">
          <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-gray-900" />
          <div className="flex-1 space-y-1.5">
            <p>{item.text}</p>
            {item.sub && (
              <ol className="ml-1 list-decimal space-y-1 pl-4 text-gray-600 marker:text-gray-400">
                {item.sub.map((sub, subIndex) => (
                  <li key={subIndex} className="pl-1">
                    {sub}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const RulesSection = () => {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24">
        {/* 페이지 제목 + 밑줄 바 (하나로 묶어 같은 너비) */}
        <header className="inline-flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">KHUDA 회칙</h1>
          <div className="mt-3 sm:mt-4 h-1 w-full rounded-full bg-foreground" />
        </header>

        {/* 장 단위 아코디언 (다중 펼침, 얇은 구분선) */}
        <Accordion type="multiple" className="mt-10 sm:mt-14 md:mt-16 w-full border-t border-border">
          {BYLAWS.map((chapter) => (
            <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-border">
              <AccordionTrigger className="py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-bold text-gray-900 hover:no-underline">
                {chapter.chapter}
              </AccordionTrigger>
              <AccordionContent className="pb-5 sm:pb-6 md:pb-7 space-y-6 sm:space-y-7">
                {chapter.articles.map((article) => (
                  <ArticleBlock key={article.article} article={article} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default RulesSection;
