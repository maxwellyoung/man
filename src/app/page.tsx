"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function MotionDesignMANAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const colors = {
      background: "#1a1a1a",
      primary: "#e0e0e0",
      secondary: "#b0b0b0",
      accent: "#ff4081",
    };

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scaleFactor = Math.min(containerWidth / 1000, containerHeight / 800);

    const createElement = (
      type: "div" | "img",
      styles: Partial<CSSStyleDeclaration>,
      parent: HTMLElement,
      content?: string
    ) => {
      const element = document.createElement(type);
      Object.assign(element.style, styles);
      if (content) element.textContent = content;
      parent.appendChild(element);
      return element;
    };

    const bgEl = createElement(
      "div",
      {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: colors.background,
      },
      container
    );

    const manLetters = ["M", "A", "N"];
    const words = ["METROSEXUAL", "AWARENESS", "NIGHT"];
    const letterElements = manLetters.map((letter, index) =>
      createElement(
        "div",
        {
          position: "absolute",
          fontSize: `${28 * scaleFactor}vmin`,
          fontWeight: "700",
          color: colors.primary,
          opacity: "0",
          left: `${25 + 25 * index}%`,
          top: "40%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-montserrat)",
          padding: `${2 * scaleFactor}vmin`,
        },
        container,
        letter
      )
    );

    const wordElements = words.map((word, index) =>
      createElement(
        "div",
        {
          position: "absolute",
          fontSize: `${4 * scaleFactor}vmin`,
          fontWeight: "500",
          color: colors.secondary,
          opacity: "0",
          left: `${25 + 25 * index}%`,
          top: "60%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-montserrat)",
          textAlign: "center",
          width: "30%",
        },
        container,
        word
      )
    );

    const iconEl = createElement(
      "img",
      {
        position: "absolute",
        width: `${20 * scaleFactor}vmin`,
        height: "auto",
        left: "50%",
        top: "75%",
        transform: "translate(-50%, -50%)",
        opacity: "0",
        filter: "brightness(0.5)",
      },
      container
    ) as HTMLImageElement;
    iconEl.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Unisex%20public%20toilet-z8yBJUf1pIGuXhaD5j9mER4pyWvwUh.png";
    iconEl.alt = "Unisex public toilet icon";

    const lineElements = [0, 1].map(() =>
      createElement(
        "div",
        {
          position: "absolute",
          backgroundColor: colors.accent,
          opacity: "0",
        },
        container
      )
    );

    const circleEl = createElement(
      "div",
      {
        position: "absolute",
        width: `${7 * scaleFactor}vmin`,
        height: `${7 * scaleFactor}vmin`,
        border: `${0.7 * scaleFactor}vmin solid ${colors.accent}`,
        borderRadius: "50%",
        left: "50%",
        top: "75%",
        transform: "translate(-50%, -50%)",
        opacity: "0",
      },
      container
    );

    const tl = gsap.timeline({ onComplete: () => setAnimationComplete(true) });

    tl.to(letterElements, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    }).to(letterElements, {
      y: `-${2 * scaleFactor}vmin`,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    });

    tl.to(
      wordElements,
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    tl.to(iconEl, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });

    tl.to(
      lineElements[0],
      {
        opacity: 1,
        width: "70%",
        left: "15%",
        top: "75%",
        height: "2px",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.5"
    ).to(
      lineElements[1],
      {
        opacity: 1,
        height: "35%",
        left: "50%",
        top: "57.5%",
        width: "2px",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    tl.to(
      circleEl,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    tl.to({}, { duration: 2 });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlightRef.current.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(255, 255, 255, 0) 50%
          )
        `;
      }
    };

    if (animationComplete) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animationComplete]);

  return (
    <div
      className={`${montserrat.variable} font-sans min-h-screen bg-gray-900 text-white`}
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        aria-label="Motion design animation for Metrosexual Awareness Night (M.A.N.)"
      >
        {!animationComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}
        {animationComplete && (
          <div
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none"
          />
        )}
      </div>

      {animationComplete && (
        <section className="bg-black py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl mb-12 text-gray-300 border-b border-gray-700 pb-4">
              EVENT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 border border-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl mb-6 text-gray-400 border-b border-gray-700 pb-2">
                  THE ESSENTIALS
                </h3>
                <ul className="space-y-4 text-sm">
                  {[
                    ["DATE", "SEP 15, 2024"],
                    ["TIME", "20:00-02:00"],
                    ["VENUE", "WHAMMY BAR"],
                    ["COST", "$15.00"],
                    ["DRESS", "METRO CHIC"],
                  ].map(([label, value]) => (
                    <li
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-500">{label}</span>
                      <span className="text-gray-300">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900 p-6 border border-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl mb-6 text-gray-400 border-b border-gray-700 pb-2">
                  ABOUT THE HOSTS
                </h3>
                <p className="mb-6 text-gray-300 text-sm">
                  JOIN US FOR A NIGHT CURATED BY:
                </p>
                <ul className="space-y-4 text-sm">
                  {[
                    ["THOM HAHA", "GROOM GURU"],
                    ["MAX YOUNG", "STYLE PRO"],
                  ].map(([name, title]) => (
                    <li
                      key={name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-500">{name}</span>
                      <span className="text-gray-300">{title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button
                className="bg-gray-800 text-gray-300 py-3 px-8 text-sm hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 border border-gray-700 rounded-full"
                aria-label="Purchase tickets for the event"
              >
                GET YOUR TICKETS NOW
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
