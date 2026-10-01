type AssetType = "video" | "image" | "pdf" | "logo";

export type ShowcaseItem = {
  id: number;
  type: AssetType;
  thumbnail?: string;
  videoSrc?: string;
};

export type ServiceSection = {
  index: number;
  id: string;
  labelImage?: string;
  tech: { name: string; icon: string }[];
  features: string[];
  assets: ShowcaseItem[];
};

export const services: ServiceSection[] = [
  {
    index: 0,
    id: "motion-ai",

    tech: [
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Animate CC", icon: "/assets/Animate.jpg" },
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },

      // AI Video & Motion Models
      { name: "Kling 3.0", icon: "/assets/kling-color.png" },
      { name: "Google Veo 3.1", icon: "/assets/google-veo.webp" },
      { name: "OpenAI Sora 2", icon: "/assets/OpenAi_Sora.png" },
      { name: "Runway Gen-4", icon: "/assets/runway-ai.webp" },
      { name: "Seedance 2.0", icon: "/assets/seedance.png" },
      { name: "MiniMax Hailuo 2.3", icon: "/assets/minimax.webp" },
      { name: "PixVerse 6.5", icon: "/assets/pixverse.png" },
      { name: "Wan 2.7", icon: "/assets/wan.png" },
      { name: "LTX 2 Pro", icon: "/assets/ltx.png" },
      { name: "Veed Fabric 1.0", icon: "/assets/veed.png" },
      { name: "Grok", icon: "/assets/grok.png" },
    ],

    features: [
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
    ],
    assets: [
      {
        id: 1,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/1.png",
        videoSrc: "/videos/MOTION-GRAPHICS/Mg1.mp4",
      },
      {
        id: 2,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/2.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg2.mp4",
      },
      {
        id: 3,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/3.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg3.mp4",
      },
      {
        id: 4,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/4.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg4.mp4",
      },
      {
        id: 5,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/5.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg5.mp4",
      },
      {
        id: 6,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/6.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg6.mp4",
      },
      {
        id: 7,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/7.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg7.mp4",
      },
      {
        id: 8,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/8.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg8.mp4",
      },
      {
        id: 9,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/9.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg9.mp4",
      },
      {
        id: 10,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/10.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg10.mp4",
      },
      {
        id: 11,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/11.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg11.mp4",
      },
      {
        id: 12,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/12.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg12.mp4",
      },
      {
        id: 13,

        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/13.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg13.mp4",
      },
      {
        id: 14,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/14.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg14.mp4",
      },
      {
        id: 15,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/15.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg15.mp4",
      },
      {
        id: 16,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/16.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg16.mp4",
      },
      {
        id: 17,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/17.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg17.mp4",
      },
      {
        id: 18,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/18.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg18.mp4",
      },
      {
        id: 19,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/19.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg19.mp4",
      },
      {
        id: 20,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/20.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg20.mp4",
      },
      {
        id: 21,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/21.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg21.mp4",
      },
      {
        id: 22,
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/22.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg22.mp4",
      },
    ],
  },
  {
    index: 1,
    id: "graphic-design",
    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
    ],

    features: [
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
    ],
    assets: [
      {
        id: 1,
        type: "image",
        thumbnail: "/assets/social-media/posters/1.jpg",
      },
      {
        id: 2,
        type: "image",
        thumbnail: "/assets/social-media/posters/2.jpg",
      },
      {
        id: 3,
        type: "image",
        thumbnail: "/assets/social-media/posters/3.jpg",
      },
      {
        id: 4,
        type: "image",
        thumbnail: "/assets/social-media/posters/4.jpg",
      },
      {
        id: 5,
        type: "image",
        thumbnail: "/assets/social-media/posters/5.jpg",
      },
      {
        id: 6,
        type: "image",
        thumbnail: "/assets/social-media/posters/6.jpg",
      },
      {
        id: 7,
        type: "image",
        thumbnail: "/assets/social-media/posters/7.jpg",
      },
      {
        id: 8,
        type: "image",
        thumbnail: "/assets/social-media/posters/8.jpg",
      },
      {
        id: 9,
        type: "image",
        thumbnail: "/assets/social-media/posters/9.webp",
      },
      {
        id: 10,
        type: "image",
        thumbnail: "/assets/social-media/posters/10.webp",
      },
      {
        id: 11,
        type: "image",
        thumbnail: "/assets/social-media/posters/11.jpg",
      },
      {
        id: 12,
        type: "image",
        thumbnail: "/assets/social-media/posters/12.webp",
      },
    ],
  },
  {
    index: 2,
    id: "branding",
    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
      { name: "Figma", icon: "/assets/figma.jpg" },
      { name: "CorelDRAW", icon: "/assets/coreldraw.jpg" },
    ],

    features: [
      "Logo Design",
      "Identity Systems",
      "Outdoor Branding",
      "Packaging Design",
      "Menu Card Design",
    ],
    assets: [
      {
        id: 1,
        type: "image",
        thumbnail: "/assets/branding/12.jpeg",
        // videoSrc: "/assets/branding/1.mp4",
      },
      {
        id: 2,
        type: "image",
        thumbnail: "/assets/branding/14.jpeg",
        // videoSrc: "/assets/branding/2.mp4",
      },
      {
        id: 3,
        type: "image",
        thumbnail: "/assets/branding/19.png",
        // videoSrc: "/assets/branding/3.mp4",
      },
      {
        id: 4,
        type: "image",
        thumbnail: "/assets/branding/22.jpeg",
        // videoSrc: "/assets/branding/4.mp4",
      },
      {
        id: 5,
        type: "image",
        thumbnail: "/assets/branding/23.jpeg",
        // videoSrc: "/assets/branding/5.mp4",
      },
      // {
      //   id: 6,
      //   type: "video",
      //   thumbnail: "/assets/branding/6.png",
      //   videoSrc: "/assets/branding/6.mp4",
      // },
      // {
      //   id: 7,
      //   type: "video",
      //   thumbnail: "/assets/branding/7.png",
      //   videoSrc: "/assets/branding/7.mp4",
      // },
      // {
      //   id: 8,
      //   type: "video",
      //   thumbnail: "/assets/branding/8.png",
      //   videoSrc: "/assets/branding/8.mp4",
      // },
      // {
      //   id: 9,
      //   type: "video",
      //   thumbnail: "/assets/branding/9.png",
      //   videoSrc: "/assets/branding/9.mp4",
      // },
      // {
      //   id: 10,
      //   type: "video",
      //   thumbnail: "/assets/branding/10.png",
      //   videoSrc: "/assets/branding/10.mp4",
      // },
      // {
      //   id: 11,
      //   type: "video",
      //   thumbnail: "/assets/branding/11.png",
      //   videoSrc: "/assets/branding/11.mp4",
      // },
    ],
  },
  {
    index: 3,
    id: "social-media",
    tech: [
      { name: "Instagram", icon: "/assets/insta.jpg" },
      { name: "Meta", icon: "/assets/meta.webp" },
      { name: "Google Ads", icon: "/assets/Google-ads.jpg" },
      { name: "YouTube", icon: "/assets/youtube.jpg" },
      { name: "Whatsapp", icon: "/assets/whatsapp.jpg" },
      { name: "X (Twitter)", icon: "/assets/twitter.png" },
      { name: "Snapchat", icon: "/assets/Snapchat.jpeg" },
    ],

    features: [
      "Logo Design",
      "Social Media Management",
      "Instagram Feed Designs",
      "Reels & Shorts Content",
      "Festival Creatives",
      "Story Creatives",
      "Ad Creatives",
      "Social Media Videos",
      "Print Design",
      "Packaging Design",
      "Brochure Design",
      "Marketing Creatives",
      "Mockup Designs",
      "Grid & Carousel Designs",
    ],

    assets: [
      {
        id: 1,
        type: "image",
        thumbnail: "/assets/social-media/banners/1.jpg",
      },
      {
        id: 2,
        type: "image",
        thumbnail: "/assets/social-media/grids/1.jpg",
      },
      {
        id: 3,
        type: "image",
        thumbnail: "/assets/social-media/posters/1.jpg",
      },
      {
        id: 4,
        type: "image",
        thumbnail: "/assets/social-media/grids/3.jpg",
      },
      {
        id: 5,
        type: "image",
        thumbnail: "/assets/social-media/social/1.jpg",
      },
      {
        id: 6,
        type: "image",
        thumbnail: "/assets/social-media/social/2.webp",
      },
      {
        id: 7,
        type: "image",
        thumbnail: "/assets/social-media/social/3.jpg",
      },
      {
        id: 8,
        type: "image",
        thumbnail: "/assets/social-media/social/4.jpg",
      },
      {
        id: 9,
        type: "image",
        thumbnail: "/assets/social-media/social/5.jpg",
      },
      {
        id: 10,
        type: "video",
        thumbnail: "/assets/social-media/social/6.png",
        videoSrc: "/assets/social-media/social/6.mp4",
      },
      {
        id: 11,
        type: "video",
        thumbnail: "/assets/social-media/social/7.png",
        videoSrc: "/assets/social-media/social/7.mp4",
      },
      {
        id: 12,
        type: "video",
        thumbnail: "/assets/social-media/social/8.png",
        videoSrc: "/assets/social-media/social/8.mp4",
      },
      {
        id: 13,
        type: "video",
        thumbnail: "/assets/social-media/social/9.png",
        videoSrc: "/assets/social-media/social/9.mp4",
      },
    ],
  },
];
