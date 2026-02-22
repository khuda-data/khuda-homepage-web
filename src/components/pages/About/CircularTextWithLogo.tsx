interface CircularTextWithLogoProps {
  className?: string;
}

const CircularTextWithLogo = ({
  className = "",
}: CircularTextWithLogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/images/logos/khuda-ico.png"
        alt="KHUDA Logo"
        className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
      />
    </div>
  );
};

export default CircularTextWithLogo;
