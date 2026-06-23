import { FOOTER_INFO, FOOTER_STYLES, EXTERNAL_LINK_PROPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(FOOTER_STYLES.footer.base, FOOTER_STYLES.footer.padding)}>
      <div className={cn(FOOTER_STYLES.container.base, FOOTER_STYLES.container.padding)}>
        <div className={cn(FOOTER_STYLES.grid.base, FOOTER_STYLES.grid.gap)}>
          <div className={FOOTER_STYLES.layout.flexCol}>
            <p className={FOOTER_STYLES.section.organization}>
              {FOOTER_INFO.organization}
            </p>
            <p className={cn(FOOTER_STYLES.section.text.base, "mt-3 sm:mt-4")}>
              {FOOTER_INFO.description}
            </p>
            <p className={cn(FOOTER_STYLES.section.text.small, FOOTER_STYLES.section.spacing.marginTop)}>
              {FOOTER_INFO.copyright(currentYear)}
            </p>
          </div>

          <div className={FOOTER_STYLES.rightGroup.container}>
            <div className={FOOTER_STYLES.middleSection.container}>
              <h4 className={FOOTER_STYLES.section.header}>
                {FOOTER_INFO.sections.location}
              </h4>
              <div className={FOOTER_STYLES.section.spacing.itemGap}>
                <p className={FOOTER_STYLES.section.text.base}>{FOOTER_INFO.location.address}</p>
                <p className={FOOTER_STYLES.section.text.base}>{FOOTER_INFO.location.building}</p>
              </div>
            </div>

            <div className={FOOTER_STYLES.rightSection.container}>
              <h4 className={FOOTER_STYLES.section.header}>
                {FOOTER_INFO.sections.contact}
              </h4>
              <div className={FOOTER_STYLES.socialLinks.container}>
                {FOOTER_INFO.socialLinks.map(({ id, href, icon: Icon }) => (
                  <a
                    key={id}
                    href={href}
                    target={EXTERNAL_LINK_PROPS.target}
                    rel={EXTERNAL_LINK_PROPS.rel}
                    className={FOOTER_STYLES.socialLinks.link}
                    aria-label={id}
                  >
                    <Icon className={FOOTER_STYLES.socialLinks.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
