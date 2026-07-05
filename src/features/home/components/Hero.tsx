import { HeroCarousel } from "./HeroCarousel";
import type { Slider } from "@/types";

interface HeroProps {
  sliders: Slider[];
  loading: boolean;
}

export function Hero({ sliders, loading }: HeroProps) {
  return <HeroCarousel sliders={sliders} loading={loading} />;
}
