interface SectionHeaderProps {
  label: string;
  title: string;
}

const SectionHeader = ({ label, title }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6">
      <p className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1.5 sm:mb-2 md:mb-3">
        {label}
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
