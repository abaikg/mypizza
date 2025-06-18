"use client";

import { KeenSliderInstance } from "keen-slider/react";
import { useEffect, useState } from "react";

export default function Dots({ instanceRef }: { instanceRef: KeenSliderInstance | null }) {
  const [current, setCurrent] = useState(0);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (!instanceRef) return;
    setDots(instanceRef.track.details.slides.length);
    instanceRef.on("slideChanged", (s) => {
      setCurrent(s.track.details.rel);
    });
  }, [instanceRef]);

  if (!instanceRef) return null;

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: dots }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => instanceRef.moveToIdx(idx)}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            current === idx ? "bg-pink-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
