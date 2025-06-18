"use client";

export default function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`keen-slider__slide ${className}`}>{children}</div>;
}
