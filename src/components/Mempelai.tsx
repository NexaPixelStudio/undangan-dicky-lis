import { motion } from "motion/react";
import { Instagram, Sparkles } from "lucide-react";

export default function Mempelai() {
  return (
    <section
      id="mempelai-section"
      className="py-24 bg-artistic-bg text-artistic-text px-6 overflow-hidden relative selection:bg-artistic-cream-light"
    >
      <div className="absolute top-[30%] left-[-100px] w-[350px] h-[350px] rounded-full bg-artistic-cream-light opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-120px] w-[450px] h-[450px] rounded-full bg-artistic-cream-medium opacity-20 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Quranic Verse / Romantic Quote Header block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl border-b border-artistic-border pb-12 mb-16"
        >
          <p className="font-serif text-artistic-gold text-lg md:text-xl italic mb-4 leading-relaxed font-light">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#9D958B] uppercase font-bold">
            — Q.S. Ar-Rum : 21
          </span>
        </motion.div>

        {/* Dynamic Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-artistic-gold block mb-2 font-bold">
            MEMPERKENALKAN
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-artistic-text tracking-wide">
            Kedua Mempelai
          </h3>
          <div className="w-12 h-[1.5px] bg-artistic-gold/40 mx-auto mt-4"></div>
        </div>

        {/* Marriage Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full relative z-10">
          
          {/* THE GROOM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center bg-white/50 backdrop-blur-md rounded-sm p-8 md:p-12 border border-artistic-border hover:border-artistic-gold/30 shadow-xs hover:shadow-xl transition-all duration-300 group"
          >
            <h4 className="font-serif text-2xl font-light text-artistic-text mb-2 pt-4">
              Dicky Kusumah
            </h4>
            
            <p className="text-artistic-gold font-sans text-[10px] tracking-[0.25em] mb-6 font-bold uppercase">
              Mempelai Pria
            </p>
 
            <p className="text-stone-600 text-center text-sm font-sans max-w-xs mb-8 leading-relaxed">
              Putra kedua dari pasangan yang kami hormati:
              <span className="block font-medium font-serif text-artistic-text text-lg mt-3">
                Bapak Suganda (Alm)
              </span>
              <span className="block text-stone-500 text-xs mt-1">
                &amp; Ibu Kokom Komalasari
              </span>
            </p>
 
            <motion.a
              whileHover={{ y: -2 }}
              href="https://instagram.com/dicky.ksmh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-artistic-text hover:text-artistic-gold border border-artistic-border hover:border-artistic-gold px-6 py-2.5 rounded-sm text-[10px] tracking-[0.2em] uppercase font-sans font-bold transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-artistic-gold" />
              @dicky.ksmh
            </motion.a>
          </motion.div>
 
          {/* THE BRIDE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center bg-white/50 backdrop-blur-md rounded-sm p-8 md:p-12 border border-artistic-border hover:border-artistic-gold/30 shadow-xs hover:shadow-xl transition-all duration-300 group"
          >
            <h4 className="font-serif text-2xl font-light text-artistic-text mb-2 pt-4">
              Lis Fitria
            </h4>
            
            <p className="text-artistic-gold font-sans text-[10px] tracking-[0.25em] mb-6 font-bold uppercase">
              Mempelai Wanita
            </p>
 
            <p className="text-stone-600 text-center text-sm font-sans max-w-xs mb-8 leading-relaxed">
              Putri kedua dari pasangan yang kami hormati:
              <span className="block font-medium font-serif text-artistic-text text-lg mt-3">
                Bapak Sarwono
              </span>
              <span className="block text-stone-500 text-xs mt-1">
                &amp; Ibu Nurlela
              </span>
            </p>
 
            <motion.a
              whileHover={{ y: -2 }}
              href="https://instagram.com/lisftra."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-artistic-text hover:text-artistic-gold border border-artistic-border hover:border-artistic-gold px-6 py-2.5 rounded-sm text-[10px] tracking-[0.2em] uppercase font-sans font-bold transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-artistic-gold" />
              @lisftra.
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
