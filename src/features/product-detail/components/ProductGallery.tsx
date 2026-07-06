import { useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProductDetailContext } from "../hooks/useProductDetailContext";

export function ProductGallery() {
  const { product, images, selectedImageIndex, setSelectedImageIndex } =
    useProductDetailContext();
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (!images.length) return;
      setSelectedImageIndex(Math.max(0, Math.min(images.length - 1, index)));
    },
    [images.length, setSelectedImageIndex]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(selectedImageIndex + (diff > 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  if (!product) return null;

  const activeImage = images[selectedImageIndex];

  return (
    <div className="space-y-3">
      <div
        className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:aspect-[3/2] lg:max-h-[380px] lg:rounded-3xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          {activeImage ? (
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={product.name}
              loading="eager"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full object-cover transition-transform duration-500 lg:group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 text-sm text-slate-400">
              {product.categoryName}
            </div>
          )}
        </AnimatePresence>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-violet-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === selectedImageIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="hidden gap-2 lg:flex">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              aria-label={`View image ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "aspect-square w-16 overflow-hidden rounded-xl border-2 transition",
                i === selectedImageIndex
                  ? "border-violet-600 ring-2 ring-violet-100"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              )}
            >
              <img
                src={img}
                alt=""
                loading={i === selectedImageIndex ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
