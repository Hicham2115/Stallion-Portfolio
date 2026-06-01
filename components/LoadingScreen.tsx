"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface Props { onComplete: () => void }

export function LoadingScreen({ onComplete }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.timeline()
      .to(bar.current, { width: "100%", duration: 1.0, ease: "power2.inOut" })
      .to(el.current, { yPercent: -100, duration: 0.7, ease: "power3.inOut", onComplete });
  }, { scope: el });

  return (
    <div
      ref={el}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-(--ink) will-change-transform"
    >
      <div ref={logo} className="flex flex-col items-center gap-6">
        <Image
          src="/assets/stallion-mark.png"
          alt="Stallion"
          width={60}
          height={60}
          priority
          className="drop-shadow-[0_0_20px_rgba(186,252,12,0.6)]"
        />
        <span className="font-(family-name:--font-display) font-bold tracking-[0.12em] text-white"
          style={{ fontSize: "clamp(1.2rem,4vw,1.8rem)" }}>
          STALLION <span className="text-(--lime-text)">ADVERTISING</span>
        </span>
        <div className="w-60 h-0.5 bg-(--ink-3) rounded-full overflow-hidden mt-2">
          <div
            ref={bar}
            className="h-full w-0 bg-linear-to-r from-(--olive) to-(--lime) rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
