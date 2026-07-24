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
  /**
   * Marks the LCP image. Only one image per page should set it: the point of
   * a priority hint is to rank this fetch above the others, which it cannot do
   * if everything claims it.
   */
  priority?: boolean;
}

export default function ResponsiveImage({
  sources = [],
  priority = false,
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
      <img
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // Spelled lowercase deliberately. React 18 has no `fetchPriority`
        // property mapping, so the camelCase form is passed through verbatim
        // and warns on render; the lowercase attribute is the real one.
        {...(priority ? { fetchpriority: "high" } : {})}
        {...image}
      />
    </picture>
  );
}
