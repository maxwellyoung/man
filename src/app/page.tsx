"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { montserrat } from "./fonts";

export default function MotionDesignMANAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        font-size: ${18 * scaleFactor}vmin;
        font-weight: 700;
        color: ${colors.primary};
        opacity: 0;
        left: ${25 + 25 * index}%;
        top: 25%;
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
        font-size: ${3.5 * scaleFactor}vmin;
        font-weight: 300;
        color: ${colors.secondary};
        opacity: 0;
        left: ${25 + 25 * index}%;
        top: 45%;
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
      width: ${14 * scaleFactor}vmin;
      height: auto;
      left: 50%;
      top: 70%;
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
      width: ${4 * scaleFactor}vmin;
      height: ${4 * scaleFactor}vmin;
      border: ${0.5 * scaleFactor}vmin solid ${colors.accent};
      border-radius: 50%;
      left: 50%;
      top: 70%;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    container.appendChild(circleEl);

    // Create spotlight
    const spotlightEl = document.createElement("div");
    spotlightEl.style.cssText = `
      position: absolute;
      width: ${30 * scaleFactor}vmin;
      height: ${30 * scaleFactor}vmin;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
      left: 50%;
      top: 70%;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
      mix-blend-mode: screen;
    `;
    container.appendChild(spotlightEl);

    // Animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

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
    tl.to(
      iconEl,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    // Animate accent lines (aiming sights)
    tl.to(
      lineElements[0],
      {
        opacity: 1,
        width: "80%",
        left: "10%",
        top: "70%",
        height: "2px",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.5"
    ).to(
      lineElements[1],
      {
        opacity: 1,
        height: "40%",
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

    // Animate spotlight and icon brightening
    tl.to(spotlightEl, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    }).to(
      iconEl,
      {
        filter: "brightness(1)",
        duration: 1,
        ease: "power2.inOut",
      },
      "-=1"
    );

    // Hold the composition
    tl.to({}, { duration: 2 });

    // Fade out everything
    tl.to(
      [
        ...letterElements,
        ...wordElements,
        iconEl,
        ...lineElements,
        circleEl,
        spotlightEl,
      ],
      {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.inOut",
      }
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={montserrat.className}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "400px",
          backgroundColor: "#1a1a1a",
          position: "relative",
          overflow: "hidden",
        }}
        aria-label="Motion design animation for Metrosexual Awareness Night (M.A.N.)"
      />
    </div>
  );
}
