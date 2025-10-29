"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function LogoSlider({ logos = [], speed = 28 }) {
  const items = logos.map(l => (typeof l === "string" ? { src: l, alt: "Logo" } : l));
  const controls = useAnimation();
  const [hover, setHover] = useState(false);

  // Basic duration estimate based on count and speed (px/s-ish)
  const avgItemPx = 180;
  const duration = Math.max(8, Math.min(60, (items.length * avgItemPx) / Math.max(10, speed)));

  useEffect(() => {
    if (hover) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: { duration, ease: "linear", repeat: Infinity },
      });
    }
  }, [controls, duration, hover]);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="relative h-12 sm:h-14 md:h-16"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Duplicate track for seamless loop */}
        <motion.div className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-10 sm:gap-12 md:gap-14" animate={controls} style={{ width: "max-content" }}>
          {[...items, ...items].map((logo, i) => (
            <div key={i} className="flex items-center justify-center px-4 py-2">
              <img src={logo.src} alt={logo.alt || "Logo"} className="h-8 sm:h-10 md:h-12 w-auto object-contain" loading="lazy" draggable={false} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
