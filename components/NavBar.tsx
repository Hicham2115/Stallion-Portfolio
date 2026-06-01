"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Cases", href: "#cases" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(14,16,19,0.82)] backdrop-blur-[18px] border-b border-white/[0.07] shadow-[0_1px_24px_rgba(0,0,0,0.45)]"
          : "[mix-blend-mode:difference]"
      }`}
    >
      <div className="wrap flex h-[76px] items-center gap-6">
        {/* Logo */}
        <a
          href="#top"
          data-cursor="→"
          className="flex items-center gap-[9px] font-[family-name:var(--font-display)] text-[18px] font-semibold tracking-[-0.01em] text-white no-underline"
        >
          <Image
            src="/assets/stallion-mark.png"
            alt=""
            width={24}
            height={24}
          />
          STALLION<span className="text-[var(--lime)]">.</span>
        </a>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex ml-auto">
          <NavigationMenuList className="gap-1">
            {LINKS.map((l) => (
              <NavigationMenuItem key={l.label}>
                <NavigationMenuLink
                  href={l.href}
                  data-cursor="→"
                  className="font-[family-name:var(--font-body)] text-[14px] font-medium text-white px-[14px] py-[7px] rounded-lg bg-transparent transition-colors duration-300 hover:text-[var(--lime)]"
                >
                  {l.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right — live dot + CTA (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[13px] font-medium text-white">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--lime)] shadow-[0_0_10px_var(--lime)]" />
            Casablanca
          </div>
          <a
            href="#contact"
            data-cursor="→"
            className="font-[family-name:var(--font-body)] text-[13px] font-bold px-[18px] py-2 rounded-full bg-[var(--lime)] text-black! no-underline transition-opacity duration-200 hover:opacity-85"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-9 text-white"
                size="icon"
                variant="ghost"
                aria-label="Open menu"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={18}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-1.75 origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-52 p-1 bg-[rgba(14,16,19,0.97)] backdrop-blur-[16px] border border-white/10"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {[...LINKS, { label: "Contact", href: "#contact" }].map(
                    (l) => (
                      <NavigationMenuItem className="w-full" key={l.label}>
                        <NavigationMenuLink
                          href={l.href}
                          className="flex items-center w-full py-2.5 px-3 font-[family-name:var(--font-body)] text-[14px] font-semibold text-[#d1d5db]"
                        >
                          {l.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ),
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
