import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, Copy, Check, ExternalLink } from "lucide-react";

export default function Acara() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const events = [
    {
      title: "Akad Nikah",
      date: "Jumat, 19 Juni 2026",
      time: "10:00 - 11:00 WIB",
      venue: "Kediaman Mempelai Pria",
      address: "Jalan Udayana, Gang Seroja, RT 05/RW 03, Nomor 16, Kelurahan Kebon Pala, Kecamatan Makasar, Jakarta Timur",
      mapUrl: "https://maps.google.com/?q=Jalan+Udayana,+Gang+Seroja,+RT+05/RW+03,+Nomor+16,+Kebon+Pala,+Makasar,+Jakarta+Timur",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Dicky+%26+Lis&dates=20260619T030000Z/20260619T040000Z&details=Acara+pernikahan+Dicky+dan+Lis.+Kami+mengharapkan+kehadiran+anda.&location=Jalan+Udayana,+Gang+Seroja,+RT+05/RW+03,+Nomor+16,+Kelurahan+Kebon+Pala,+Kecamatan+Makasar,+Jakarta+Timur&sf=true&output=xml",
    },
    {
      title: "Resepsi Pernikahan",
      date: "Jumat, 19 Juni 2026",
      time: "13:00 - Selesai WIB",
      venue: "Kediaman Mempelai Pria",
      address: "Jalan Udayana, Gang Seroja, RT 05/RW 03, Nomor 16, Kelurahan Kebon Pala, Kecamatan Makasar, Jakarta Timur",
      mapUrl: "https://maps.google.com/?q=Jalan+Udayana,+Gang+Seroja,+RT+05/RW+03,+Nomor+16,+Kebon+Pala,+Makasar,+Jakarta+Timur",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Dicky+%26+Lis&dates=20260619T060000Z/20260619T100000Z&details=Resepsi+pernikahan+Dicky+dan+Lis.+Kami+mengharapkan+kehadiran+anda.&location=Jalan+Udayana,+Gang+Seroja,+RT+05/RW+03,+Nomor+16,+Kelurahan+Kebon+Pala,+Kecamatan+Makasar,+Jakarta+Timur&sf=true&output=xml",
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      id="acara-section"
      className="py-24 bg-artistic-bg text-artistic-text px-6 relative selection:bg-artistic-cream-light"
    >
      <div className="absolute top-[10%] right-[-100px] w-[350px] h-[350px] rounded-full bg-artistic-cream-light opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-120px] w-[450px] h-[450px] rounded-full bg-artistic-cream-medium opacity-25 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-artistic-gold block mb-2 font-bold">
            AGENDA UTAMA
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-artistic-text tracking-wide">
            Waktu &amp; Tempat
          </h3>
          <div className="w-12 h-[1.5px] bg-artistic-gold/40 mx-auto mt-4"></div>
        </div>

        {/* Events Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white/60 backdrop-blur-md rounded-sm p-8 md:p-10 border border-artistic-border hover:border-artistic-gold/30 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <h4 className="font-serif text-2xl font-light text-artistic-text mb-6 pb-4 border-b border-artistic-border">
                  {event.title}
                </h4>

                <div className="space-y-5 text-stone-600 text-sm">
                  {/* Date info row */}
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-sm bg-artistic-cream-soft flex items-center justify-center text-artistic-gold shrink-0 border border-artistic-border">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#A8A199] font-sans tracking-widest uppercase mb-0.5 font-bold">Hari / Tanggal</p>
                      <p className="font-serif font-medium text-artistic-text text-base">{event.date}</p>
                    </div>
                  </div>

                  {/* Time info row */}
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-sm bg-artistic-cream-soft flex items-center justify-center text-artistic-gold shrink-0 border border-artistic-border">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#A8A199] font-sans tracking-widest uppercase mb-0.5 font-bold">Waktu</p>
                      <p className="font-sans font-medium text-artistic-text text-base">{event.time}</p>
                    </div>
                  </div>

                  {/* Place info row */}
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-sm bg-artistic-cream-soft flex items-center justify-center text-artistic-gold shrink-0 border border-artistic-border">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#A8A199] font-sans tracking-widest uppercase mb-0.5 font-bold">Tempat</p>
                      <p className="font-serif font-medium text-artistic-text text-base mb-1">{event.venue}</p>
                      <p className="text-stone-500 font-sans text-xs leading-relaxed">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Frame */}
              <div className="mt-10 pt-6 border-t border-artistic-border flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href={event.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-artistic-text hover:bg-artistic-gold text-white py-3.5 px-4 rounded-sm text-[10px] tracking-[0.2em] font-sans uppercase font-bold transition-all shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  Simpan Agenda
                </motion.a>

                <div className="flex gap-2 flex-1 sm:flex-none">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(event.address, index)}
                    className="flex-1 sm:flex-none w-12 h-12 rounded-sm border border-artistic-border hover:border-artistic-gold text-artistic-text hover:text-artistic-gold flex items-center justify-center cursor-pointer transition-all relative bg-white"
                    title="Salin Alamat"
                  >
                    <AnimatePresence mode="wait">
                      {copiedIndex === index ? (
                        <motion.div
                          key="copied"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Check className="w-4.5 h-4.5 text-emerald-600" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none w-12 h-12 rounded-sm bg-artistic-cream-soft hover:bg-artistic-cream-medium text-artistic-gold flex items-center justify-center border border-artistic-border transition-colors"
                    title="Petunjuk Jalan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
