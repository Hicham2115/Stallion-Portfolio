"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function Hero({ animate }: { animate: boolean }) {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .from(".hero-top", { autoAlpha: 0, y: 30, duration: 0.8, ease: "power3.out" }, 0)
        .from(".hero-title .ln > span", { yPercent: 110, duration: 1.05, ease: "power4.out", stagger: 0.1 }, 0.05)
        .from(".hero-bottom-item", { autoAlpha: 0, y: 30, duration: 0.8, ease: "power3.out", stagger: 0.1 }, 0.2);
    },
    { scope: root }
  );

  useEffect(() => {
    if (animate) tl.current?.play();
  }, [animate]);

  return (
    <section
      ref={root}
      id="top"
      className="hero wrap flex flex-col justify-center min-h-svh pt-[120px] pb-[46px] relative"
    >
      {/* Top bar */}
      <div className="hero-top flex justify-between gap-5 text-[14px] text-[var(--fg2)] font-medium border-t border-[var(--line)] pt-[18px] mb-auto">
        <span className="max-w-[300px]">
          Stallion Advertising — a 360° creative &amp; performance studio building brands, sites and campaigns that move.
        </span>
        <span>Est. 2017 · Casablanca, MA</span>
      </div>

      {/* Title */}
      <h1
        className="hero-title font-[family-name:var(--font-display)] font-medium py-[30px] tracking-[-0.04em]"
        style={{ fontSize: "clamp(3rem,13.5vw,13rem)", lineHeight: 0.86 }}
      >
        <span className="ln"><span>brands that</span></span>
        <span className="ln">
          <span>
            <em className="not-italic text-[var(--olive)]">refuse</em> to
          </span>
        </span>
        <span className="ln">
          <span>slow <span className="text-[var(--lime)]">down.</span></span>
        </span>
      </h1>

      {/* Bottom bar */}
      <div className="flex justify-between items-end gap-[30px] border-t border-[var(--line)] pt-[22px] flex-wrap">
        <p className="hero-bottom-item max-w-[430px] text-[17px] leading-[1.5] text-[var(--fg2)]">
          We pair data-driven performance marketing with custom web &amp; product development — work measured against revenue, not impressions.
        </p>
        <div className="hero-bottom-item flex items-center gap-[10px] text-[12px] uppercase tracking-[0.18em] text-[var(--fg3)] font-semibold">
          <span className="w-[34px] h-[34px] border border-[var(--line)] rounded-full flex items-center justify-center">
            <ArrowDown size={15} aria-hidden="true" className="animate-[nudge_1.8s_ease-in-out_infinite]" />
          </span>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
