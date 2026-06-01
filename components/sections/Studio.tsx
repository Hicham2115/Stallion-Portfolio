"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { STATS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Studio() {
  const root = useRef<HTMLElement>(null);
  const statsGrid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".r-line > *", {
        yPercent: 110,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      gsap.from("[data-fade]", {
        autoAlpha: 0,
        y: 26,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });

      ScrollTrigger.create({
        trigger: statsGrid.current,
        start: "top 82%",
        once: true,
        onEnter() {
          statsGrid.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            const end = parseFloat(el.dataset.count ?? "0");
            const suf = el.dataset.suffix ?? "";
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end,
              duration: 1.6,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round(obj.v) + suf;
              },
            });
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="sec wrap" id="studio">
      <div className="grid grid-cols-[1.05fr_0.95fr] gap-[70px] items-center max-[820px]:grid-cols-1 max-[820px]:gap-[54px]">
        {/* Copy */}
        <div>
          <div className="eyebrow mb-[22px]" data-fade>
            The Studio
          </div>
          <h2
            className="r-line font-medium"
            style={{ fontSize: "clamp(1.9rem,4.4vw,3.2rem)", lineHeight: 1.02 }}
          >
            <span>A small team that</span>
          </h2>
          <h2
            className="r-line font-medium"
            style={{ fontSize: "clamp(1.9rem,4.4vw,3.2rem)", lineHeight: 1.02 }}
          >
            <span>
              <span className="text-[var(--lime)]">runs</span> beside you.
            </span>
          </h2>
          <p
            data-fade
            className="text-[var(--fg2)] text-[18px] leading-[1.6] mt-6 max-w-[520px]"
          >
            No bloated retainers, no vanity metrics. We embed with founders and
            marketing leads to ship brands, sites and campaigns that compound.
            Our no-cure, no-pay mindset means we only win when you do.
          </p>
          <div ref={statsGrid} className="grid grid-cols-2 gap-x-6 gap-y-[30px] mt-[46px] max-w-[480px]">
            {STATS.map((s) => (
              <div key={s.label} data-fade>
                <div
                  data-count={s.value}
                  data-suffix={s.suffix}
                  className="font-[family-name:var(--font-display)] font-medium text-[46px] leading-none text-white"
                >
                  0{s.suffix}
                </div>
                <div className="text-[var(--fg3)] text-[14px] font-semibold mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media */}
        <div data-fade className="relative">
          <div className="rounded-[20px] overflow-hidden aspect-[4/5] border border-[var(--line)] relative">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Stallion studio"
              fill
              className="object-cover"
              sizes="(max-width: 820px) 100vw, 45vw"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-[var(--lime)] text-[var(--ink)] rounded-[16px] p-[18px_22px] max-w-[220px]">
            <b className="font-[family-name:var(--font-display)] font-semibold text-[18px] block leading-[1.1]">
              Built in Casablanca,
            </b>
            <span className="text-[14px] font-semibold">
              shipping worldwide.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
