interface SectionHeaderProps {
  label: string;
  title: string;
}

const SectionHeader = ({ label, title }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-12 sm:mb-16 md:mb-20">
      <p className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3">
        {label}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
