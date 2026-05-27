import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Gift as GiftIcon, Heart, Truck, Landmark } from "lucide-react";

export default function Gift() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const bankAccounts = [
    {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "1650581829",
      holderName: "Dicky Kusumah",
    },
    {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "2832281086",
      holderName: "Lis Fitriaa",
    },
  ];

  const giftAddress = {
    recipient: "Lis Fitriaa & Dicky",
    phone: "0812-3456-7890", // placeholder phone is fine or remove/keep as requested
    fullAddress: "Jalan Udayana, Gang Seroja, RT 05/RW 03, Nomor 16, Kelurahan Kebon Pala, Kecamatan Makasar, Jakarta Timur",
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section
      id="hadiah-section"
      className="py-24 bg-artistic-bg text-artistic-text px-6 relative overflow-hidden selection:bg-artistic-cream-light"
    >
      <div className="absolute top-[10%] left-[-100px] w-[350px] h-[350px] rounded-full bg-artistic-cream-light opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-120px] w-[450px] h-[450px] rounded-full bg-artistic-cream-medium opacity-25 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-[10px] uppercase tracking-[0.35em] text-artistic-gold block mb-2 font-bold select-none">
            WEDDING GIFT
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-artistic-text tracking-wide font-light">
            Kado Digital
          </h3>
          <div className="w-12 h-[1.5px] bg-artistic-gold/40 mx-auto mt-4"></div>
        </div>

        <p className="font-serif text-base text-stone-600 max-w-xl mx-auto mb-16 leading-relaxed font-light">
          Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, Anda dapat menyalurkannya melalui pilihan rekening di bawah ini:
        </p>

        {/* Bank Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {bankAccounts.map((acc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-artistic-border hover:border-artistic-gold/30 rounded-sm p-8 text-left shadow-xs hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-11 h-11 rounded-sm bg-artistic-cream-soft border border-artistic-border flex items-center justify-center text-artistic-gold">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="text-[9px] tracking-[0.2em] font-sans font-bold text-artistic-gold bg-artistic-cream-soft/80 border border-artistic-border px-3 py-1 rounded-sm uppercase">
                  REGULER CARD
                </span>
              </div>

              <p className="font-sans text-[9px] text-[#A8A199] tracking-[0.2em] font-bold uppercase mb-1">
                {acc.bankName}
              </p>
              
              <div className="flex items-center gap-3 mb-6">
                <p className="font-mono text-xl md:text-2xl font-light text-artistic-text tracking-wider">
                  {acc.accountNumber}
                </p>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCopy(acc.accountNumber, `bank-${index}`)}
                  className="w-8 h-8 rounded-sm border border-artistic-border flex items-center justify-center cursor-pointer transition-all hover:bg-artistic-cream-soft text-artistic-text hover:text-artistic-gold bg-white"
                  title="Salin No Rekening"
                >
                  <AnimatePresence mode="wait">
                    {copiedText === `bank-${index}` ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                      >
                        <Check className="w-4 h-4 text-emerald-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <p className="text-[#A8A199] text-[9px] uppercase tracking-[0.2em] font-bold mb-1 font-sans">
                Atas Nama
              </p>
              <p className="font-serif text-lg font-medium text-artistic-text">
                {acc.holderName}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift / Address block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/50 backdrop-blur-md rounded-sm p-8 md:p-10 border border-dashed border-artistic-gold/30 max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-8 text-left relative overflow-hidden"
        >
          {/* Background overlay icon */}
          <Truck className="absolute -right-12 -bottom-12 w-48 h-48 text-stone-800/2 pointer-events-none rotate-12" />

          <div className="w-14 h-14 rounded-sm bg-artistic-cream-soft flex items-center justify-center text-artistic-gold border border-artistic-border shrink-0">
            <GiftIcon className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="font-serif text-xl font-light text-artistic-text mb-2">
              Kirim Kado Fisik
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4 font-light">
              Jika Anda ingin mengirimkan kado berupa barang, Anda dapat mengirimkannya ke alamat rumah mempelai wanita di bawah ini:
            </p>
            
            <div className="p-4 bg-white rounded-sm border border-artistic-border text-xs text-stone-700 leading-relaxed font-sans mb-4">
              <p className="font-serif font-semibold text-artistic-text text-sm mb-1">{giftAddress.recipient}</p>
              <p className="mb-0.5">{giftAddress.phone}</p>
              <p className="text-stone-500 leading-normal">{giftAddress.fullAddress}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCopy(giftAddress.fullAddress, "address")}
              className="flex items-center gap-2 bg-artistic-text hover:bg-artistic-gold text-white leading-none px-6 py-3 rounded-sm text-[10px] tracking-[0.2em] font-sans uppercase font-bold cursor-pointer transition-all shadow-xs"
            >
              {copiedText === "address" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  Alamat Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Salin Alamat Kirim
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Loving Signoff */}
        <div className="mt-20 flex flex-col items-center">
          <Heart className="w-5 h-5 text-artistic-gold/50 fill-artistic-gold/5 mb-3" />
          <span className="font-serif italic text-2xl text-artistic-gold">
            Terima Kasih Banyak atas Kebaikan Anda
          </span>
        </div>
      </div>
    </section>
  );
}
