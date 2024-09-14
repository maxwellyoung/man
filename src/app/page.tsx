"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Shirt,
  Info,
  Volume2,
  VolumeX,
  X,
  Users,
  Ticket,
  Target,
  Music,
} from "lucide-react";
import * as THREE from "three";

export default function MotionDesignMANAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const currentAudioIndex = useRef(0);
  const cockAudioRef = useRef<HTMLAudioElement>(null);
  const manFigureRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [sightPosition, setSightPosition] = useState({ x: 0, y: 0 });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastCockTime, setLastCockTime] = useState(0);
  const [currentCockSound, setCurrentCockSound] = useState(0);
  const [lastShootTime, setLastShootTime] = useState(0);
  const [currentGun, setCurrentGun] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const colors = useMemo(
    () => ({
      background: "#1a1a1a",
      primary: "#e0e0e0",
      secondary: "#b0b0b0",
      accent: "#FF588F", // Updated pink color
    }),
    []
  );

  const cockSounds = useMemo(
    () => ["/sounds/cock.wav", "/sounds/cock2.wav", "/sounds/cock3.wav"],
    []
  );

  const guns = useMemo(
    () => [
      {
        name: "Pistol",
        cooldown: 200,
        damage: 1,
        sound: "/sounds/gunshot2.wav",
      },
      {
        name: "Shotgun",
        cooldown: 800,
        damage: 3,
        sound: "/sounds/gunshot5.wav",
      },
      {
        name: "Machine Gun",
        cooldown: 50,
        damage: 0.5,
        sound: "/sounds/gunshot4.wav",
      },
    ],
    []
  );

  const createElement = useCallback(
    (
      type: string,
      styles: Partial<CSSStyleDeclaration>,
      parent: HTMLElement,
      content?: string
    ): HTMLElement => {
      const element = document.createElement(type);
      Object.assign(element.style, styles);
      if (content) element.textContent = content;
      parent.appendChild(element);
      return element;
    },
    []
  );

  const createMuzzleFlash = useCallback(
    (x: number, y: number) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const flash = createElement(
        "div",
        {
          position: "absolute",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#ffff00",
          boxShadow: "0 0 10px 5px rgba(255, 255, 0, 0.7)",
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: "12",
        },
        container
      );

      gsap.to(flash, {
        scale: 1.5,
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          if (container.contains(flash)) {
            container.removeChild(flash);
          }
        },
      });
    },
    [createElement]
  );

  const playGunshot = useCallback(() => {
    const audio = audioRefs.current[currentGun];
    if (audio && !isMuted) {
      audio.currentTime = 0;
      audio.play();
    }
  }, [currentGun, isMuted]);

  const createShootingEffect = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const currentTime = Date.now();
      if (currentTime - lastShootTime < guns[currentGun].cooldown) return;
      setLastShootTime(currentTime);

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createMuzzleFlash(x, y);
      playGunshot();

      const hole = createElement(
        "div",
        {
          position: "absolute",
          width: `${10 * guns[currentGun].damage}px`,
          height: `${10 * guns[currentGun].damage}px`,
          borderRadius: "50%",
          backgroundColor: "#000000",
          boxShadow: "inset 0 0 4px 2px rgba(255, 0, 0, 0.5)",
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%) scale(0)",
          zIndex: "30",
        },
        container
      );

      gsap.to(hole, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.7)",
      });

      const createBloodDrop = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const blood = createElement(
          "div",
          {
            position: "absolute",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            backgroundColor: "#ff0000",
            left: `${x + (Math.random() - 0.5) * 10}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%)",
            zIndex: "31",
          },
          container
        );

        gsap.to(blood, {
          y: `+=${window.innerHeight}`,
          x: `+=${(Math.random() - 0.5) * 50}`,
          opacity: 0,
          duration: 4 + Math.random() * 2,
          ease: "power1.in",
          onComplete: () => {
            if (container.contains(blood)) {
              container.removeChild(blood);
            }
          },
        });
      };

      // Create initial blood drops
      for (let i = 0; i < 5; i++) {
        createBloodDrop();
      }

      // Create a continuous dripping effect
      const drippingInterval = setInterval(() => {
        if (Math.random() < 0.7) {
          // 70% chance to create a new drop
          createBloodDrop();
        }
      }, 200);

      // Store the interval ID on the hole element
      hole.dataset.drippingInterval = drippingInterval.toString();

      // Clean up the dripping effect after 10 seconds
      setTimeout(() => {
        clearInterval(drippingInterval);
        if (container.contains(hole)) {
          container.removeChild(hole);
        }
      }, 10000);
    },
    [
      createElement,
      createMuzzleFlash,
      playGunshot,
      currentGun,
      guns,
      lastShootTime,
      setLastShootTime,
    ]
  );

  const changeGun = useCallback(() => {
    setCurrentGun((prevGun) => (prevGun + 1) % guns.length);
  }, [guns.length]);

  useEffect(() => {
    if (!containerRef.current || !manFigureRef.current) return;

    const container = containerRef.current;
    const manFigure = manFigureRef.current;

    let isMouseDown = false;

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      createShootingEffect(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown) {
        createShootingEffect(e);
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [createShootingEffect]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scaleFactor = Math.min(containerWidth / 1000, containerHeight / 800);
    const isMobile = containerWidth < 768;

    const bgEl = createElement(
      "div",
      {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: colors.background,
        backgroundImage:
          "radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 100%)",
      },
      container
    );

    const manLetters = ["M", "A", "N"];
    const letterElements = manLetters.map((letter, index) =>
      createElement(
        "div",
        {
          position: "absolute",
          fontSize: `clamp(3rem, ${10 * scaleFactor}vw, 12rem)`,
          fontWeight: "700",
          color: colors.primary,
          opacity: "0",
          left: `${25 + 25 * index}%`,
          top: isMobile ? "10%" : "15%",
          transform: "translate(-50%, -50%)",
          fontFamily: "GoldenEye, sans-serif",
          padding: `${1 * scaleFactor}vmin`,
          userSelect: "none",
          textShadow: "0 0 15px rgba(224, 224, 224, 0.7)",
        },
        container,
        letter
      )
    );

    const words = ["METROSEXUAL", "AWARENESS", "NIGHT"];
    const wordElements = words.map((word, index) =>
      createElement(
        "div",
        {
          position: "absolute",
          fontSize: `clamp(1rem, ${2.5 * scaleFactor}vw, 3rem)`,
          fontWeight: "500",
          color: colors.secondary,
          opacity: "0",
          left: "50%",
          top: isMobile ? `${30 + 8 * index}%` : `${25 + 5 * index}%`,
          transform: "translate(-50%, -50%)",
          fontFamily: "GoldenEye, sans-serif",
          textAlign: "center",
          width: isMobile ? "90%" : "30%",
          userSelect: "none",
          textShadow: "0 0 10px rgba(176, 176, 176, 0.5)",
        },
        container,
        word
      )
    );

    const iconEl = createElement(
      "img",
      {
        position: "absolute",
        width: `clamp(6rem, ${28 * scaleFactor}vw, 18rem)`,
        height: "auto",
        left: "50%",
        top: "65%",
        transform: "translate(-50%, -50%)",
        opacity: "0",
        filter: "brightness(0.7) drop-shadow(0 0 15px rgba(255, 64, 129, 0.7))",
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
          boxShadow: "0 0 15px rgba(255, 64, 129, 0.7)",
        },
        container
      )
    );

    const circleEl = createElement(
      "div",
      {
        position: "absolute",
        width: `clamp(4rem, ${10 * scaleFactor}vw, 8rem)`,
        height: `clamp(4rem, ${10 * scaleFactor}vw, 8rem)`,
        border: `${0.5 * scaleFactor}vmin solid ${colors.accent}`,
        borderRadius: "50%",
        left: "50%",
        top: "65%",
        transform: "translate(-50%, -50%)",
        opacity: "0",
        boxShadow: "0 0 30px rgba(255, 64, 129, 0.7)",
      },
      container
    );

    const manFigure = createElement(
      "div",
      {
        position: "absolute",
        width: `clamp(14rem, ${40 * scaleFactor}vw, 30rem)`,
        height: `clamp(21rem, ${60 * scaleFactor}vw, 45rem)`,
        left: "50%",
        top: "55%",
        transform: "translate(-50%, -50%)",
        cursor: "crosshair",
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man-silhouette-UMzygGQMtWa3QaRQwSxP8OfADH4DOp.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: "0",
      },
      container
    );

    const tl = gsap.timeline({ onComplete: () => setAnimationComplete(true) });

    tl.to(letterElements, {
      opacity: 1,
      duration: 0.7,
      stagger: 0.3,
      ease: "power3.inOut",
    }).to(letterElements, {
      y: `-=${4 * scaleFactor}vmin`,
      duration: 0.7,
      stagger: 0.3,
      ease: "power3.inOut",
    });

    tl.to(
      wordElements,
      {
        opacity: 1,
        duration: 0.7,
        stagger: 0.3,
        ease: "power3.inOut",
      },
      "-=0.7"
    );

    tl.to(iconEl, {
      opacity: 1,
      duration: 0.7,
      ease: "power3.inOut",
    });

    tl.to(
      lineElements[0],
      {
        opacity: 1,
        width: "75%",
        left: "12.5%",
        top: "65%",
        height: "3px",
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.7"
    ).to(
      lineElements[1],
      {
        opacity: 1,
        height: "40%",
        left: "50%",
        top: "45%",
        width: "3px",
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.5"
    );

    tl.to(
      circleEl,
      {
        opacity: 1,
        scale: 1.3,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.5"
    );

    tl.to(manFigure, {
      opacity: 1,
      duration: 0.7,
      ease: "power3.inOut",
    });

    gsap.to(manFigure, {
      y: "-=30px",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(circleEl, {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [colors, createElement]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (spotlightRef.current) {
          spotlightRef.current.style.background = `
            radial-gradient(
              circle at ${x}px ${y}px,
              rgba(255, 255, 255,${isDrawerOpen ? "0.05" : "0.15"}) 0%,
              rgba(255, 255, 255,${isDrawerOpen ? "0.03" : "0.08"}) 25%,
              rgba(255, 255, 255, 0) 60%
            )
          `;
        }

        setSightPosition({ x, y });

        if (isMouseDown) {
          createShootingEffect(e);
        }
      }
    };

    if (animationComplete) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animationComplete, isDrawerOpen, isMouseDown, createShootingEffect]);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const GunIndicator: React.FC<{ gunType: number }> = ({ gunType }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" opacity={gunType >= 1 ? "1" : "0.2"} />
      <circle cx="12" cy="12" r="3" opacity={gunType >= 2 ? "1" : "0.2"} />
      <circle cx="12" cy="12" r="1" opacity={gunType === 3 ? "1" : "0.2"} />
    </svg>
  );

  return (
    <div className="font-goldeneye min-h-screen bg-[#1e1e1e] text-[#d4d4d4] select-none overflow-hidden cursor-none">
      <div className="absolute inset-0 backdrop-blur-sm z-10" />
      <div
        ref={containerRef}
        className={`relative w-full h-screen overflow-hidden cursor-crosshair z-20 transition-all duration-300 ${
          isDrawerOpen ? "blur-sm" : ""
        }`}
        aria-label="Interactive animation for Metrosexual Awareness Night (M.A.N.)"
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
        onTouchStart={() => setIsMouseDown(true)}
        onTouchEnd={() => setIsMouseDown(false)}
      >
        <Image
          src="/pinstripe2.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-50"
        />
        <div className="relative z-10 w-full h-full">
          {animationComplete && (
            <div
              ref={spotlightRef}
              className="absolute inset-0 pointer-events-none z-40"
            />
          )}
          {animationComplete && (
            <div
              className="sight absolute pointer-events-none z-60"
              style={{
                left: `${sightPosition.x}px`,
                top: `${sightPosition.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 border-2 border-[#00ff00] rounded-full opacity-60"></div>
              <div className="w-12 h-12 sm:w-20 sm:h-20 border-2 border-[#00ff00] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00ff00] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div
                className="absolute left-1/2 top-0 w-0.5 h-full bg-[#00ff00] opacity-60"
                style={{ transform: "translateX(-50%)" }}
              ></div>
              <div
                className="absolute left-0 top-1/2 w-full h-0.5 bg-[#00ff00] opacity-60"
                style={{ transform: "translateY(-50%)" }}
              ></div>
            </div>
          )}
          <div
            ref={manFigureRef}
            className="absolute w-[clamp(10rem,30vw,25rem)] h-[clamp(15rem,45vw,35rem)] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-contain bg-no-repeat bg-center z-30"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man-silhouette-UMzygGQMtWa3QaRQwSxP8OfADH4DOp.png')",
            }}
          />
        </div>
      </div>

      {animationComplete && (
        <>
          <div className="fixed bottom-4 left-4 flex space-x-2 sm:space-x-4 z-50">
            <motion.button
              onClick={toggleMute}
              className="bg-[#FF588F] text-[#1a1a1a] p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#FF7AA7] transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </motion.button>
            <motion.button
              onClick={changeGun}
              className="bg-[#FF588F] text-[#1a1a1a] p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#FF7AA7] transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GunIndicator gunType={currentGun} />
            </motion.button>
            <motion.button
              onClick={toggleDrawer}
              className="bg-[#FF588F] text-[#1a1a1a] px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg hover:bg-[#FF7AA7] transition-colors duration-300 flex items-center space-x-1 sm:space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info size={18} />
              <span className="font-authentic text-xs sm:text-sm hidden sm:inline">
                EVENT DETAILS
              </span>
            </motion.button>
          </div>
          <AnimatePresence>
            {isDrawerOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleDrawer}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-[90%] sm:max-w-[400px] bg-[#F7F7F7] text-[#555555] overflow-y-auto z-50 cursor-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 sm:p-6 font-authentic">
                    <div className="flex justify-between items-center mb-6 sm:mb-8">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#555555]">
                        Event Details
                      </h2>
                      <button
                        onClick={toggleDrawer}
                        className="text-[#555555] hover:text-[#FF7AA7]"
                        aria-label="Close event information"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <DetailItem
                        icon={<Calendar size={18} />}
                        label="Date"
                        value="SEP 15, 2024"
                      />
                      <DetailItem
                        icon={<Clock size={18} />}
                        label="Time"
                        value="20:00-02:00"
                      />
                      <DetailItem
                        icon={<MapPin size={18} />}
                        label="Venue"
                        value="WHAMMY BAR"
                      />
                      <DetailItem
                        icon={<DollarSign size={18} />}
                        label="Entry Fee"
                        value="$100.00"
                      />
                      <DetailItem
                        icon={<DollarSign size={18} />}
                        label="Metrosexual Concession"
                        value="$15.00"
                      />
                      <DetailItem
                        icon={<Shirt size={18} />}
                        label="Attire"
                        value="METROSEXUAL"
                      />
                      <DetailItem
                        icon={<Users size={18} />}
                        label="Hosts"
                        value="THOM HAHA & MAXWELL YOUNG"
                      />
                      <DetailItem
                        icon={<Music size={18} />}
                        label="DJs"
                        value="HOST B2B, USER 69, DJ CONTRARION, DJ SEÑORITA"
                      />
                    </div>
                    <motion.a
                      href="https://www.undertheradar.co.nz/gig/92332/Metrosexual-Awareness-Night.utr"
                      className="mt-6 sm:mt-8 w-full bg-[#FF588F] text-[#1a1a1a] py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-center font-bold tracking-wider flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Ticket size={18} />
                      <span>BUY TICKETS</span>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {guns.map((gun, index) => (
        <audio
          key={index}
          ref={(el) => {
            if (el) audioRefs.current[index] = el;
          }}
          src={gun.sound}
        />
      ))}

      <style jsx global>{`
        @font-face {
          font-family: "GoldenEye";
          src: url("/fonts/GoldenEye.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: "Authentic Sans";
          src: url("/fonts/authentic-sans-60.otf") format("opentype");
          font-weight: normal;
          font-style: normal;
        }

        body {
          font-family: "GoldenEye", sans-serif;
        }

        .font-authentic {
          font-family: "Authentic Sans", sans-serif;
        }

        .cursor-crosshair {
          cursor: crosshair;
        }

        .cursor-none {
          cursor: none;
        }

        .sight div {
          border-color: #00ff00;
        }

        .sight div:nth-child(3),
        .sight div:nth-child(4),
        .sight div:nth-child(5) {
          background-color: #00ff00;
        }
      `}</style>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 bg-[#E6E6E6] bg-opacity-50 p-2 sm:p-4 rounded-lg">
      <div className="text-[#FF588F] flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <p className="text-xs sm:text-sm font-semibold">{label}</p>
        <p className="text-sm sm:text-base">{value}</p>
      </div>
    </div>
  );
}
