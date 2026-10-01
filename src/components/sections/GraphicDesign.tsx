"use client";

import { motion } from "framer-motion";
import TextReveal from "../motion/TextReveal";
import Orbit3DCarousel from "../ui/Orbit3DCarousel";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import ContactFormDialog from "../ui/ContactFormDialog";

const items: {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}[] = [
  {
    type: "image",
    src: "/assets/social-media/posters/1.jpg",
    alt: "Social Media Poster 1",
  },
  {
    type: "image",
    src: "/assets/social-media/posters/2.jpg",
    alt: "Social Media Poster 2",
  },
  {
    type: "image",
    src: "/assets/social-media/posters/3.jpg",
    alt: "Social Media Poster 3",
  },
  {
    type: "image",
    src: "/assets/social-media/posters/4.jpg",
    alt: "Social Media Poster 4",
  },
  {
    type: "image",
    src: "/assets/social-media/posters/5.jpg",
    alt: "Social Media Poster 5",
  },
  {
    type: "image",
    src: "/assets/social-media/posters/6.jpg",
    alt: "Social Media Poster 6",
  },
  {
    type: "image",
    src: "/assets/social-media/posters/7.jpg",
    alt: "Social Media Poster 7",
  },
  // {
  //   type: "image",
  //   src: "/assets/social-media/posters/8.jpg",
  //   alt: "Social Media Poster 8",
  // },
  // {
  //   type: "image",
  //   src: "/assets/social-media/posters/9.webp",
  //   alt: "Social Media Poster 9",
  // },
  // {
  //   type: "image",
  //   src: "/assets/social-media/posters/10.webp",
  //   alt: "Social Media Poster 10",
  // },
  // {
  //   type: "image",
  //   src: "/assets/social-media/posters/11.jpg",
  //   alt: "Social Media Poster 11",
  // },
  // {
  //   type: "image",
  //   src: "/assets/social-media/posters/12.webp",
  //   alt: "Social Media Poster 12",
  // },
];

export default function GraphicDesign() {
  const [openContact, setOpenContact] = useState(false);
  const features = [
    "Social Media Creatives",
    "Banner Designs",
    "Logo Design",
    "Mockup Designs",
    "Grid & Carousel Designs",
    "Festival Creatives",
    "Poster Designs",
    "Brand Identity Design",
    "Print Design",
    "Packaging Design",
    "Brochure Design",
    "Marketing Creatives",
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
            <div className="mb-2 flex items-center gap-4">
              <div className="h-px w-10 bg-black/20" />

              <img
                src="/assets/otc-bulb.png"
                alt="Bulb"
                className="h-6 w-6 md:h-9 md:w-9"
              />

              <span className="text-[11px] font-semibold tracking-[0.3em] text-black/40 uppercase md:text-[14px]">
                Graphic Design
              </span>
            </div>

            <div
              className="leading-[0.9] font-black tracking-tighter text-[#0a0a0a]"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 4rem)",
              }}
            >
              <TextReveal
                lines={["Designing Visuals", "That Connect"]}
                className="uppercase"
                highlightWords={["Visuals"]}
                highlightClassName="italic font-medium text-black/30"
              />
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/50 md:text-lg">
              We create modern graphic design systems including social media
              creatives, brand visuals, posters, banners, packaging, and
              marketing assets crafted to build strong visual identity, improve
              engagement, and deliver consistent brand communication across
              digital and print platforms.
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
                <span>Request a Proposal</span>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:rotate-45 group-hover:border-black">
                  <ArrowUpRight size={18} />
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="">
          <Orbit3DCarousel items={items} radius={500} />
        </div>
      </div>
      <ContactFormDialog open={openContact} onOpenChange={setOpenContact} />
    </section>
  );
}
