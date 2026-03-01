import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  formula: string;
  block?: boolean;
  className?: string;
}

export function MathRenderer({ formula, block = false, className }: MathRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
        displayMode: block,
      });
    }
  }, [formula, block]);

  return <span ref={containerRef} className={className} />;
}
