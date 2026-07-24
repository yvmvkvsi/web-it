import type { ImgHTMLAttributes, SourceHTMLAttributes } from "react";

export interface ImageSource
  extends Pick<SourceHTMLAttributes<HTMLSourceElement>, "media" | "type"> {
  srcSet: string;
  sizes?: string;
}

export interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  src: string;
  alt: string;
  /**
   * Intrinsic pixel dimensions of the fallback file, not the CSS display size.
   * Required so the browser can reserve layout space before the image loads.
   */
  width: number;
  height: number;
  sources?: readonly ImageSource[];
}

export default function ResponsiveImage({
  sources = [],
  loading = "lazy",
  decoding = "async",
  ...image
}: ResponsiveImageProps) {
  return (
    <picture>
      {sources.map((source) => (
        <source
          key={`${source.media ?? "all"}:${source.type ?? "any"}:${source.srcSet}`}
          {...source}
        />
      ))}
      <img loading={loading} decoding={decoding} {...image} />
    </picture>
  );
}
