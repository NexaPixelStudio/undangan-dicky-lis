import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Heart, MapPin } from "lucide-react";

interface HeroProps {
  proposalDate: string; // Target wedding date, e.g. '2026-10-10T09:00:00'
}

export default function Hero({ proposalDate }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false,
  });

  useEffect(() => {
    const target = new Date(proposalDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isArrived: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [proposalDate]);

  return (
    <section className="min-h-screen w-full relative flex flex-col justify-between items-center bg-artistic-bg text-artistic-text p-6 md:p-12 overflow-hidden select-none">
      {/* Decorative Blur Elements from Artistic Flair Design */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-artistic-cream-light opacity-40 blur-3xl pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-120px] w-[400px] h-[400px] rounded-full bg-artistic-cream-medium opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[10%] w-[350px] h-[350px] rounded-full bg-artistic-cream-dark opacity-25 blur-3xl pointer-events-none"></div>

      {/* Grid subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#B48C5E_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Little Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 border border-artistic-border px-6 py-2 rounded-sm bg-white/45 backdrop-blur-xs shadow-xs md:mt-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-artistic-gold animate-pulse"></span>
        <span className="text-[9px] tracking-[0.4em] font-sans uppercase font-bold text-artistic-gold">
          The Wedding of
        </span>
      </motion.div>

      {/* Main Love Header */}
      <div className="flex flex-col items-center justify-center my-auto text-center max-w-2xl px-4 relative z-10 py-16">
        <span className="font-serif italic text-lg text-artistic-gold tracking-[0.25em] block mb-4 uppercase font-light">
          Save The Date
        </span>

        <h2 className="font-serif text-5xl md:text-8xl text-artistic-text font-light leading-tight drop-shadow-xs select-none">
          Dicky <br /> <span className="italic font-normal text-artistic-gold font-serif my-2 block">&amp;</span> Lis
        </h2>

        {/* Dynamic Wave Spline divider */}
        <div className="flex items-center gap-4 my-8 w-full max-w-xs justify-center">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-artistic-gold/40"></div>
          <Heart className="w-4.5 h-4.5 text-artistic-gold/80 fill-artistic-gold/5" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-artistic-gold/40"></div>
        </div>

        <p className="font-serif text-lg md:text-xl text-stone-600 tracking-wide mb-12">
          Kami memohon doa restu Bapak/Ibu/Saudara/i di hari bahagia kami, yang diselenggarakan pada:
          <span className="block font-sans font-bold mt-4 text-artistic-text border-y border-artistic-border py-2.5 w-fit mx-auto px-8 tracking-[0.3em] text-xs uppercase bg-white/20">
            Sabtu, 10 Oktober 2026
          </span>
        </p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-lg mt-2">
          {timeLeft.isArrived ? (
            <div className="col-span-4 p-5 bg-white border border-artistic-border rounded-sm shadow-md">
              <span className="font-serif italic text-lg text-artistic-gold tracking-wider font-light">
                Hari Berbahagia Telah Tiba!
              </span>
            </div>
          ) : (
            <>
              {Object.entries({
                Hari: timeLeft.days,
                Jam: timeLeft.hours,
                Menit: timeLeft.minutes,
                Detik: timeLeft.seconds,
              }).map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col p-3 md:p-5 bg-white border border-artistic-border rounded-sm shadow-md text-center relative overflow-hidden group hover:border-artistic-gold/40 transition-all duration-305"
                >
                  <span className="font-serif text-2xl md:text-4xl font-light text-artistic-text">
                    {value < 10 ? `0${value}` : value}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] font-sans uppercase font-bold text-stone-450 mt-1.5">
                    {label}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-artistic-gold/10 group-hover:bg-artistic-gold/40 transition-colors" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Down Scroll Helper */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1.5 pb-4 opacity-75 hover:opacity-100 transition-opacity z-10 cursor-pointer"
        onClick={() => {
          document.getElementById("mempelai-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] tracking-[0.4em] font-sans uppercase text-stone-400 font-bold">
          Scroll Down
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-artistic-gold/40 to-transparent"></div>
      </motion.div>
    </section>
  );
}
