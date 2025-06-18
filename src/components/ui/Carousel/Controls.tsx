"use client";

import { KeenSliderInstance } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Controls({ instanceRef }: { instanceRef: KeenSliderInstance | null }) {
  if (!instanceRef) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
      <button
        className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow ml-2"
        aria-label="Previous slide"
        onClick={(e) => {
          e.stopPropagation();
          instanceRef.prev();
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow mr-2"
        aria-label="Next slide"
        onClick={(e) => {
          e.stopPropagation();
          instanceRef.next();
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
