"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { MARQUEE_ITEMS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function MarqueeSection() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.to(track.current, {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    ScrollTrigger.create({
      onUpdate(self) {
        const v = self.getVelocity();
        if (v) {
          const dir = v < 0 ? -1 : 1;
          gsap.to(tl, { timeScale: 1 + Math.min(Math.abs(v) / 1800, 2.5) * dir, duration: 0.3, overwrite: true });
          gsap.to(tl, { timeScale: 1, duration: 0.8, delay: 0.3, overwrite: false });
        }
      },
    });
  });

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="wrap border-t border-b border-[var(--line)] py-[26px] overflow-hidden whitespace-nowrap">
      <div ref={track} className="inline-flex items-center will-change-transform">
        {[0, 1].map((g) => (
          <span key={g} className="inline-flex items-center">
            {items.map((word, i) => (
              <span key={`${g}-${i}`} className="inline-flex items-center">
                <span className="font-[family-name:var(--font-display)] font-medium tracking-[-0.02em] px-[30px] text-[var(--fg)]"
                  style={{ fontSize: "clamp(1.6rem,3.4vw,2.7rem)" }}>
                  {word}
                </span>
                <span className="text-[var(--olive)] text-[1.3rem] px-1">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
