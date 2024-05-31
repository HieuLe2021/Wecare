"use client";

import type { ComponentProps, SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import NextImage from "next/image";

export type ImageProps = ComponentProps<typeof NextImage> & {
  src: string | undefined;
  fallback?: string;
};
export const Image = ({
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
    <NextImage
      alt={alt}
      onError={setError}
      src={error || !src ? fallback : src}
      {...props}
    />
  );
};
