import Image from "next/image";

interface IResonsiveImageProps {
  src: string;
  alt: string;
}

export const ResponsiveImage: React.FC<IResonsiveImageProps> = ({
  src,
  alt,
}) => {
  return (
    <Image
      alt={alt}
      src={src}
      priority
      width={700}
      height={475}
      sizes="20vw"
      className="w-full h-auto max-h-[25rem] sm:min-h-[25rem] rounded-lg"
    />
  );
};
