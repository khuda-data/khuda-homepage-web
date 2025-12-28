import { LOCATION, FOOTER_INFO, FOOTER_STYLES, EXTERNAL_LINK_PROPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(FOOTER_STYLES.footer.base, FOOTER_STYLES.footer.padding)}>
      <div className={cn(FOOTER_STYLES.container.base, FOOTER_STYLES.container.padding)}>
        <div className={cn(FOOTER_STYLES.grid.base, FOOTER_STYLES.grid.gap)}>
          <div className={FOOTER_STYLES.layout.flexCol}>
            <p className={cn(FOOTER_STYLES.section.text.base, FOOTER_STYLES.section.spacing.marginBottom)}>
              {FOOTER_INFO.organization}
            </p>
            <p className={FOOTER_STYLES.section.text.base}>
              {FOOTER_INFO.description}
            </p>
            <p className={cn(FOOTER_STYLES.section.text.small, FOOTER_STYLES.section.spacing.marginTop)}>
              {FOOTER_INFO.copyright(currentYear)}
            </p>
          </div>

          <div>
            <h4 className={FOOTER_STYLES.section.header}>
              {FOOTER_INFO.sections.contact}
            </h4>
            <div className={FOOTER_STYLES.section.spacing.itemGap}>
              {FOOTER_INFO.socialLinks.map(({ id, label, href, icon: Icon }) => (
                <a
                  key={id}
                  href={href}
                  target={EXTERNAL_LINK_PROPS.target}
                  rel={EXTERNAL_LINK_PROPS.rel}
                  className={FOOTER_STYLES.socialLink.base}
                >
                  <div className={FOOTER_STYLES.socialLink.iconContainer}>
                    <Icon className={FOOTER_STYLES.socialLink.icon} />
                  </div>
                  <span className={FOOTER_STYLES.socialLink.label}>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={FOOTER_STYLES.section.header}>
              {FOOTER_INFO.sections.location}
            </h4>
            <div className={FOOTER_STYLES.section.spacing.itemGap}>
              <p className={FOOTER_STYLES.section.text.base}>{LOCATION.address}</p>
              <p className={FOOTER_STYLES.section.text.base}>{LOCATION.campus}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
