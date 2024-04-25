import { useCallback, useRef, useState } from "react";

export const usePreviewMode = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const toggleMode = useCallback((expand: boolean) => {
    topRef.current?.scrollIntoView();
    setIsPreviewMode(expand);
  }, []);

  return {
    isPreviewMode,
    toggleMode,
    topRef,
  };
};
