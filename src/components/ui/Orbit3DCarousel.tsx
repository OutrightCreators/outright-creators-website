"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

interface Props {
  items: CarouselItem[];
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  scrollSpeed?: number;
}

export default function Orbit3DCarousel({
  items,
  radius = 650,
  cardWidth = 420,
  cardHeight = 280,
  scrollSpeed = 0.25,
}: Props) {
  const rotation = useMotionValue(0);
  const velocity = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const modalOpenRef = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const total = items.length;

  useEffect(() => {
    const handlePopState = () => {
      if (modalOpenRef.current) {
        modalOpenRef.current = false;
        setSelectedIndex(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentRadius = isMobile ? radius * 0.45 : radius;
  const currentCardWidth = isMobile ? cardWidth * 0.5 : cardWidth;
  const currentCardHeight = isMobile ? cardHeight * 0.5 : cardHeight;

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    const wheel = (e: WheelEvent) => {
      e.preventDefault();

      const step = 360 / items.length;
      const direction = e.deltaY > 0 ? 1 : -1;

      velocity.current += direction * step * 0.02;
    };

    el.addEventListener("wheel", wheel, { passive: false });

    return () => el.removeEventListener("wheel", wheel);
  }, [items.length]);

  useAnimationFrame(() => {
    rotation.set(rotation.get() + velocity.current);
    velocity.current *= 0.88;
  });

  useEffect(() => {
    if (selectedIndex !== null && items[selectedIndex]?.type === "video") {
      setTimeout(() => {
        videoRef.current?.play();
      }, 100);
    }
  }, [selectedIndex, items]);

  const cards = useMemo(() => {
    return items.map((item, i) => {
      const baseAngle = (360 / total) * i;

      return {
        item,
        angle: baseAngle,
      };
    });
  }, [items, total]);

  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  const openModal = (index: number) => {
    if (!modalOpenRef.current) {
      window.history.pushState({ orbitCarouselModal: true }, "");
    }

    modalOpenRef.current = true;
    setSelectedIndex(index);
  };

  const closeModal = () => {
    if (modalOpenRef.current && window.history.state?.orbitCarouselModal) {
      window.history.back();
    } else {
      modalOpenRef.current = false;
      setSelectedIndex(null);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-[50dvh] w-full overflow-hidden md:h-screen"
        style={{
          perspective: isMobile ? "800px" : "1800px",
          cursor: isMobile ? "default" : dragging.current ? "grabbing" : "grab",
          touchAction: "auto",
        }}
        onMouseMove={(e) => {
          if (isMobile) return;
          const x = e.clientX / window.innerWidth - 0.5;
          const y = e.clientY / window.innerHeight - 0.5;

          setMouseTilt({ x: x * 20, y: y * 20 });

          if (!dragging.current) return;

          const delta = e.clientX - lastX.current;
          lastX.current = e.clientX;

          rotation.set(rotation.get() + delta * 0.35);
          velocity.current = delta * 0.15;
        }}
        onMouseDown={(e) => {
          dragging.current = true;
          lastX.current = e.clientX;
        }}
        onMouseUp={() => {
          dragging.current = false;
        }}
        onMouseLeave={() => {
          dragging.current = false;
        }}
      >
        <motion.div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, i) => (
            <OrbitCard
              key={i}
              card={card.item}
              angle={card.angle}
              radius={currentRadius}
              rotation={rotation}
              width={currentCardWidth}
              height={currentCardHeight}
              onClick={() => openModal(i)}
              onDragStart={(x: number) => {
                dragging.current = true;
                lastX.current = x;
              }}
              onDragMove={(x: number) => {
                if (!dragging.current) return;

                const delta = x - lastX.current;
                lastX.current = x;

                rotation.set(rotation.get() + delta * 0.45);
                velocity.current = delta * 0.2;
              }}
              onDragEnd={() => {
                dragging.current = false;
              }}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99999 flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative flex w-full max-w-7xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex === 0 ? items.length - 1 : selectedIndex - 1,
                  );
                }}
                className="absolute left-2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 sm:-left-16 sm:h-12 sm:w-12 sm:bg-white/10"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="relative flex items-center justify-center">
                {currentItem.type === "image" ? (
                  <img
                    key={currentItem.src}
                    src={currentItem.src}
                    alt={currentItem.alt || ""}
                    className="max-h-[85vh] max-w-[95vw] rounded-xl object-contain sm:max-w-[80vw]"
                  />
                ) : (
                  <video
                    key={currentItem.src}
                    ref={videoRef}
                    src={currentItem.src}
                    poster={currentItem.poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[85vh] max-w-[95vw] rounded-xl object-contain sm:max-w-[80vw]"
                  />
                )}

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-black sm:-top-4 sm:-right-4"
                >
                  <X size={18} />
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex === items.length - 1 ? 0 : selectedIndex + 1,
                  );
                }}
                className="absolute right-2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 sm:-right-16 sm:h-12 sm:w-12 sm:bg-white/10"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function OrbitCard({
  card,
  angle,
  radius,
  rotation,
  width,
  height,
  onClick,
  onDragStart,
  onDragMove,
  onDragEnd,
}: any) {
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    if (!ref.current) return;

    const current = rotation.get() + angle;
    const z = Math.cos((current * Math.PI) / 180) * radius;

    ref.current.style.transform = `
      rotateY(${current}deg)
      translateZ(${radius}px)
    `;

    ref.current.style.zIndex = String(Math.round(z));
  });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="absolute cursor-pointer"
      onTouchStart={(e) => {
        onDragStart(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        onDragMove(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        onDragEnd();
      }}
    >
      {card.type === "image" ? (
        <img
          src={card.src}
          alt={card.alt}
          draggable={false}
          style={{
            width,
            height,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
      ) : (
        <video
          src={card.src}
          poster={card.poster}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width,
            height,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
      )}
    </div>
  );
}
