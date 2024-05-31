"use client";

import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ImageProps as NextImageProps } from "next/image";
import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import NextImage from "next/image";

export type ImageProps = Omit<NextImageProps, "src"> & {
  src: string | StaticImport | undefined | null;
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
