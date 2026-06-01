"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project, type ProjectType } from "@/lib/data";
import { queryKeys } from "@/lib/queryKeys";
import { WorkSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

gsap.registerPlugin(ScrollTrigger);

async function fetchProjects(type: ProjectType): Promise<Project[]> {
  await new Promise((r) => setTimeout(r, 400));
  return PROJECTS.filter((p) => p.type === type);
}

export function Work() {
  const [activeType, setActiveType] = useState<ProjectType>("performance");
  const root = useRef<HTMLElement>(null);

  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.projects(activeType),
    queryFn: () => fetchProjects(activeType),
  });

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
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!isLoading && projects.length) {
        gsap.from(".work-item", {
          autoAlpha: 0,
          y: 36,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          immediateRender: false,
        });
      }
    },
    { scope: root, dependencies: [isLoading, activeType] },
  );

  const perfCount = PROJECTS.filter((p) => p.type === "performance").length;
  const devCount = PROJECTS.filter((p) => p.type === "development").length;

  return (
    <section ref={root} className="sec wrap " id="work">
      <div className="sec-head">
        <div>
          <div className="eyebrow" data-fade>
            Selected Work
          </div>
          <h2 className="sec-title r-line">
            <span>Two tracks, one studio</span>
          </h2>
        </div>
        <span className="sec-num" data-fade>
          (Pick a track)
        </span>
      </div>

      {/* Split selector */}
      <div className="grid grid-cols-2 gap-[18px] mt-2 mb-16 max-[760px]:grid-cols-1">
        {(["performance", "development"] as ProjectType[]).map((type, idx) => {
          const isActive = activeType === type;
          const count = type === "performance" ? perfCount : devCount;
          return (
            <button
              key={type}
              data-cursor="→"
              onClick={() => setActiveType(type)}
              className={[
                "text-left text-inherit rounded-[20px] p-[34px_34px_30px] cursor-none flex flex-col gap-7 min-h-[268px] relative overflow-hidden transition-[border-color,background,transform] duration-500",
                isActive
                  ? "bg-[rgba(186,252,12,0.06)] border border-[var(--lime)]"
                  : "bg-[var(--ink-2)] border border-[var(--line)] hover:-translate-y-1",
              ].join(" ")}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[radial-gradient(130%_130%_at_0%_0%,rgba(186,252,12,0.12),transparent_55%)] pointer-events-none" />
              )}
              <div
                className={`flex items-center justify-between text-[13px] font-semibold tracking-[0.12em] uppercase ${isActive ? "text-[var(--lime-soft)]" : "text-[var(--fg3)]"}`}
              >
                <span>
                  {type === "performance"
                    ? "Sales & Advertising"
                    : "Websites & Web Apps"}
                </span>
                <span className="font-[family-name:var(--font-display)]">
                  0{idx + 1}
                </span>
              </div>
              <div>
                <h3
                  className="font-[family-name:var(--font-display)] font-medium tracking-[-0.03em]"
                  style={{
                    fontSize: "clamp(2rem,4.6vw,3.3rem)",
                    lineHeight: 0.95,
                  }}
                >
                  {type === "performance" ? (
                    <>
                      <span>Performance</span>{" "}
                      <span className="text-[var(--fg3)] font-normal">
                        / Ads
                      </span>
                    </>
                  ) : (
                    "Develop­ment"
                  )}
                </h3>
                <p className="mt-4 text-[var(--fg2)] text-[16px] leading-[1.5] max-w-[400px]">
                  {type === "performance"
                    ? "Paid social & search, funnels, lead generation and creative built to drive sales — not just impressions."
                    : "Custom marketing sites, SaaS platforms, e-commerce and product engineering — fast, scalable, made to last."}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between text-[14px] font-semibold text-[var(--fg2)]">
                <span>{count} projects</span>
                <span
                  className={`transition-colors duration-300 ${isActive ? "text-[var(--lime)]" : "text-[var(--fg2)]"}`}
                >
                  View work →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Work subheading */}
      <div className="flex items-baseline justify-between gap-4 mb-[34px] border-t border-[var(--line)] pt-6">
        <div
          className="font-[family-name:var(--font-display)] font-medium tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}
        >
          {activeType === "performance" ? (
            <>
              Performance <span className="text-[var(--lime)]">&amp; Ads</span>
            </>
          ) : (
            <>
              Web <span className="text-[var(--lime)]">Development</span>
            </>
          )}
        </div>
        <div className="text-[var(--fg3)] text-[14px] font-semibold whitespace-nowrap">
          {activeType === "performance"
            ? "Sales & advertising projects"
            : "Websites & web app projects"}
        </div>
      </div>

      {/* Projects */}
      <div id="works">
        {isLoading && <WorkSkeleton />}
        {isError && (
          <ErrorState
            message="Failed to load projects."
            onRetry={() => refetch()}
          />
        )}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-[90px]">
            {projects.map((p, i) => (
              <WorkCard
                key={p.name}
                project={p}
                index={i}
                total={projects.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const isEven = index % 2 === 1;
  const n = String(index + 1).padStart(2, "0");
  const t = String(total).padStart(2, "0");

  return (
    <article
      className={`work-item grid grid-cols-2 gap-10 items-center max-[820px]:grid-cols-1 max-[820px]:gap-[22px] ${isEven ? "[direction:rtl]" : ""}`}
    >
      <a
        href="#work"
        data-cursor="View"
        className="relative rounded-[18px] overflow-hidden aspect-[4/3] cursor-none block [direction:ltr]"
      >
        <div className="duo" style={{ background: project.grad }} />
        <span className="absolute left-[26px] bottom-6 z-[2] font-[family-name:var(--font-display)] font-semibold text-[20px] text-[rgba(14,16,19,0.85)]">
          {project.name}
        </span>
        <span className="absolute top-[22px] left-6 font-[family-name:var(--font-display)] font-semibold text-[15px] text-white [mix-blend-mode:difference]">
          {n} / {t}
        </span>
      </a>

      <div className="py-1 [direction:ltr]">
        <h3
          className="r-line font-medium"
          style={{ fontSize: "clamp(1.9rem,4.4vw,3.4rem)", lineHeight: 1 }}
        >
          <span>{project.name}</span>
        </h3>
        <div className="flex flex-wrap gap-[10px] my-[22px]">
          {project.cats.map((cat) => (
            <span
              key={cat}
              className="text-[13px] font-semibold text-[var(--fg2)] border border-[var(--line)] rounded-full px-[15px] py-[7px]"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-[18px] text-[var(--fg3)] text-[14px] font-medium">
          <span className="font-[family-name:var(--font-display)]">
            {project.year}
          </span>
          <span>·</span>
          <span>Case study</span>
        </div>
        <span className="mt-[30px] inline-flex items-center gap-[10px] font-[family-name:var(--font-display)] font-semibold text-[15px] text-[var(--fg)]">
          View project
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-[400ms]"
          />
        </span>
      </div>
    </article>
  );
}
