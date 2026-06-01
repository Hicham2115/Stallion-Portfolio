"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, Send } from "lucide-react";
import { api } from "@/lib/axios";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/stallion_advertising/",
  },
  { name: "LinkedIn", href: "#" },
  { name: "Behance", href: "#" },
];

async function subscribeEmail(email: string): Promise<void> {
  try {
    await api.post("/newsletter", { email });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data?.message ?? "Subscription failed.");
    }
  }
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);
  const [email, setEmail] = useState("");
  const [year, setYear] = useState(2026);
  const [time, setTime] = useState("—");

  useEffect(() => {
    setYear(new Date().getFullYear());
    const tick = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-GB", {
            timeZone: "Africa/Casablanca",
            hour: "2-digit",
            minute: "2-digit",
          }) + " GMT+1",
        );
      } catch {
        /* ignore */
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

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
      const el = mailRef.current;
      if (!el) return;
      const sx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const sy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        sx((e.clientX - (r.left + r.width / 2)) * 0.35);
        sy((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const onLeave = () => {
        sx(0);
        sy(0);
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: root },
  );

  const newsletter = useMutation({
    mutationFn: subscribeEmail,
    onSuccess: () => setEmail(""),
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) newsletter.mutate(email);
  };

  return (
    <footer
      ref={root}
      id="contact"
      className="pt-[130px] pb-[50px] border-t border-[var(--line)] relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-[rgba(186,252,12,0.12)] blur-[120px] rounded-full pointer-events-none" />

      <div className="wrap relative text-center">
        <div className="eyebrow justify-center" data-fade>
          Let&apos;s work together
        </div>

        <h2
          className="mt-6 font-medium tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem,12vw,11rem)", lineHeight: 0.86 }}
        >
          <span className="r-line">
            <span>ready to</span>
          </span>
          <span className="r-line">
            <span>
              <span className="text-[var(--lime)]">accelerate?</span>
            </span>
          </span>
        </h2>

        <a
          ref={mailRef}
          href="mailto:advertisingstallion@gmail.com"
          data-cursor="✦"
          className="inline-flex items-center gap-[14px] mt-[50px] font-[family-name:var(--font-display)] font-medium bg-[var(--lime)] text-black! rounded-full px-9 py-5 cursor-none will-change-transform"
          style={{ fontSize: "clamp(1.1rem,2.6vw,1.7rem)" }}
        >
          advertisingstallion@gmail.com
          <ArrowUpRight size={22} aria-hidden="true" />
        </a>

        {/* Newsletter */}
        <form
          onSubmit={handleSubscribe}
          data-fade
          className="flex justify-center mt-10 max-w-[380px] mx-auto"
        >
          <input
            type="email"
            placeholder="Stay updated — your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-[18px] py-3 bg-white/[0.08] border border-[var(--line)] border-r-0 rounded-l-[10px] text-white font-[family-name:var(--font-body)] text-[14px] outline-none"
          />
          <button
            type="submit"
            disabled={newsletter.isPending}
            className={`px-[18px] rounded-r-[10px] border-none flex items-center font-bold transition-colors duration-300 ${newsletter.isSuccess ? "bg-[var(--olive)]" : "bg-[var(--lime)]"} text-[var(--ink)] cursor-pointer`}
            aria-label="Subscribe"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
        {newsletter.isSuccess && (
          <p className="text-[13px] text-[var(--lime-soft)] mt-2">
            You&apos;re subscribed!
          </p>
        )}
        {newsletter.isError && (
          <p className="text-[13px] text-red-500 mt-2">
            {(newsletter.error as Error)?.message ?? "Something went wrong."}
          </p>
        )}

        {/* Foot */}
        <div className="flex justify-between items-center gap-[18px] flex-wrap mt-[90px] pt-[26px] border-t border-[var(--line)] text-[14px] text-[var(--fg3)] font-medium">
          <span>© {year} Stallion Advertising — Casablanca, MA</span>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                data-cursor="→"
                className="text-[var(--fg2)] transition-colors duration-300 hover:text-[var(--lime)]"
              >
                {s.name}
              </a>
            ))}
          </div>
          {/* <span>Local — {time}</span> */}
        </div>
      </div>
    </footer>
  );
}
