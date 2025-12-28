import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { CURRICULUM_INFO, CURRICULUM_STYLES, SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";

const CurriculumSection = () => {
  const defaultSessionType = CURRICULUM_STYLES.sessionTypes[0];
  const defaultTrack = CURRICULUM_INFO.tracks[0];
  const tracksLength = CURRICULUM_INFO.tracks.length;
  const trackLabels = CURRICULUM_INFO.tracks.map(t => t.label).join(CURRICULUM_STYLES.separator.trackLabels);
  
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

  // 공통 그라데이션 배경 컴포넌트
  const GradientBackground = () => (
    <>
      <div className={CURRICULUM_STYLES.gradient.background.layer1}></div>
      <div className={CURRICULUM_STYLES.gradient.background.layer2}></div>
    </>
  );

  // 네비게이션 버튼 컴포넌트
  const NavigationButton = ({ direction, className }: { direction: "prev" | "next"; className?: string }) => {
    const isPrev = direction === CURRICULUM_STYLES.navigation.direction.prev;
    const Icon = isPrev ? ChevronLeft : ChevronRight;
    const isSmall = className?.includes(CURRICULUM_STYLES.layout.mobileNavButton);
    const iconSize = isSmall 
      ? CURRICULUM_STYLES.navigation.button.icon.small 
      : CURRICULUM_STYLES.navigation.button.icon.medium;
    
    return (
      <button
        onClick={() => navigateTrack(direction)}
        className={cn(
          CURRICULUM_STYLES.navigation.button.base,
          className
        )}
      >
        <Icon className={cn(iconSize, CURRICULUM_STYLES.icon.white)} />
      </button>
    );
  };

  // 태그 렌더링 컴포넌트
  const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className={CURRICULUM_STYLES.tag.base}>{children}</span>
  );

  // 태그 리스트 렌더링 헬퍼 컴포넌트
  const TagList = ({ tags }: { tags: string[] }) => (
    <div className={CURRICULUM_STYLES.layout.tagContainer}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );

  // 섹션 헤더 렌더링 헬퍼 컴포넌트
  const SectionHeader = ({ title }: { title: string }) => (
    <div className={CURRICULUM_STYLES.spacing.contentGap}>
      <h4 className={CURRICULUM_STYLES.text.title.medium}>{title}</h4>
    </div>
  );

  // 프로젝트 카드 렌더링 헬퍼 컴포넌트
  const ProjectCard = ({ 
    title, 
    description, 
    tags 
  }: { 
    title: string; 
    description: string; 
    tags: string[] 
  }) => (
    <div className={CURRICULUM_STYLES.card.withHover.medium}>
      <h4 className={cn(CURRICULUM_STYLES.text.title.small, CURRICULUM_STYLES.spacing.contentGap)}>{title}</h4>
      <p className={cn(CURRICULUM_STYLES.text.body.small, CURRICULUM_STYLES.spacing.mediumGap)}>
        {description}
      </p>
      <TagList tags={tags} />
    </div>
  );

  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const isBasicSession = sessionType === defaultSessionType;

  // 컨테이너 래퍼 컴포넌트 (그라데이션 배경 포함)
  const ContainerWithGradient = ({ 
    className, 
    children 
  }: { 
    className?: string; 
    children: React.ReactNode 
  }) => (
    <div className={cn(CURRICULUM_STYLES.container.base, CURRICULUM_STYLES.container.padding, className)}>
      <GradientBackground />
      <div className={CURRICULUM_STYLES.layout.relativeZ10}>
        {children}
      </div>
    </div>
  );

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
                <div className={cn(CURRICULUM_STYLES.layout.grid2, CURRICULUM_STYLES.spacing.gridGap)}>
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
              <NavigationButton direction={CURRICULUM_STYLES.navigation.direction.prev} className={CURRICULUM_STYLES.layout.desktopNav} />

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
                            CURRICULUM_INFO.topicColors[topic.color],
                            CURRICULUM_STYLES.layout.borderWhite20
                          )}
                        >
                          {topic.title}
                        </div>
                      ))}
                    </div>
                  </div>

                <div className={CURRICULUM_STYLES.layout.mobileNav}>
                  <NavigationButton direction={CURRICULUM_STYLES.navigation.direction.prev} className={CURRICULUM_STYLES.layout.mobileNavButton} />
                  <NavigationButton direction={CURRICULUM_STYLES.navigation.direction.next} className={CURRICULUM_STYLES.layout.mobileNavButton} />
                </div>
              </ContainerWithGradient>

              <NavigationButton direction={CURRICULUM_STYLES.navigation.direction.next} className={CURRICULUM_STYLES.layout.desktopNav} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CurriculumSection;
