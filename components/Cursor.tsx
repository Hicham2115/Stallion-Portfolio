"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const d = dot.current!;
    const r = ring.current!;
    const lbl = label.current!;

    gsap.set([d, r], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const dx = gsap.quickTo(d, "x", { duration: 0.10, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.10, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.32, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.32, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY);
      rx(e.clientX); ry(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll("[data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const val = el.getAttribute("data-cursor") ?? "";
        const isView = val === "View" || val === "✦";
        if (isView) {
          r.classList.add("is-active");
          lbl.textContent = val === "✦" ? "" : val;
          gsap.to(r, { scale: val === "View" ? 2.1 : 1.25, duration: 0.3 });
        } else {
          gsap.to(r, { scale: 0.55, duration: 0.3 });
        }
      });
      el.addEventListener("mouseleave", () => {
        r.classList.remove("is-active");
        lbl.textContent = "";
        gsap.to(r, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-ring">
        <span ref={label} className="clabel" />
      </div>
    </>
  );
}
