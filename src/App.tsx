/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Envelope from "./components/Envelope";
import AudioPlayer, { AudioPlayerRef } from "./components/AudioPlayer";
import Hero from "./components/Hero";
import Mempelai from "./components/Mempelai";
import Acara from "./components/Acara";
import Gift from "./components/Gift";
import RsvpSection from "./components/RsvpSection";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState("");
  const audioRef = useRef<AudioPlayerRef | null>(null);

  // Parse guest name from URL parameter `?to=Guest+Name` on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");
    if (toParam) {
      setGuestName(toParam.trim());
    }
  }, []);

  const handleOpenInvitation = () => {
    setOpened(true);
    // Use setTimeout so the audio player element is mounted and ready
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-artistic-bg text-artistic-text font-sans selection:bg-artistic-cream-light selection:text-artistic-text antialiased overflow-x-hidden">
      
      {/* Outer subtle shadow overlay */}
      <AnimatePresence mode="wait">
        {!opened ? (
          <Envelope 
            guestName={guestName} 
            onOpen={handleOpenInvitation} 
          />
        ) : (
          <motion.div
            key="invitation-main-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full relative flex flex-col items-center"
          >
            {/* Top tiny welcome ribbon for customized guest */}
            {guestName && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/60 backdrop-blur-md border border-artistic-border px-4 py-1.5 rounded-sm shadow-xs text-[9px] uppercase font-sans tracking-[0.2em] text-artistic-gold font-bold">
                Spesial untuk: <span className="font-extrabold text-[#332F2C]">{guestName}</span>
              </div>
            )}

            {/* Core invitation sections */}
            <Hero proposalDate="2026-06-19T10:00:00" />
            <Mempelai />
            <Acara />
            <Gift />
            <RsvpSection />

            {/* Persistent background audio controller */}
            <AudioPlayer ref={audioRef} />

            {/* Aesthetic Fine-Print Footer */}
            <footer className="w-full py-16 bg-artistic-text text-[#A8A199] text-center text-[10px] uppercase tracking-[0.25em] font-sans border-t border-artistic-border/10 relative z-10 p-6">
              <p className="text-white font-serif lowercase italic text-[16px] font-light tracking-wide mb-3">
                pernikahan dicky & lis • lestarilah cinta dalam cinta-nya
              </p>
              <p className="font-bold opacity-80">&copy; 2026 All Rights Reserved.</p>
              <p className="text-[#877F76] text-[9px] mt-2 tracking-[0.15em] font-bold">Designed in Artistic Flair Essence</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
