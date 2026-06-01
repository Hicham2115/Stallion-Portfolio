"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SERVICES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
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
    <section ref={root} className="sec wrap" id="services">
      <div className="sec-head">
        <div>
          <div className="eyebrow" data-fade>Capabilities</div>
          <h2 className="sec-title r-line"><span>What we do best</span></h2>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        {SERVICES.map((s) => (
          <ServiceRow key={s.n} {...s} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div
      data-fade
      data-cursor="→"
      className="group grid grid-cols-[60px_1fr_auto] items-center gap-6 px-2 py-[30px] border-b border-[var(--line)] relative cursor-none transition-[padding] duration-[400ms] hover:pl-6 max-[720px]:grid-cols-[40px_1fr]"
    >
      <span className="absolute inset-0 w-0 bg-[rgba(186,252,12,0.05)] transition-[width] duration-500 -z-[1] group-hover:w-full" />
      <span className="font-[family-name:var(--font-display)] font-semibold text-[15px] text-[var(--fg3)]">{n}</span>
      <span className="font-[family-name:var(--font-display)] font-medium text-[var(--fg)] transition-colors duration-[400ms] group-hover:text-[var(--lime)]"
        style={{ fontSize: "clamp(1.4rem,3.2vw,2.3rem)" }}>
        {title}
      </span>
      <span className="text-[15px] text-[var(--fg2)] max-w-[300px] text-right max-[720px]:hidden">{desc}</span>
    </div>
  );
}
