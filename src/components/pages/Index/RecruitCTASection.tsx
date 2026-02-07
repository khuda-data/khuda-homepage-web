import FlowingMenu from "@/components/FlowingMenu";
import { ROUTES } from "@/lib/constants";

const RecruitCTASection = () => {
  // 리크루팅 메뉴 아이템
  const menuItems = [
    {
      link: ROUTES.recruiting,
      text: "JOIN US !",
      marqueeText: "RECRUITING",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="relative h-16 sm:h-20">
        <FlowingMenu
          items={menuItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#000000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#000000"
          borderColor="#ffffff"
        />
      </div>
    </section>
  );
};

export default RecruitCTASection;
