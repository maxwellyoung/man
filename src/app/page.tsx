"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { montserrat } from "./fonts";

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

    // Create background
    const bgEl = document.createElement("div");
    bgEl.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: ${colors.background};
    `;
    container.appendChild(bgEl);

    // Create M.A.N. elements
    const manLetters = ["M", "A", "N"];
    const letterElements = manLetters.map((letter, index) => {
      const letterEl = document.createElement("div");
      letterEl.textContent = letter;
      letterEl.style.cssText = `
        position: absolute;
        font-size: ${28 * scaleFactor}vmin;
        font-weight: 700;
        color: ${colors.primary};
        opacity: 0;
        left: ${25 + 25 * index}%;
        top: 30%;
        transform: translate(-50%, -50%);
        font-family: 'Montserrat', sans-serif;
      `;
      container.appendChild(letterEl);
      return letterEl;
    });

    // Create word elements
    const words = ["METROSEXUAL", "AWARENESS", "NIGHT"];
    const wordElements = words.map((word, index) => {
      const wordEl = document.createElement("div");
      wordEl.textContent = word;
      wordEl.style.cssText = `
        position: absolute;
        font-size: ${4.5 * scaleFactor}vmin;
        font-weight: 300;
        color: ${colors.secondary};
        opacity: 0;
        left: ${25 + 25 * index}%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Montserrat', sans-serif;
      `;
      container.appendChild(wordEl);
      return wordEl;
    });

    // Create unisex toilet icon
    const iconEl = document.createElement("img");
    iconEl.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Unisex%20public%20toilet-z8yBJUf1pIGuXhaD5j9mER4pyWvwUh.png";
    iconEl.alt = "Unisex public toilet icon";
    iconEl.style.cssText = `
      position: absolute;
      width: ${22 * scaleFactor}vmin;
      height: auto;
      left: 50%;
      top: 75%;
      transform: translate(-50%, -50%);
      opacity: 0;
      filter: brightness(0.5);
    `;
    container.appendChild(iconEl);

    // Create accent lines (aiming sights)
    const lineElements = [0, 1].map(() => {
      const lineEl = document.createElement("div");
      lineEl.style.cssText = `
        position: absolute;
        background-color: ${colors.accent};
        opacity: 0;
      `;
      container.appendChild(lineEl);
      return lineEl;
    });

    // Create circular sight element
    const circleEl = document.createElement("div");
    circleEl.style.cssText = `
      position: absolute;
      width: ${7 * scaleFactor}vmin;
      height: ${7 * scaleFactor}vmin;
      border: ${0.7 * scaleFactor}vmin solid ${colors.accent};
      border-radius: 50%;
      left: 50%;
      top: 75%;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    container.appendChild(circleEl);

    // Animation timeline
    const tl = gsap.timeline({ onComplete: () => setAnimationComplete(true) });

    // Animate M.A.N. letters
    tl.to(letterElements, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    }).to(letterElements, {
      y: `-${3 * scaleFactor}vmin`,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    });

    // Animate words
    tl.to(wordElements, {
      opacity: 1,
      y: `-${2 * scaleFactor}vmin`,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    });

    // Animate icon
    tl.to(iconEl, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Animate accent lines (aiming sights)
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
        height: "50%",
        left: "50%",
        top: "50%",
        width: "2px",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    // Animate circular sight element
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

    // Hold the composition
    tl.to({}, { duration: 2 });

    // Cleanup
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
      className={`${montserrat.className} min-h-screen bg-[#1a1a1a] text-white`}
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        aria-label="Motion design animation for Metrosexual Awareness Night (M.A.N.)"
      >
        {animationComplete && (
          <div
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none"
          />
        )}
      </div>

      {animationComplete && (
        <div className="bg-[#2a2a2a] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-8 text-[#ff4081]">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl mb-4 text-[#e0e0e0]">The Essentials</h3>
                <p className="mb-2">
                  <strong>Date:</strong> September 15th, 2024
                </p>
                <p className="mb-2">
                  <strong>Time:</strong> 8 PM - 2 AM
                </p>
                <p className="mb-2">
                  <strong>Venue:</strong> The Whammy Bar
                </p>
                <p className="mb-2">
                  <strong>Cost:</strong> $15
                </p>
                <p>
                  <strong>Dress Code:</strong> Metrosexual Chic
                </p>
              </div>
              <div>
                <h3 className="text-2xl mb-4 text-[#e0e0e0]">
                  About the Hosts
                </h3>
                <p className="mb-4">
                  Join us for an unforgettable night curated by the dynamic duo:
                </p>
                <p className="mb-2">
                  <strong>Thom Haha</strong> - Grooming Guru
                </p>
                <p>
                  <strong>Maxwell Young</strong> - Style Savant
                </p>
              </div>
            </div>
            <button className="mt-12 bg-[#ff4081] text-white py-3 px-6 text-lg rounded-full hover:bg-[#ff679b] transition-colors duration-300">
              Get Your Tickets Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
