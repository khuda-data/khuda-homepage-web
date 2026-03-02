interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => (
  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-x-visible scrollbar-hide">
    {images.map((img) => (
      <img
        key={img.src}
        src={img.src}
        alt={img.alt}
        className="rounded-xl h-44 sm:h-60 md:h-64 w-[72vw] sm:w-auto max-w-xs sm:max-w-none flex-shrink-0 snap-start object-cover"
      />
    ))}
  </div>
);

export default ImageGallery;
