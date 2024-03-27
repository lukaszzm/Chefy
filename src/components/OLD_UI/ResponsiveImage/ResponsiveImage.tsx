import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
}

export const ResponsiveImage = ({ src, alt }: ResponsiveImageProps) => {
  return (
    <Image
      alt={alt}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88AkAArgB1ER6gHQAAAAASUVORK5CYII="
      className="h-auto max-h-[25rem] w-full rounded-lg sm:min-h-[25rem]"
      height={475}
      placeholder="blur"
      sizes="20vw"
      src={src}
      width={700}
      priority
    />
  );
};
