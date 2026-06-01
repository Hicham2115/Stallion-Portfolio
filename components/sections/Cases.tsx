"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CASES, type Case } from "@/lib/data";
import { queryKeys } from "@/lib/queryKeys";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

gsap.registerPlugin(ScrollTrigger);

async function fetchCases(): Promise<Case[]> {
  await new Promise((r) => setTimeout(r, 300));
  return CASES;
}

export function Cases() {
  const root = useRef<HTMLElement>(null);

  const { data: cases = [], isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.cases(),
    queryFn: fetchCases,
  });

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

  useGSAP(
    () => {
      if (isLoading || !cases.length) return;
      gsap.from(".case-card", {
        autoAlpha: 0, y: 40, duration: 0.75, ease: "power3.out", stagger: 0.12,
      });
    },
    { scope: root, dependencies: [isLoading] }
  );

  return (
    <section ref={root} className="sec wrap" id="cases">
      <div className="sec-head">
        <div>
          <div className="eyebrow" data-fade>Case Studies</div>
          <h2 className="sec-title r-line"><span>Proof, in numbers</span></h2>
        </div>
        <span className="sec-num" data-fade>(Selected results)</span>
      </div>

      <div className="flex flex-col gap-[26px]">
        {isLoading && [0, 1, 2].map((i) => (
          <Skeleton key={i} style={{ height: 420, borderRadius: 22 }} />
        ))}
        {isError && <ErrorState message="Failed to load case studies." onRetry={() => refetch()} />}
        {!isLoading && !isError && cases.map((c, i) => (
          <CaseCard key={c.id} study={c} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function CaseCard({ study, flip }: { study: Case; flip: boolean }) {
  return (
    <article
      className="case-card bg-[var(--ink-2)] border border-[var(--line)] rounded-[22px] overflow-hidden transition-[border-color] duration-[400ms] hover:border-[rgba(186,252,12,0.35)]"
    >
      {/* Bar */}
      <div className="flex items-center justify-between gap-6 flex-wrap px-[34px] py-[30px] border-b border-[var(--line)]">
        <div>
          <div className="font-[family-name:var(--font-display)] text-[13px] font-semibold tracking-[0.14em] uppercase text-[var(--fg3)] mb-3">
            {study.id}
          </div>
          <div className="font-[family-name:var(--font-display)] font-medium tracking-[-0.025em]"
            style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", lineHeight: 1 }}>
            {study.client}
          </div>
          <span className="inline-block mt-[14px] text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--lime-soft)] border border-[rgba(186,252,12,0.4)] rounded-full px-[13px] py-[6px]">
            {study.track}
          </span>
        </div>
        <div className="text-right shrink-0">
          <div className="font-[family-name:var(--font-display)] font-medium text-[var(--lime)] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)", lineHeight: 0.9 }}>
            {study.kpi}
          </div>
          <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[var(--fg3)] mt-2">
            {study.kpiLabel}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`grid max-[880px]:grid-cols-1 ${flip ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-[0.9fr_1.1fr]"}`}>
        <div className={`relative min-h-[420px] overflow-hidden max-[880px]:min-h-[260px] ${flip ? "order-2 max-[880px]:order-none" : ""}`}>
          <div className="duo" style={{ background: study.grad }} />
          <span className="absolute left-6 bottom-[22px] z-[2] font-[family-name:var(--font-display)] font-semibold text-[22px] text-[rgba(14,16,19,0.85)]">
            {study.client}
          </span>
        </div>
        <div className="px-[44px] py-[40px] flex flex-col gap-[34px] justify-center max-[880px]:px-[26px] max-[880px]:py-8">
          {[
            { label: "The Brief", items: study.brief },
            { label: "The Solution", items: study.solution },
          ].map(({ label, items }) => (
            <div key={label}>
              <h4 className="font-[family-name:var(--font-display)] font-semibold text-[22px] tracking-[-0.01em] flex items-center gap-3 mb-[18px]">
                <span className="w-[22px] h-[2px] bg-[var(--lime)] inline-block" />
                {label}
              </h4>
              <ul className="list-none flex flex-col gap-[13px]">
                {items.map((item, i) => (
                  <li key={i} className="relative pl-[22px] text-[var(--fg2)] text-[15.5px] leading-[1.55]">
                    <span className="absolute left-0 top-[9px] w-[7px] h-[7px] rounded-full bg-[var(--olive)] inline-block" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
