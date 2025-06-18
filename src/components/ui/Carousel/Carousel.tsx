"use client";

import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Controls from "./Controls";
import Dots from "./Dots";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  interval?: number;
};

export default function Carousel({
  children,
  className = "",
  autoplay = true,
  interval = 3000,
}: CarouselProps) {
  const autoplayPlugin: KeenSliderPlugin = (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;
    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, interval);
    }
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const plugins = autoplay ? [autoplayPlugin] : [];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { origin: "center", perView: 1 },
      renderMode: "performance",
    },
    plugins
  );

  return (
    <div className="relative">
      <div ref={sliderRef} className={`keen-slider ${className}`}>{children}</div>
      <Controls instanceRef={instanceRef} />
      <Dots instanceRef={instanceRef} />
    </div>
  );
}
