import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Slider } from "@/types";

interface HeroCarouselProps {
  sliders: Slider[];
  loading?: boolean;
}

const INTERVAL = 5000;

export function HeroCarousel({ sliders, loading = false }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + sliders.length) % sliders.length);
    },
    [sliders.length]
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  useEffect(() => {
    if (sliders.length < 2) return;
    timerRef.current = setTimeout(() => go(index + 1, 1), INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, sliders.length, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (loading) {
    return (
      <>
        {/* Mobile: full-bleed rectangular skeleton */}
        <Skeleton className="h-[215px] w-full rounded-none sm:hidden" />
        {/* Desktop: contained with rounded corners */}
        <div className="mx-auto hidden max-w-7xl px-6 sm:block lg:px-8">
          <Skeleton className="h-[360px] w-full rounded-[2rem] lg:h-[420px]" />
        </div>
      </>
    );
  }

  if (!sliders.length) return null;

  const slide = sliders[index];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    /* Mobile: full-bleed, no rounding. Desktop: contained, rounded */
    <div
      className="relative h-[215px] overflow-hidden rounded-none sm:mx-auto sm:h-[clamp(200px,48vw,420px)] sm:max-w-7xl sm:rounded-[2rem] sm:px-6 sm:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] lg:px-8"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide._id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Lighter overlay on mobile so image stays dominant */}
          <div
            className="absolute inset-0"
            style={{
              background: slide.gradient
                ? slide.gradient.replace(/rgba\((\d+,\s*\d+,\s*\d+),\s*([\d.]+)\)/g, (_, rgb, a) =>
                    `rgba(${rgb},${Math.min(parseFloat(a), 0.55)})`
                  )
                : "linear-gradient(160deg, rgba(107,33,168,0.45) 0%, rgba(15,23,42,0.65) 100%)",
            }}
          />
          <div className="relative flex h-full flex-col justify-end p-4 text-white sm:p-10 lg:p-14">
            {slide.chip && (
              <span className="mb-2 inline-flex w-fit rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest backdrop-blur-sm sm:mb-3 sm:px-3 sm:py-1 sm:text-xs">
                {slide.chip}
              </span>
            )}
            <h1 className="max-w-2xl text-lg font-bold leading-tight sm:text-3xl lg:text-4xl">
              {slide.headline}
            </h1>
            {/* Subtext hidden on mobile — keeps hero clean */}
            {slide.subtext && (
              <p className="mt-2 hidden max-w-xl text-sm text-white/80 sm:block sm:text-base">
                {slide.subtext}
              </p>
            )}
            {slide.ctaText && slide.ctaLink && (
              <Button
                variant="secondary"
                asChild
                className="mt-3 w-fit rounded-full px-4 py-2 text-xs shadow-lg sm:mt-5 sm:px-6 sm:text-sm"
              >
                <Link to={slide.ctaLink}>{slide.ctaText}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next — desktop only */}
      {sliders.length > 1 && (
        <>
          <Button
            variant="icon"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="icon"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dot indicators */}
      {sliders.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
          {sliders.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
