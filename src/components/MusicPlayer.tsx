import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const musicSrc = `${import.meta.env.BASE_URL}audio/wedding-song.mp3`;

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      setHasStarted(true);
      audioRef.current.volume = 0.45;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Musik gagal diputar:", error);
    }
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  useEffect(() => {
    const handleOpenInvitation = () => {
      playMusic();
    };

    window.addEventListener("play-wedding-music", handleOpenInvitation);

    return () => {
      window.removeEventListener("play-wedding-music", handleOpenInvitation);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
      />

      {hasStarted && (
        <button
          type="button"
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-artistic-border shadow-lg flex items-center justify-center text-artistic-gold hover:bg-artistic-cream-soft transition-all"
          aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
}
