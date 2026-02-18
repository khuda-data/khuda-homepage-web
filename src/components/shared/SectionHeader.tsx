interface SectionHeaderProps {
  label: string;
  title: string;
}

const SectionHeader = ({ label, title }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6">
      <p className="text-blue-600 font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1.5 sm:mb-2 md:mb-3">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
