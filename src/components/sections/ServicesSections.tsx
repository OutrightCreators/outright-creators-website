"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  X,
  Play,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ServiceSection, ShowcaseItem } from "../data/service";

const typeLabel: Record<ShowcaseItem["type"], string> = {
  video: "Video",
  image: "Image",
  pdf: "PDF",
  logo: "Brand Asset",
};

const typeBadgeStyle: Record<ShowcaseItem["type"], string> = {
  video: "bg-rose-50 text-rose-600 border-rose-100",
  image: "bg-sky-50 text-sky-600 border-sky-100",
  pdf: "bg-amber-50 text-amber-600 border-amber-100",
  logo: "bg-violet-50 text-violet-600 border-violet-100",
};

const CARD_W = 380;
const CARD_H = 480;
const GAP = 20;

function CarouselCard({
  asset,
  onClick,
}: {
  asset: ShowcaseItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/card relative h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-lg"
    >
      {asset.thumbnail && (
        <Image
          src={asset.thumbnail}
          alt="Showcase item"
          fill
          sizes="380px"
          loading="eager"
          className="pointer-events-none object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />

      {asset.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/30">
            <Play className="h-6 w-6 translate-x-0.5 text-gray-900" />
          </div>
        </div>
      )}

      {asset.type === "image" && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/30">
            <ZoomIn className="h-5 w-5 text-gray-900" />
          </div>
        </div>
      )}

      {(asset.type === "pdf" || asset.type === "logo") && (
        <div className="absolute top-4 right-4 translate-y-1 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
            <ArrowUpRight className="h-4 w-4 text-gray-700" />
          </div>
        </div>
      )}
    </button>
  );
}

export default function PremiumServiceSections({
  section,
}: {
  section: ServiceSection;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [viewportW, setViewportW] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxOpenRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const items = section.assets;
  const total = items.length;
  const step = CARD_W + GAP;

  const trackX = useRef(0);
  const targetX = useRef(0);
  const virtualIndexRef = useRef(0);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, trackX: 0 });

  const getTrackXForIndex = useCallback(
    (idx: number) => {
      return viewportW / 2 - idx * step - CARD_W / 2;
    },
    [viewportW, step],
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (lightboxOpenRef.current) {
        lightboxOpenRef.current = false;
        setLightboxIndex(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setViewportW(w);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Sync starting coordinates upon viewport calculation
  useEffect(() => {
    if (viewportW > 0) {
      const initialX = getTrackXForIndex(0);
      trackX.current = initialX;
      targetX.current = initialX;
      virtualIndexRef.current = 0;
    }
  }, [viewportW, getTrackXForIndex]);

  // Infinite coordinate math processing frame loop
  useEffect(() => {
    let animFrameId: number;

    const loop = () => {
      if (viewportW <= 0 || total === 0) {
        animFrameId = requestAnimationFrame(loop);
        return;
      }

      const center = viewportW / 2;
      const maxTrackWidth = total * step;
      const halfTrack = maxTrackWidth / 2;

      // Smoothly slide track toward target calculations
      if (!dragging.current) {
        trackX.current += (targetX.current - trackX.current) * 0.12;
      }

      // Track down precise active central focus element mapping
      const exactIndex = (center - trackX.current - CARD_W / 2) / step;
      const roundedIndex = Math.round(exactIndex);
      const computedActiveIdx = ((roundedIndex % total) + total) % total;

      setActiveIndex(computedActiveIdx);

      // Realtime seamless translation wrap mapping for absolute loop illusion
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = i * step + CARD_W / 2 + trackX.current;
        let offset = cardCenter - center;

        // Mathematical coordinate wrapping boundary formulas
        const wrappedOffset =
          ((((offset + halfTrack) % maxTrackWidth) + maxTrackWidth) %
            maxTrackWidth) -
          halfTrack;
        const shift = wrappedOffset - offset;

        // Visual depth calculations based on relative focal distance from layout viewport center
        const normalizedDist = Math.abs(wrappedOffset / step);
        const currentScale = Math.max(0.93, 1 - normalizedDist * 0.07);
        const currentOpacity = Math.max(0.55, 1 - normalizedDist * 0.45);

        card.style.transform = `translateX(${shift}px) scale(${currentScale})`;
        card.style.opacity = String(currentOpacity);
        card.style.zIndex = String(100 - Math.round(normalizedDist * 10));
      });

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${trackX.current}px)`;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [viewportW, total, step]);

  // Pointer interactions handling mechanics
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStart.current = {
      x: e.clientX,
      trackX: trackX.current,
    };

    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - dragStart.current.x;
    trackX.current = dragStart.current.trackX + deltaX;
    targetX.current = trackX.current;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";

    const center = viewportW / 2;
    const exactIndex = (center - trackX.current - CARD_W / 2) / step;
    const roundedIndex = Math.round(exactIndex);

    virtualIndexRef.current = roundedIndex;
    targetX.current = getTrackXForIndex(roundedIndex);
  };

  const handlePrev = () => {
    virtualIndexRef.current -= 1;
    targetX.current = getTrackXForIndex(virtualIndexRef.current);
  };

  const handleNext = () => {
    virtualIndexRef.current += 1;
    targetX.current = getTrackXForIndex(virtualIndexRef.current);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      openLightbox(index);
    } else {
      // If an outer card is clicked, smoothly scroll to bring it into center focus
      const diff = index - activeIndex;
      // Handle closest loop path distance mapping adjustment
      let adjustedDiff = diff;
      if (diff > total / 2) adjustedDiff -= total;
      if (diff < -total / 2) adjustedDiff += total;

      virtualIndexRef.current += adjustedDiff;
      targetX.current = getTrackXForIndex(virtualIndexRef.current);
    }
  };

  const openLightbox = (index: number) => {
    if (!lightboxOpenRef.current) {
      window.history.pushState(
        {
          showcaseLightbox: true,
        },
        "",
      );
    }

    lightboxOpenRef.current = true;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    if (lightboxOpenRef.current && window.history.state?.showcaseLightbox) {
      window.history.back();
    } else {
      lightboxOpenRef.current = false;
      setLightboxIndex(null);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 select-none"
    >
      {/* Outer Layout Frame Container wrapper workspace */}
      <div className="relative z-10 flex w-full items-center justify-between">
        {/* Main Left Arrow Button Outside the Track Layout */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white md:left-8"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>

        {/* Carousel Animation Window Track Area */}
        <div
          className="relative flex w-full items-center overflow-hidden"
          style={{
            height: CARD_H + 60,
            cursor: isMobile ? "default" : "grab",
            touchAction: isMobile ? "pan-y" : "none",
          }}
          onPointerDown={!isMobile ? onPointerDown : undefined}
          onPointerMove={!isMobile ? onPointerMove : undefined}
          onPointerUp={!isMobile ? onPointerUp : undefined}
          onPointerLeave={!isMobile ? onPointerUp : undefined}
        >
          <div
            ref={trackRef}
            className="absolute top-7.5 flex items-center will-change-transform"
            style={{ gap: GAP }}
          >
            {items.map((asset, i) => (
              <div
                key={asset.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="shrink-0 will-change-transform"
                style={{ width: CARD_W, height: CARD_H }}
              >
                <CarouselCard
                  asset={asset}
                  onClick={() => handleCardClick(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Right Arrow Button Outside the Track Layout */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white md:right-8"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {/* Unified Browser Lightbox View Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ShowcaseLightbox
            items={items}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface LightboxProps {
  items: ShowcaseItem[];
  initialIndex: number;
  onClose: () => void;
}

function ShowcaseLightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const asset = items[currentIndex];

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-between bg-black/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Lightbox internal browser previous control trigger */}
      <button
        type="button"
        onClick={handlePrev}
        className="z-50 ml-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:ml-6 md:h-14 md:w-14"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Center Media Box Content Canvas wrapper display */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] max-w-[75vw] flex-col items-center justify-center overflow-hidden rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors duration-200 hover:bg-black md:top-4 md:right-4"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex max-h-[80vh] w-full items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          )}

          {asset.type === "video" ? (
            <video
              key={asset.videoSrc}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              src={asset.videoSrc}
              autoPlay
              loop
              playsInline
              controls
              preload="auto"
              poster={asset.thumbnail}
              onLoadedData={() => setIsLoading(false)}
            />
          ) : asset.type === "image" ? (
            <Image
              key={asset.thumbnail}
              src={asset.thumbnail!}
              alt="Showcase item expanded"
              width={1600}
              height={1200}
              priority
              onLoad={() => setIsLoading(false)}
              className="block max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
          ) : (
            <div className="relative w-125 max-w-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 pt-12 text-center shadow-2xl">
              {asset.thumbnail && (
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={asset.thumbnail}
                    alt="Showcase default metadata"
                    width={600}
                    height={400}
                    onLoad={() => setIsLoading(false)}
                    className="w-full object-cover"
                  />
                </div>
              )}
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${typeBadgeStyle[asset.type]}`}
              >
                {typeLabel[asset.type]}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox internal browser next control trigger */}
      <button
        type="button"
        onClick={handleNext}
        className="z-50 mr-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:mr-6 md:h-14 md:w-14"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
    </motion.div>
  );
}
