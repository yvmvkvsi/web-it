import { useLocale } from "../lib/locale";
import {
  imageFallback,
  imageFallbackSrcSet,
  imageSources,
  type MediaAsset,
} from "../content/media";
import ResponsiveImage from "./ResponsiveImage";

export interface MediaProps {
  asset: MediaAsset;
  /** The `sizes` contract for this placement. See `sizes` in content/media. */
  sizes: string;
  /** Only the homepage hero should be eager: it is the LCP element. */
  priority?: boolean;
  className?: string;
}

/**
 * Renders a manifest asset with its localised alternative text and its full
 * AVIF → WebP → JPEG source set. Intrinsic dimensions come from the manifest,
 * so layout space is always reserved and nothing shifts on load.
 */
export default function Media({
  asset,
  sizes,
  priority = false,
  className,
}: MediaProps) {
  const locale = useLocale();

  return (
    <ResponsiveImage
      className={className}
      src={imageFallback(asset)}
      srcSet={imageFallbackSrcSet(asset)}
      sizes={sizes}
      sources={imageSources(asset, sizes)}
      alt={asset.alt[locale]}
      width={asset.width}
      height={asset.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  );
}
