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
    <section className="relative w-full overflow-hidden pb-8 sm:pb-12 md:pb-16">
      <div style={{ height: "80px", position: "relative" }}>
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
