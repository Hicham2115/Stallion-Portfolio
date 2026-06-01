"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { TESTIMONIALS, type Testimonial } from "@/lib/data";
import { queryKeys } from "@/lib/queryKeys";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

gsap.registerPlugin(ScrollTrigger);

async function fetchTestimonials(): Promise<Testimonial[]> {
  await new Promise((r) => setTimeout(r, 250));
  return TESTIMONIALS;
}

export function Testimonials() {
  const root = useRef<HTMLElement>(null);

  const { data: items = [], isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.testimonials(),
    queryFn: fetchTestimonials,
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

  return (
    <section ref={root} className="sec wrap" id="testimonials">
      <div className="sec-head">
        <div>
          <div className="eyebrow" data-fade>Testimonials</div>
          <h2 className="sec-title r-line"><span>Clients, in their words</span></h2>
        </div>
        <span className="sec-num" data-fade>(Don&apos;t take our word)</span>
      </div>
      <div className="grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
        {isLoading && [0, 1, 2, 3].map((i) => (
          <Skeleton key={i} style={{ height: 260, borderRadius: 22 }} />
        ))}
        {isError && <ErrorState message="Failed to load testimonials." onRetry={() => refetch()} />}
        {!isLoading && !isError && items.map((t) => (
          <TestimonialCard key={t.initials} testimonial={t} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <article
      data-fade
      className="bg-[var(--ink-2)] border border-[var(--line)] rounded-[22px] p-9 flex flex-col gap-6 transition-[border-color,transform] duration-500 hover:border-[rgba(186,252,12,0.4)] hover:-translate-y-1"
    >
      <div className="text-[var(--lime)] text-[13px] tracking-[4px]">★★★★★</div>
      <p className="font-[family-name:var(--font-display)] font-medium leading-[1.35] tracking-[-0.01em] text-[var(--fg)]"
        style={{ fontSize: "clamp(1.2rem,2.3vw,1.55rem)" }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-[14px] mt-auto">
        <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[var(--olive)] to-[var(--lime)] text-[var(--ink)] flex items-center justify-center font-[family-name:var(--font-display)] font-semibold text-[15px] shrink-0">
          {t.initials}
        </div>
        <div>
          <div className="font-bold text-[15px]">{t.name}</div>
          <div className="text-[var(--fg3)] text-[13px] font-semibold mt-0.5">{t.role}</div>
        </div>
      </div>
    </article>
  );
}
