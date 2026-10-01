"use client";

import { motion } from "framer-motion";
import TextReveal from "../motion/TextReveal";
import CoverflowCarousel, { MediaItem } from "../ui/Coverflowcarousel";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ContactFormDialog from "../ui/ContactFormDialog";

// const items: MediaItem[] = [
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/Mg1.mp4",
//     poster: "/videos/MOTION-GRAPHICS/1.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg2.mp4",
//     poster: "/videos/MOTION-GRAPHICS/2.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg3.mp4",
//     poster: "/videos/MOTION-GRAPHICS/3.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg4.mp4",
//     poster: "/videos/MOTION-GRAPHICS/4.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg5.mp4",
//     poster: "/videos/MOTION-GRAPHICS/5.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg6.mp4",
//     poster: "/videos/MOTION-GRAPHICS/6.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg7.mp4",
//     poster: "/videos/MOTION-GRAPHICS/7.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg8.mp4",
//     poster: "/videos/MOTION-GRAPHICS/8.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg9.mp4",
//     poster: "/videos/MOTION-GRAPHICS/9.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg10.mp4",
//     poster: "/videos/MOTION-GRAPHICS/10.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg11.mp4",
//     poster: "/videos/MOTION-GRAPHICS/11.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg12.mp4",
//     poster: "/videos/MOTION-GRAPHICS/12.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg13.mp4",
//     poster: "/videos/MOTION-GRAPHICS/13.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg14.mp4",
//     poster: "/videos/MOTION-GRAPHICS/14.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg15.mp4",
//     poster: "/videos/MOTION-GRAPHICS/15.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg16.mp4",
//     poster: "/videos/MOTION-GRAPHICS/16.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg17.mp4",
//     poster: "/videos/MOTION-GRAPHICS/17.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg18.mp4",
//     poster: "/videos/MOTION-GRAPHICS/18.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg19.mp4",
//     poster: "/videos/MOTION-GRAPHICS/19.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg20.mp4",
//     poster: "/videos/MOTION-GRAPHICS/20.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg21.mp4",
//     poster: "/videos/MOTION-GRAPHICS/21.png",
//   },
//   {
//     type: "video",
//     src: "/videos/MOTION-GRAPHICS/mg22.mp4",
//     poster: "/videos/MOTION-GRAPHICS/22.png",
//   },
// ];
const items: MediaItem[] = [
  {
    type: "video",
    src: "/videos/graphi-ai/AG 3.mp4",
    // alt: "AG 3",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/09-09-2026.mp4",
    // alt: "09-09-2026",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/ar ganesh chaturthi wishes.mp4",
    // alt: "Ar Ganesh Chaturthi Wishes",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/Comp 1.mp4",
    // alt: "Comp 1",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/csk realtors.mp4",
    // alt: "CSK Realtors",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/csk realtors_09-07-2026.mp4",
    // alt: "CSK Realtors 09-07-2026",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/csk textiles 21-08-2026.mp4",
    // alt: "CSK Textiles 21-08-2026",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/csk textiles.mp4",
    // alt: "CSK Textiles",
  },
  // {
  //   type: "video",
  //   src: "/videos/graphi-ai/Dabnkleaan reel.mp4",
  //   // alt: "Dabnkleaan Reel",
  // },
  {
    type: "video",
    src: "/videos/graphi-ai/DNK 28-07-2026.mp4",
    // alt: "DNK 28-07-2026",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/DNK final 15-07-2026.mp4",
    // alt: "DNK Final 15-07-2026",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/final video.mp4",
    // alt: "Final Video",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/ganesh chaturthi silver essential items.mp4",
    // alt: "Ganesh Chaturthi Silver Essential Items",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/janmashtmi greetings.mp4",
    // alt: "Janmashtmi Greetings",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/shivaji silver idol.mp4",
    // alt: "Shivaji Silver Idol",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/silver anklets 09-07-26.mp4",
    // alt: "Silver Anklets 09-07-26",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/silver necklace set.mp4",
    // alt: "Silver Necklace Set",
  },
  {
    type: "video",
    src: "/videos/graphi-ai/silver rakhi collections argentum arts.mp4",
    // alt: "Silver Rakhi Collections Argentum Arts",
  },
  // {
  //   type: "video",
  //   src: "/videos/graphi-ai/silver rings.mp4",
  //   // alt: "Silver Rings",
  // },
  {
    type: "video",
    src: "/videos/graphi-ai/truck ps 2_1.mp4",
    // alt: "Truck PS 2_1",
  },
];
export default function MotionGraphic() {
  const [openContact, setOpenContact] = useState(false);

  const features = [
    "3D Animation",
    "2D Animation",
    "VFX & Compositing",
    "Motion Graphics",
    "AI Videos",
    "AI Movies",
    "Explainer Videos",
    "Branding Videos",
    "Festival Creative Videos",
    "Social Media Videos",
    "Website Videos",
    "Creative Campaign Videos",
    "Visual Presentations",
    "Video Editing",
    "Audio Editing & Sync",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f5f3ef] py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
          repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="relative z-10 container">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-10 bg-black/20" />

              <img
                src="/assets/otc-bulb.png"
                alt="Bulb"
                className="h-6 w-6 md:h-9 md:w-9"
              />

              <span className="text-[11px] font-semibold tracking-[0.3em] text-black/40 uppercase md:text-[14px]">
                Motion + AI
              </span>
            </div>

            <div
              className="leading-[0.9] font-black tracking-tighter text-[#0a0a0a]"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              }}
            >
              <TextReveal
                lines={["Crafting Stories", "In Motion"]}
                className="uppercase"
                highlightWords={["Motion"]}
                highlightClassName="italic font-medium text-black/30"
              />
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/50 md:text-lg">
              We create high-end motion graphics, AI-powered videos, cinematic
              brand films, explainer videos, VFX sequences, and immersive
              storytelling experiences designed for advertising, digital
              campaigns, websites, and modern social media platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <h3 className="text-sm font-semibold tracking-[0.25em] text-black/40 uppercase md:text-base">
                Services & Capabilities
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {features.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-black/70 backdrop-blur transition-all duration-300 hover:border-black/20 hover:bg-white md:px-5 md:py-3 md:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={() => setOpenContact(true)}
                className="group inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-black uppercase transition-all duration-300"
              >
                <span>Schedule a Strategy Call</span>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:rotate-45 group-hover:border-black">
                  <ArrowUpRight size={18} />
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <CoverflowCarousel items={items} />
        </div>
      </div>
      <ContactFormDialog open={openContact} onOpenChange={setOpenContact} />
    </section>
  );
}
