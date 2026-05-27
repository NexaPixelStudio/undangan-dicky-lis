import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Send, Users, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { GuestWish } from "../types";
import { submitGuestbook, subscribeGuestbook } from "../../lib/guestbook";

export default function RsvpSection() {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "hadir",
    guestCount: 1,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTimestamp = (date: Date | null) => {
  if (!date) return "Baru saja";

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(".", ":");

  return `${formattedDate}, ${formattedTime}`;
};

useEffect(() => {
  const unsubscribe = subscribeGuestbook(
    (items) => {
      const firebaseWishes: GuestWish[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        attendance: item.attendance,
        guestCount: item.guestCount,
        message: item.message,
        timestamp: formatTimestamp(item.createdAt),
      }));

      setWishes(firebaseWishes);
    },
    (error) => {
      console.error("Gagal memuat buku tamu:", error);
    }
  );

  return () => unsubscribe();
}, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAttendanceChange = (status: "hadir" | "tidak_hadir" | "ragu") => {
    setFormData((prev) => ({
      ...prev,
      attendance: status,
      // Default guests count representation
      guestCount: status === "tidak_hadir" ? 0 : prev.guestCount === 0 ? 1 : prev.guestCount,
    }));
  };

  const handleIncrement = () => {
    if (formData.attendance === "tidak_hadir") return;
    setFormData((prev) => ({
      ...prev,
      guestCount: Math.min(prev.guestCount + 1, 5),
    }));
  };

  const handleDecrement = () => {
    if (formData.attendance === "tidak_hadir") return;
    setFormData((prev) => ({
      ...prev,
      guestCount: Math.max(prev.guestCount - 1, 1),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return;

  const newErrors: Record<string, string> = {};

  if (!formData.name.trim()) {
    newErrors.name = "Mohon isi nama lengkap Anda.";
  }

  if (!formData.message.trim()) {
    newErrors.message = "Mohon berikan doa restu atau ucapan.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    await submitGuestbook({
      name: formData.name.trim(),
      attendance: formData.attendance as "hadir" | "tidak_hadir" | "ragu",
      guestCount: formData.attendance === "tidak_hadir" ? 0 : formData.guestCount,
      message: formData.message.trim(),
    });

    if (formData.attendance === "hadir") {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#C5A06B", "#F59E0B", "#10B981", "#3B82F6"],
      });
      triggerToast("Terima kasih atas konfirmasinya! Sampai jumpa di hari bahagia kami.");
    } else if (formData.attendance === "ragu") {
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.65 },
        colors: ["#C5A06B", "#D1D5DB"],
      });
      triggerToast("Terima kasih atas konfirmasinya! Semoga diberikan kelancaran bagi Anda.");
    } else {
      triggerToast("Terima kasih atas doa restunya yang tulus!");
    }

    setFormData({
      name: "",
      attendance: "hadir",
      guestCount: 1,
      message: "",
    });

    setErrors({});
  } catch (error) {
    console.error("Gagal mengirim ucapan:", error);
    triggerToast("Ucapan gagal dikirim. Coba lagi sebentar.");
  } finally {
    setIsSubmitting(false);
  }
};
  // Safe helper to obtain monogram letter
  const getInitial = (name: string) => {
    return name ? name.trim().charAt(0).toUpperCase() : "G";
  };

  return (
    <section
      id="rsvp-section"
      className="py-24 bg-artistic-bg text-artistic-text px-6 relative selection:bg-artistic-cream-light"
    >
      <div className="absolute top-[20%] right-[-100px] w-[350px] h-[350px] rounded-full bg-artistic-cream-light opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-120px] w-[450px] h-[450px] rounded-full bg-artistic-cream-medium opacity-25 blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-artistic-gold block mb-2 font-bold font-sans">
            STAY CONNECTED
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-artistic-text tracking-wide font-light">
            Ucapan &amp; Kehadiran
          </h3>
          <div className="w-12 h-[1.5px] bg-artistic-gold/40 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* RSVP FORM BLOCK (Left side) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-12 xl:col-span-5 bg-white/50 backdrop-blur-md rounded-sm p-8 border border-artistic-border shadow-xs flex flex-col justify-between"
          >
            <div>
              <h4 className="font-serif text-2xl font-light text-artistic-text mb-2">
                Konfirmasi Kehadiran
              </h4>
              <p className="text-[#9D958B] font-sans text-xs leading-relaxed mb-8 font-light">
                Harap mengisi form rsvp sebagai tanda konfirmasi kehadiran Anda untuk mempersiapkan kenyamanan perayaan:
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div>
                  <label htmlFor="name-input" className="block text-[9px] uppercase tracking-[0.2em] font-bold text-artistic-gold mb-2 font-sans">
                    Nama Lengkap Tamu
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Sarah Az-Zahra"
                    className={`w-full bg-white/70 border ${
                      errors.name ? "border-rose-300" : "border-artistic-border"
                    } focus:border-artistic-gold rounded-sm px-5 py-3.5 text-stone-800 text-sm focus:outline-none transition-all placeholder:text-stone-300 font-sans`}
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Custom Attending Status Tabs */}
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-artistic-gold mb-3 font-sans">
                    Konfirmasi Kedatangan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "hadir", label: "Hadir", bg: "hover:bg-artistic-cream-soft bg-white hover:border-artistic-gold/30 text-artistic-text", activeBg: "bg-artistic-text border-artistic-text text-white font-bold" },
                      { key: "ragu", label: "Ragu", bg: "hover:bg-artistic-cream-soft bg-white hover:border-artistic-gold/30 text-artistic-text", activeBg: "bg-artistic-gold border-artistic-gold text-white font-bold" },
                      { key: "tidak_hadir", label: "Absen", bg: "hover:bg-artistic-cream-soft bg-white hover:border-artistic-gold/30 text-artistic-text", activeBg: "bg-stone-500 border-stone-500 text-white font-bold" },
                    ].map((btn) => {
                      const isActive = formData.attendance === btn.key;
                      return (
                        <button
                          key={btn.key}
                          type="button"
                          onClick={() => handleAttendanceChange(btn.key as any)}
                          className={`py-3 px-3 rounded-sm text-xs font-sans text-center border cursor-pointer transition-all duration-300 ${
                            isActive ? btn.activeBg + " shadow-xs" : btn.bg + " border-artistic-border"
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest counter */}
                <AnimatePresence>
                  {formData.attendance !== "tidak_hadir" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-artistic-gold mb-3.5 font-sans">
                        Jumlah Pengunjung
                      </label>
                      
                      <div className="flex items-center gap-4 bg-white border border-artistic-border rounded-sm p-2 w-fit">
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className="w-10 h-10 rounded-sm hover:bg-artistic-cream-soft border border-artistic-border flex items-center justify-center text-stone-600 font-semibold cursor-pointer transition-colors"
                          title="Kurang"
                        >
                          -
                        </button>
                        <div className="flex items-center gap-1.5 px-4 font-sans text-sm font-semibold text-artistic-text">
                          <Users className="w-4 h-4 text-artistic-gold" />
                          <span>{formData.guestCount} Tamu</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleIncrement}
                          className="w-10 h-10 rounded-sm hover:bg-artistic-cream-soft border border-artistic-border flex items-center justify-center text-stone-600 font-semibold cursor-pointer transition-colors"
                          title="Tambah"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message / Wish textarea */}
                <div>
                  <label htmlFor="message-input" className="block text-[9px] uppercase tracking-[0.2em] font-bold text-artistic-gold mb-2 font-sans">
                    Pesan &amp; Doa Restu
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tuliskan ucapan selamat dan doa tulus bagi kedua mempelai..."
                    className={`w-full bg-white/70 border ${
                      errors.message ? "border-rose-300" : "border-artistic-border"
                    } focus:border-artistic-gold rounded-sm px-5 py-4 text-stone-800 text-sm focus:outline-none transition-all placeholder:text-stone-300 font-sans resize-none`}
                  />
                  {errors.message && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
             <motion.button
                id="btn-submit-rsvp"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-artistic-text hover:bg-artistic-gold text-white py-4 rounded-sm text-xs font-sans tracking-[0.25em] uppercase font-bold cursor-pointer transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed">
                <Send className="w-3.5 h-3.5 text-white" />
                {isSubmitting ? "MENGIRIM..." : "UCAPAN & KEHADIRAN"}
              </motion.button>

              </form>
            </div>
          </motion.div>

          {/* GUESTBOOK WISHES (Right side) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-12 xl:col-span-7 bg-white/50 backdrop-blur-md rounded-sm p-8 border border-artistic-border shadow-xs flex flex-col justify-between self-stretch"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-artistic-cream-soft border border-artistic-border flex items-center justify-center text-artistic-gold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-light text-artistic-text leading-tight">
                      Buku Tamu
                    </h4>
                    <span className="text-[9px] tracking-[0.2em] text-[#A8A199] font-sans font-bold uppercase">
                      Hantaran Harapan Baik
                    </span>
                  </div>
                </div>

                <div className="bg-artistic-cream-soft text-artistic-gold border border-artistic-border text-[9px] py-1.5 px-3 rounded-sm font-sans font-bold tracking-[0.1em] uppercase">
                  {wishes.length} Doa Terkirim
                </div>
              </div>

              {/* Wishes scrolling panel */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 scrollable-panel">
                <AnimatePresence initial={false}>
                  {wishes.map((wish) => {
                    const initial = getInitial(wish.name);
                    
                    // Simple styling helpers for attendee badges
                    let badgeColor = "bg-stone-100 text-stone-600 border-stone-200/50";
                    let badgeText = "Hadir";
                    if (wish.attendance === "ragu") {
                      badgeColor = "bg-artistic-cream-soft text-artistic-gold border-artistic-border";
                      badgeText = "Ragu-ragu";
                    } else if (wish.attendance === "tidak_hadir") {
                      badgeColor = "bg-rose-50 text-rose-700 border-rose-200/40";
                      badgeText = "Absen";
                    } else {
                      badgeColor = "bg-emerald-50 text-emerald-850 border-emerald-250/20";
                      badgeText = wish.guestCount > 1 ? `Hadir (${wish.guestCount} Tamu)` : "Hadir";
                    }

                    return (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="p-5 rounded-sm border border-artistic-border hover:border-artistic-gold/20 hover:shadow-xs hover:bg-white transition-all flex gap-4 bg-white/40"
                      >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-sm bg-artistic-cream-soft border border-artistic-border flex items-center justify-center text-artistic-gold font-serif font-light shrink-0">
                          {initial}
                        </div>

                        {/* Text and stats */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-serif font-semibold text-artistic-text text-sm">
                              {wish.name}
                            </span>
                            <span className={`text-[8.5px] tracking-widest uppercase px-2 py-0.5 rounded-sm border font-sans font-bold ${badgeColor}`}>
                              {badgeText}
                            </span>
                          </div>

                          <p className="text-stone-600 font-sans text-sm leading-relaxed whitespace-pre-line bg-white/70 p-3 rounded-sm border border-artistic-border italic font-light">
                            "{wish.message}"
                          </p>

                          <span className="text-[9px] text-stone-400 mt-2 block font-sans text-right uppercase tracking-wider">
                            {wish.timestamp}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Canvas-Confetti notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 bg-stone-900 border border-white/10 px-6 py-4 rounded-sm shadow-2xl flex items-center gap-2.5 text-white text-xs tracking-[0.15em] uppercase font-sans font-bold text-center w-[90%] sm:w-auto"
          >
            <CheckCircle2 className="w-4 h-4 text-artistic-gold shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
