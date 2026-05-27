import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AudioPlayerProps {
  isPlayingInitially?: boolean;
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ isPlayingInitially = false }, ref) => {
    const audioUrl = "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3";
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(isPlayingInitially);
    const [muted, setMuted] = useState(false);

    // Initialize HTMLAudioElement safely on mount
    useEffect(() => {
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;

      if (isPlayingInitially) {
        audio.play().catch((err) => {
          console.warn("Autoplay blocked by browser. Music will play on open click.", err);
          setIsPlaying(false);
        });
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.log("Audio play failed on gesture initiation:", err));
        }
      },
      pause: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    }));

    const togglePlay = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn("Fallback trigger failed:", err));
      }
    };

    const toggleMute = () => {
      if (!audioRef.current) return;
      const newMute = !muted;
      audioRef.current.muted = newMute;
      setMuted(newMute);
    };

    return (
      <div id="romantic-audio-dock" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/90 backdrop-blur-md border border-artistic-border px-4 py-2 rounded-sm shadow-xl text-artistic-text text-[9px] tracking-[0.2em] font-sans uppercase flex items-center gap-2.5"
            >
              <div className="flex gap-0.5 items-end justify-center h-2.5 w-3.5">
                <motion.span animate={{ height: [2, 10, 2] }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="w-0.5 bg-artistic-gold block rounded-full" />
                <motion.span animate={{ height: [2, 12, 2] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.2, ease: "linear" }} className="w-0.5 bg-artistic-gold block rounded-full" />
                <motion.span animate={{ height: [2, 8, 2] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, ease: "linear" }} className="w-0.5 bg-artistic-gold block rounded-full" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[7.5px] uppercase font-bold text-artistic-gold">Now Playing</span>
                <span className="font-sans font-medium text-[9px]">Romansa Melodi — Beautiful Dream</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="btn-toggle-audio"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-xl border transition-all duration-300 ${
            isPlaying
              ? "bg-artistic-gold border-artistic-gold text-white"
              : "bg-white border-artistic-border text-artistic-text"
          }`}
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Music className="w-4 h-4" />
            </motion.div>
          ) : (
            <VolumeX className="w-4 h-4 opacity-60" />
          )}
        </motion.button>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
