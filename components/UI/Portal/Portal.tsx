import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  selector: string;
}

export const Portal = ({ children, selector }: PortalProps) => {
  const ref = useRef<Element | DocumentFragment | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  if (ref.current == null) return null;

  return mounted ? createPortal(children, ref.current) : null;
};
