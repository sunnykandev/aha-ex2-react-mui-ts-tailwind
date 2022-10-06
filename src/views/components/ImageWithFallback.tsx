import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface ImageWithFallbackProps {
  src: string; // Source url of original image.
  fallbackSrc: string; // Alternative image source in the case it fails to load original image.
  alt?: string; // alt attribute of <img> tag.
  width?: number; // Specified width of image. default 100%
  height?: number; // Specified height of image. default auto
  ratio?: number; // Ratio of width and height in percentage (height/width*100)
  className?: string;
  style?: Record<string, unknown>;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  ratio,
  ...props
}: ImageWithFallbackProps) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const styles = {
    imageSkeletonRatio: {
      height: "0px",
      paddingBottom: `${ratio}%`,
    },
  };

  return (
    <div className="w-full">
      {loading && (
        <Skeleton
          style={ratio ? styles.imageSkeletonRatio : {}}
          animation="wave"
          width={width}
          height={height}
          component="div"
          sx={{ transform: "scale(1)" }}
        />
      )}
      <img
        src={src}
        onError={() => {
          // When it fails to load original image, replace the src.
          if (imgRef && imgRef.current) {
            imgRef.current.src = fallbackSrc;
          }
        }}
        alt={alt || src}
        ref={imgRef}
        onLoad={() => {
          setLoading(false);
        }}
        style={{ display: loading ? "none" : "block" }}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
