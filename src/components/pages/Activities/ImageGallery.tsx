interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => (
  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
    {images.map((img) => (
      <img
        key={img.src}
        src={img.src}
        alt={img.alt}
        className="rounded-xl h-44 sm:h-60 md:h-64 w-[72vw] sm:flex-1 sm:w-0 sm:min-w-0 flex-shrink-0 snap-start object-cover"
      />
    ))}
  </div>
);

export default ImageGallery;
