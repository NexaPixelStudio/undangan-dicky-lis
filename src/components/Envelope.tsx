import { motion } from "motion/react";
import { MailOpen, Heart } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
  guestName: string;
}

export default function Envelope({ onOpen, guestName }: EnvelopeProps) {
  return (
    <motion.div
      id="envelope-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100vh" }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-artistic-bg p-4 text-artistic-text select-none selection:bg-artistic-cream-light"
    >
      {/* Dynamic Blur Elements from Artistic Flair Design */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-artistic-cream-light opacity-50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-artistic-cream-medium opacity-40 blur-3xl pointer-events-none"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#B48C5E_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Decorative Golden Corner Designs */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-artistic-gold/30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-artistic-gold/30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-artistic-gold/30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-artistic-gold/30"></div>

      <motion.div
        id="envelope-content-card"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="max-w-md w-full bg-white/60 backdrop-blur-md border border-artistic-border p-8 md:p-12 rounded-sm shadow-2xl text-center flex flex-col items-center relative"
      >
        <motion.div 
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-artistic-cream-light/40 flex items-center justify-center mb-6 text-artistic-gold border border-artistic-border"
        >
          <Heart className="w-4 h-4 fill-artistic-gold/10" />
        </motion.div>

        <span className="text-[10px] uppercase tracking-[0.35em] text-artistic-gold font-sans font-bold mb-4">
          The Wedding of
        </span>

        <h1 className="font-serif text-5xl md:text-6xl text-artistic-text select-none my-4 font-light">
          Dicky <br /> <span className="italic font-normal text-artistic-gold">&amp;</span> Lis
        </h1>

        <div className="w-16 h-[1.5px] bg-artistic-gold/30 my-6"></div>

        {guestName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-6 bg-artistic-cream-soft rounded-sm border border-artistic-border w-full"
          >
            <p className="text-[9px] text-[#A8A199] uppercase tracking-widest mb-2 font-sans font-bold">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="font-serif text-2xl font-light text-artistic-text leading-tight">
              {guestName}
            </p>
            <p className="text-[10px] text-artistic-gold mt-2.5 font-sans italic tracking-wide">
              *Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda
            </p>
          </motion.div>
        )}

        <motion.button
          id="btn-open-invitation"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
          className="flex items-center gap-3 bg-artistic-text hover:bg-artistic-gold text-white px-8 py-4 rounded-sm font-sans text-xs tracking-[0.3em] uppercase font-bold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <MailOpen className="w-4 h-4 text-white" />
          Buka Undangan
        </motion.button>
      </motion.div>

      {/* Aesthetic Footer Credit */}
      <span className="absolute bottom-6 font-sans text-[10px] text-artistic-gold tracking-[0.4em] uppercase font-bold">
        10 OKTOBER 2026 • BANDUNG
      </span>
    </motion.div>
  );
}
