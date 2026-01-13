import { useCallback, useRef, useState } from "react";

export function usePreviewMode() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const toggleMode = useCallback(() => {
    topRef.current?.scrollIntoView();
    setIsPreviewMode((prev) => !prev);
  }, []);

  return {
    isPreviewMode,
    toggleMode,
    topRef,
  };
}
