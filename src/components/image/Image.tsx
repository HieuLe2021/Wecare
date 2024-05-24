import type { ComponentProps, SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

export type ImageProps = ComponentProps<typeof Image> & {
  fallback?: string;
};
export const ImageWithFallback = ({
  fallback = "/placeholder-image.webp",
  alt,
  src,
  ...props
}: ImageProps) => {
  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      {...props}
    />
  );
};
