"use client";

import { useEffect, useRef, useState } from "react";
import LoadingSkeleton from './GuideFlowSkeleton'

interface GuideFlowProps {
  flowId: string;
  className?: string;
}

export default function GuideFlow({ flowId, className }: GuideFlowProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleResize = (e: MessageEvent) => {
      if (
        e.data &&
        typeof e.data === "object" &&
        e.data.type === "guideflow:resize" &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${e.data.height}px`;
      }
    };

    window.addEventListener("message", handleResize);
    return () => window.removeEventListener("message", handleResize);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9.5] md:aspect-video">
      {!hasLoaded && <LoadingSkeleton />}

      <iframe
        ref={iframeRef}
        src={`https://app.guideflow.com/embed/${flowId}`}
        className={`border-gray-100 object-cover w-[91%] mx-auto h-full rounded-lg ${className}`}
        style={{
          display: hasLoaded ? "block" : "none"
        }}
        allow="clipboard-read; clipboard-write"
        allowFullScreen
        scrolling="no"
        title={`GuideFlowID-${flowId}`}
        onLoad={() => setHasLoaded(true)}
      />
    </div>
  );
}
