import ReactPlayer from 'react-player';
import React, { useState, useRef, useEffect } from "react";
import LoadingSkeletonImage from '@/app/components/modules/media/carousel/embla/CarouselSkeleton'

const VideoPlayer = ({
  src,
  playing = false,
  controls = true,
  loop = false,
  volume = 0.8,
  muted = false,
  style = {},
  className = ""
}) => {
  const isMp4 = src?.endsWith(".mp4");
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div className={`w-full overflow-hidden aspect-video rounded-lg ${className}`}>
      {!hasLoaded && <LoadingSkeletonImage/>}
      {hasLoaded && 
        <ReactPlayer
        url={src}
        playing={playing}
        controls={controls}
        loop={loop}
        volume={volume}
        muted={muted}
        width="100%"
        height="100%"
        playsinline
        onReady={() => setHasLoaded(true)}
        style={{ pointerEvents: "auto", ...style }}
        config={{
          file: {
            attributes: {
              controls,
              playsInline: true,
            }
          }
        }}
      />
      }
    </div>
  );
};

export default VideoPlayer;
