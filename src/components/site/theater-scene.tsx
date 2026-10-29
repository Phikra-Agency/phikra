"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TheaterScene — video hero with premium quality + seamless smooth loop.
 *
 * Video: /images/hero-video-web.mp4 (art studio creative process, 720p H.264).
 *
 * Seamless loop technique:
 *  - JavaScript crossfade: near the end of the video (last 1.5s), a black
 *    overlay fades in. When the video loops back to start, the overlay
 *    fades out. This masks the visual jump between last and first frame.
 *  - Combined with the baked-in fade-to-black at the end of the video.
 *
 * Premium enhancements:
 *  - 720p H.264 high quality (crf 24)
 *  - Grain overlay (noisy graphite texture)
 *  - Cinematic vignette (double layer)
 *  - Letterbox bars (2.39:1 cinema feel)
 *  - Color grade (crimson soft-light veil)
 *  - Slow Ken Burns scale on the video container (subtle life)
 */
export function TheaterScene() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [loopFade, setLoopFade] = useState(0); // 0 = visible, 1 = black

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    function onCanPlay() {
      setReady(true);
      v.play?.().catch(() => {});
    }

    function onTimeUpdate() {
      // Crossfade to black in the last 1.5 seconds, then fade back in at loop
      const remaining = v.duration - v.currentTime;
      if (remaining < 1.5) {
        setLoopFade(1 - remaining / 1.5);
      } else if (v.currentTime < 1.0) {
        // Fade in from black at the start (after loop)
        setLoopFade(1 - v.currentTime / 1.0);
      } else {
        setLoopFade(0);
      }
    }

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* Video / poster layer with subtle Ken Burns */}
      {reduce ? (
        <img
          src="/images/hero-video-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-video-poster.jpg"
          preload="auto"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={ready ? { opacity: 1, scale: [1.05, 1.08, 1.05] } : { opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <source src="/images/hero-video-web.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* Loop crossfade overlay — black fade for seamless loop */}
      {!reduce && (
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-ink transition-opacity duration-100"
          style={{ opacity: loopFade }}
          aria-hidden
        />
      )}

      {/* Darkening gradient for text legibility (left side + bottom) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,3,4,0.92) 0%, rgba(5,3,4,0.65) 35%, rgba(5,3,4,0.2) 62%, transparent 100%), linear-gradient(180deg, transparent 40%, rgba(5,3,4,0.7) 100%)",
        }}
        aria-hidden
      />

      {/* Color grade — crimson soft-light veil for brand cohesion */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(180deg, rgba(80,10,20,0.25) 0%, rgba(20,5,10,0.08) 50%, rgba(80,10,20,0.2) 100%)",
        }}
        aria-hidden
      />

      {/* Film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Cinematic vignette (double layer for depth) */}
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 25%, rgba(5,3,4,0.45) 70%, rgba(2,1,2,0.85) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[4] mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(0,0,0,0.5) 0%, transparent 30%), radial-gradient(circle at 100% 0%, rgba(0,0,0,0.5) 0%, transparent 30%), radial-gradient(circle at 0% 100%, rgba(0,0,0,0.4) 0%, transparent 30%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.4) 0%, transparent 30%)",
        }}
        aria-hidden
      />

      {/* Letterbox bars (cinema 2.39:1) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-[5%]"
        style={{ background: "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[5%]"
        style={{ background: "linear-gradient(to top, #000 0%, #000 70%, transparent 100%)" }}
        aria-hidden
      />
    </div>
  );
}
