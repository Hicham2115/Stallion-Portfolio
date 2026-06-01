"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { PRINCIPLES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".r-line > *", {
        yPercent: 110, duration: 0.95, ease: "power4.out", stagger: 0.08, immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      gsap.from("[data-fade]", {
        autoAlpha: 0, y: 26, duration: 0.8, ease: "power3.out", stagger: 0.06, immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="sec wrap" id="principles">
      <div className="eyebrow" data-fade>Principles &amp; Values</div>
      <h2 className="sec-title r-line mt-[18px]">
        <span>What we <span className="text-[var(--lime)]">stand for</span></span>
      </h2>
      <p className="sec-intro" data-fade>
        The principles we keep coming back to — the ones that shape how we think, build and partner.
      </p>
      <div className="grid grid-cols-2 gap-[18px] mt-[54px] max-[760px]:grid-cols-1">
        {PRINCIPLES.map((p) => (
          <PrincipleCard key={p.n} {...p} />
        ))}
      </div>
    </section>
  );
}

function PrincipleCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <article
      data-fade
      className="relative bg-[var(--ink-2)] border border-[var(--line)] rounded-[22px] p-[38px_40px_40px] overflow-hidden min-h-[280px] flex flex-col transition-[border-color,transform] duration-500 hover:border-[rgba(186,252,12,0.4)] hover:-translate-y-[5px] max-[760px]:min-h-0"
    >
      <span className="absolute top-[2px] right-[22px] font-[family-name:var(--font-display)] font-bold text-[150px] leading-none text-white/[0.035] pointer-events-none tracking-[-0.04em]">
        {n}
      </span>
      <span className="font-[family-name:var(--font-display)] text-[14px] font-semibold text-[var(--fg3)] relative z-[1]">{n}</span>
      <h3 className="font-[family-name:var(--font-display)] font-medium mt-9 tracking-[-0.02em] relative z-[1]"
        style={{ fontSize: "clamp(1.5rem,3.2vw,2.1rem)" }}>
        {title}
      </h3>
      <div className="w-[46px] h-[2px] bg-[var(--lime)] mt-[22px]" />
      <p className="text-[var(--fg2)] text-[16px] leading-[1.6] mt-auto pt-6 max-w-[440px] relative z-[1]">
        {desc}
      </p>
    </article>
  );
}
