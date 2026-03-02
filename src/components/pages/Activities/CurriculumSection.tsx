import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { CURRICULUM_INFO, CURRICULUM_STYLES, SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";

// ============================================================================
// 서브컴포넌트 (모듈 스코프에 정의하여 매 렌더 시 재생성 방지)
// ============================================================================

const GradientBackground = () => (
  <>
    <div className={CURRICULUM_STYLES.gradient.background.layer1}></div>
    <div className={CURRICULUM_STYLES.gradient.background.layer2}></div>
  </>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className={CURRICULUM_STYLES.tag.base}>{children}</span>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className={CURRICULUM_STYLES.layout.tagContainer}>
    {tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className={CURRICULUM_STYLES.spacing.contentGap}>
    <h4 className={CURRICULUM_STYLES.text.title.medium}>{title}</h4>
  </div>
);

const ProjectCard = ({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: string[];
}) => (
  <div className={CURRICULUM_STYLES.card.withHover.medium}>
    <h4 className={cn(CURRICULUM_STYLES.text.title.small, CURRICULUM_STYLES.spacing.contentGap)}>{title}</h4>
    <p className={cn(CURRICULUM_STYLES.text.body.small, CURRICULUM_STYLES.spacing.mediumGap)}>
      {description}
    </p>
    <TagList tags={tags} />
  </div>
);

const ContainerWithGradient = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn(CURRICULUM_STYLES.container.base, CURRICULUM_STYLES.container.padding, className)}>
    <GradientBackground />
    <div className={CURRICULUM_STYLES.layout.relativeZ10}>
      {children}
    </div>
  </div>
);

interface NavigationButtonProps {
  direction: "prev" | "next";
  className?: string;
  onNavigate: (direction: "prev" | "next") => void;
}

const NavigationButton = ({ direction, className, onNavigate }: NavigationButtonProps) => {
  const isPrev = direction === CURRICULUM_STYLES.navigation.direction.prev;
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const isSmall = className?.includes(CURRICULUM_STYLES.layout.mobileNavButton);
  const iconSize = isSmall
    ? CURRICULUM_STYLES.navigation.button.icon.small
    : CURRICULUM_STYLES.navigation.button.icon.medium;

  return (
    <button
      onClick={() => onNavigate(direction)}
      className={cn(CURRICULUM_STYLES.navigation.button.base, className)}
    >
      <Icon className={cn(iconSize, CURRICULUM_STYLES.icon.white)} />
    </button>
  );
};

// ============================================================================
// 메인 컴포넌트
// ============================================================================

const CurriculumSection = () => {
  const defaultSessionType = CURRICULUM_STYLES.sessionTypes[0];
  const defaultTrack = CURRICULUM_INFO.tracks[0];
  const tracksLength = CURRICULUM_INFO.tracks.length;

  const getTrackLabel = (id: string) => CURRICULUM_INFO.tracks.find(t => t.id === id)?.label || "";
  const trackLabels = [
    getTrackLabel("de"),
    getTrackLabel("da"),
    getTrackLabel("nlp"),
    getTrackLabel("cv"),
    getTrackLabel("aie"),
    getTrackLabel("fin"),
  ].join(CURRICULUM_STYLES.separator.trackLabels);

  const [sessionType, setSessionType] = useState<"basic" | "advanced">(defaultSessionType);
  const [activeTrack, setActiveTrack] = useState(defaultTrack.id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentTrack = CURRICULUM_INFO.tracks.find(track => track.id === activeTrack) || defaultTrack;

  const handleTrackChange = (newTrackId: string) => {
    if (newTrackId === activeTrack || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTrack(newTrackId);
      setTimeout(() => setIsTransitioning(false), CURRICULUM_STYLES.transition.delay.reset);
    }, CURRICULUM_STYLES.transition.delay.change);
  };

  const navigateTrack = (direction: "prev" | "next") => {
    const currentIndex = CURRICULUM_INFO.tracks.findIndex(t => t.id === activeTrack);
    const isPrev = direction === CURRICULUM_STYLES.navigation.direction.prev;
    const lastIndex = tracksLength - 1;
    const newIndex = isPrev
      ? (currentIndex > CURRICULUM_STYLES.index.first ? currentIndex - 1 : lastIndex)
      : (currentIndex < lastIndex ? currentIndex + 1 : CURRICULUM_STYLES.index.first);
    handleTrackChange(CURRICULUM_INFO.tracks[newIndex].id);
  };

  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const isBasicSession = sessionType === defaultSessionType;

  return (
    <section
      id={CURRICULUM_STYLES.sectionId}
      ref={ref}
      className={cn(
        CURRICULUM_STYLES.section.padding,
        CURRICULUM_STYLES.section.base,
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={CURRICULUM_STYLES.gradient.overlay} />

      <div className={SECTION_STYLES.container.base}>
        <div className={CURRICULUM_STYLES.spacing.sectionGap}>
          <h2 className={cn(CURRICULUM_STYLES.header.title, CURRICULUM_STYLES.spacing.titleGap)}>
            {isBasicSession
              ? CURRICULUM_INFO.basicSessionTitle
              : CURRICULUM_INFO.advancedSessionTitle(tracksLength)}
          </h2>
          <p className={cn(CURRICULUM_STYLES.header.subtitle, CURRICULUM_STYLES.spacing.sectionGap)}>
            {isBasicSession
              ? CURRICULUM_INFO.basicSessionDescription
              : CURRICULUM_INFO.advancedSessionDescription(tracksLength)}
          </p>
        </div>

        <div className={cn(CURRICULUM_STYLES.layout.flex, CURRICULUM_STYLES.spacing.buttonGap, CURRICULUM_STYLES.spacing.sectionGap)}>
          {CURRICULUM_STYLES.sessionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSessionType(type)}
              className={cn(
                CURRICULUM_STYLES.button.base,
                sessionType === type
                  ? CURRICULUM_STYLES.button.active
                  : CURRICULUM_STYLES.button.inactive
              )}
            >
              {CURRICULUM_STYLES.sessionLabels[type]}
            </button>
          ))}
        </div>

        {isBasicSession ? (
          <ContainerWithGradient className={CURRICULUM_STYLES.layout.relative}>
            <div className={CURRICULUM_STYLES.spacing.largeGap}>
              <h3 className={cn(CURRICULUM_STYLES.text.title.large, CURRICULUM_STYLES.spacing.contentGap)}>
                {CURRICULUM_INFO.basicTrackTitle}
              </h3>
              <p className={CURRICULUM_STYLES.text.body.medium}>
                {CURRICULUM_INFO.basicTrackDescription}
              </p>
            </div>

            <div className={CURRICULUM_STYLES.spacing.sectionGap}>
              <SectionHeader title={CURRICULUM_INFO.weeklySessionTitle} />
              <div className="w-full">
                {CURRICULUM_INFO.weeklySessions.map((session) => (
                  <div key={session.title} className={CURRICULUM_STYLES.card.withHover.medium}>
                    <div className={cn(CURRICULUM_STYLES.layout.flexItemsCenter, CURRICULUM_STYLES.spacing.contentGap)}>
                      <h5 className={CURRICULUM_STYLES.text.title.small}>{session.title}</h5>
                      <span className={CURRICULUM_STYLES.text.body.duration}>{session.duration}</span>
                    </div>
                    <p className={cn(CURRICULUM_STYLES.text.body.small, CURRICULUM_STYLES.spacing.contentGap)}>
                      {session.description}
                    </p>
                    <TagList tags={session.topics} />
                  </div>
                ))}
              </div>
            </div>

            <div className={CURRICULUM_STYLES.spacing.sectionGap}>
              <SectionHeader title={CURRICULUM_INFO.detailActivitiesTitle} />
              <div className={cn(CURRICULUM_STYLES.layout.grid3, CURRICULUM_STYLES.spacing.gridGap)}>
                {CURRICULUM_INFO.activities.map((activity) => (
                  <div key={activity.title} className={cn(CURRICULUM_STYLES.card.base, CURRICULUM_STYLES.card.padding.small)}>
                    <h5 className={cn(CURRICULUM_STYLES.text.title.small, CURRICULUM_STYLES.spacing.smallGap)}>{activity.title}</h5>
                    <p className={CURRICULUM_STYLES.text.body.tiny}>
                      {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(CURRICULUM_STYLES.layout.grid2, CURRICULUM_STYLES.spacing.gridGap)}>
              <ProjectCard
                title={CURRICULUM_INFO.toyProject.title}
                description={CURRICULUM_INFO.toyProject.description}
                tags={CURRICULUM_INFO.toyProject.tags}
              />
              <ProjectCard
                title={CURRICULUM_INFO.trackBriefing.title}
                description={CURRICULUM_INFO.trackBriefing.description(
                  CURRICULUM_INFO.trackInfoWeeks,
                  trackLabels
                )}
                tags={CURRICULUM_INFO.trackBriefing.tags(tracksLength)}
              />
            </div>
          </ContainerWithGradient>
        ) : (
          <>
            <div className={cn(CURRICULUM_STYLES.layout.flexWrap, CURRICULUM_STYLES.spacing.trackGap, CURRICULUM_STYLES.spacing.sectionGap)}>
              {CURRICULUM_INFO.tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={cn(
                    CURRICULUM_STYLES.button.track.base,
                    activeTrack === track.id
                      ? CURRICULUM_STYLES.button.track.active
                      : CURRICULUM_STYLES.button.track.inactive
                  )}
                >
                  {track.title}
                </button>
              ))}
            </div>

            <div className={CURRICULUM_STYLES.layout.relativeFlex}>
              <NavigationButton
                direction={CURRICULUM_STYLES.navigation.direction.prev}
                className={CURRICULUM_STYLES.layout.desktopNav}
                onNavigate={navigateTrack}
              />

              <ContainerWithGradient className={CURRICULUM_STYLES.layout.relativeFlex1}>
                <div className={cn(
                  CURRICULUM_STYLES.layout.flexRow,
                  isTransitioning ? CURRICULUM_STYLES.transition.inactive : CURRICULUM_STYLES.transition.active
                )}>
                  <div className={CURRICULUM_STYLES.layout.flex1}>
                    <div className={CURRICULUM_STYLES.spacing.mediumGap}>
                      <span className={CURRICULUM_STYLES.badge.base}>
                        {currentTrack.label}
                      </span>
                      <h3 className={cn(CURRICULUM_STYLES.text.title.large, CURRICULUM_STYLES.spacing.mediumGap)}>
                        {currentTrack.title}
                      </h3>
                    </div>
                    <p className={CURRICULUM_STYLES.text.body.large}>
                      {currentTrack.description}
                    </p>
                  </div>

                  <div className={CURRICULUM_STYLES.layout.flexColCenter}>
                    {currentTrack.topics.map((topic, index) => (
                      <div
                        key={`${currentTrack.id}-${index}`}
                        className={cn(
                          CURRICULUM_STYLES.topicCard.base,
                          CURRICULUM_INFO.topicColors[topic.color]
                        )}
                      >
                        {topic.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={CURRICULUM_STYLES.layout.mobileNav}>
                  <NavigationButton
                    direction={CURRICULUM_STYLES.navigation.direction.prev}
                    className={CURRICULUM_STYLES.layout.mobileNavButton}
                    onNavigate={navigateTrack}
                  />
                  <NavigationButton
                    direction={CURRICULUM_STYLES.navigation.direction.next}
                    className={CURRICULUM_STYLES.layout.mobileNavButton}
                    onNavigate={navigateTrack}
                  />
                </div>
              </ContainerWithGradient>

              <NavigationButton
                direction={CURRICULUM_STYLES.navigation.direction.next}
                className={CURRICULUM_STYLES.layout.desktopNav}
                onNavigate={navigateTrack}
              />
            </div>

            {/* 정기 학술제 섹션 */}
            <div className="mt-12">
              <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-white/50 to-white/40 mx-auto mb-8"></div>

              <div className={CURRICULUM_STYLES.layout.relativeFlex}>
                <div className="hidden md:flex w-12 h-12 flex-shrink-0"></div>

                <ContainerWithGradient className={CURRICULUM_STYLES.layout.relativeFlex1}>
                  <div className="space-y-6">
                    <div className="flex flex-col items-center text-center space-y-4 pb-2 w-full">
                      <div className="flex items-center gap-2 text-white/70">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30"></div>
                        <span className="text-xs font-medium uppercase tracking-wider">학기 말 최종 프로젝트</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30"></div>
                      </div>
                      <h3 className={cn(CURRICULUM_STYLES.text.title.large, "bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent w-full")}>
                        {CURRICULUM_INFO.academicFestival.title}
                      </h3>
                      <p className={cn(CURRICULUM_STYLES.text.body.medium, "text-muted-foreground w-full")}>
                        {CURRICULUM_INFO.academicFestival.subtitle}
                      </p>
                      <p className={cn(CURRICULUM_STYLES.text.body.small, "text-foreground/80 leading-relaxed w-full max-w-3xl")}>
                        {CURRICULUM_INFO.academicFestival.description}
                      </p>
                    </div>

                    <div className={cn(CURRICULUM_STYLES.card.base, CURRICULUM_STYLES.card.padding.medium, CURRICULUM_STYLES.card.hover)}>
                      <div>
                        <h4 className={cn(CURRICULUM_STYLES.text.title.small, CURRICULUM_STYLES.spacing.smallGap, "text-white")}>
                          {CURRICULUM_INFO.academicFestival.participation.title}
                        </h4>
                        <p className="text-sm text-white/95 leading-relaxed">
                          {CURRICULUM_INFO.academicFestival.participation.description}
                        </p>
                      </div>
                    </div>

                    <div className={cn(CURRICULUM_STYLES.layout.grid2, "gap-4 md:gap-6")}>
                      <div className={cn(CURRICULUM_STYLES.card.base, CURRICULUM_STYLES.card.padding.medium, CURRICULUM_STYLES.card.hover, "h-full flex flex-col")}>
                        <h4 className={cn(CURRICULUM_STYLES.text.title.small, "mb-4 text-white")}>
                          {CURRICULUM_INFO.academicFestival.posterPresentation.title}
                        </h4>
                        <p className={cn("text-sm text-white/95 leading-relaxed flex-1 mb-4", CURRICULUM_STYLES.spacing.mediumGap)}>
                          {CURRICULUM_INFO.academicFestival.posterPresentation.description}
                        </p>
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 mt-auto">
                          <Info className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
                          <p className="text-xs text-blue-100 leading-relaxed">
                            {CURRICULUM_INFO.academicFestival.posterPresentation.purpose}
                          </p>
                        </div>
                      </div>

                      <div className={cn(CURRICULUM_STYLES.card.base, CURRICULUM_STYLES.card.padding.medium, CURRICULUM_STYLES.card.hover, "h-full flex flex-col")}>
                        <h4 className={cn(CURRICULUM_STYLES.text.title.small, "mb-4 text-white")}>
                          {CURRICULUM_INFO.academicFestival.formalPresentation.title}
                        </h4>
                        <p className={cn("text-sm text-white/95 leading-relaxed flex-1 mb-4", CURRICULUM_STYLES.spacing.mediumGap)}>
                          {CURRICULUM_INFO.academicFestival.formalPresentation.description}
                        </p>
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/20 border border-primary/30 mt-auto">
                          <Info className="w-4 h-4 text-primary/90 mt-0.5 shrink-0" />
                          <p className="text-xs text-white/90 leading-relaxed">
                            {CURRICULUM_INFO.academicFestival.formalPresentation.purpose}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ContainerWithGradient>

                <div className="hidden md:flex w-12 h-12 flex-shrink-0"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurriculumSection;
