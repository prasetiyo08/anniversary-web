import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX } from "lucide-react";

// --- DATA KONTEN ---
const DATA = {
  recipient: "Intan Putri Wulandari",
  startDate: "2023-05-15",
  // URL Raw GitHub untuk musik (Pastikan spasi diganti dengan %20 agar terbaca browser)
  musicUrl: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/Iron & Wine - Flightless Bird, American Mouth.mp3",
  stories: [
    {
      text: "Since meeting you, my KKN has felt very colorful, nothing can beat that moment in my life, nothing can replace it, you are so beautiful in my heart. Your smile has a way of brightening even my darkest days, and I'm so grateful to have you by my side.",
      img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/A.JPG",
    },
    {
      text: "We've shared so many laughs, weathered so many storms, and we've built memories I'll cherish forever. You're not just my nyanya, but also my most comfortable place, my home.",
      img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/B.jpeg",
    },
    {
      text: "I promise to keep choosing you every single day. Happy Anniversary, Intan. I look forward to many more years of happiness and growth with you.",
      img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/C.jpeg",
    },
  ],
};

export default function App() {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [days, setDays] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const start = new Date(DATA.startDate);
    const now = new Date();
    setDays(Math.floor((now - start) / (1000 * 60 * 60 * 24)));
  }, []);

  // Memulai perjalanan: Trigger animasi dan musik
  const startJourney = () => {
    setJourneyStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // Volume 60% agar pas
      audioRef.current.play().catch((err) => console.log("Playback blocked:", err));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#9DC183", // Hijau Telor Asin
        color: "#F8FBF8",
        minHeight: "100vh",
        fontFamily: "'Playfair Display', serif", // Mengasumsikan font serif romantis
      }}
    >
      {/* Audio Element Hidden */}
      <audio ref={audioRef} src={DATA.musicUrl} loop />

      {/* Floating Mute Button */}
      {journeyStarted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMute}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 1000,
            background: "rgba(255,255,255,0.2)",
            border: "2px solid white",
            borderRadius: "50%",
            padding: "12px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          {isMuted ? <VolumeX size={24} color="white" /> : <Volume2 size={24} color="white" />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!journeyStarted ? (
          <motion.div
            key="overlay"
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(15px)",
            }}
            transition={{
              duration: 2.8, // Sangat slow
              ease: [0.43, 0.13, 0.23, 0.96], // Sangat soft
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              backgroundColor: "#9DC183",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8 }}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                marginBottom: "30px",
                fontWeight: "lighter",
                letterSpacing: "2px",
              }}
            >
              For You, <br /> {DATA.recipient}
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startJourney}
              style={{
                padding: "18px 50px",
                backgroundColor: "#F8FBF8",
                color: "#9DC183",
                border: "none",
                borderRadius: "40px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1.1rem",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            >
              Open Letter
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3.5, delay: 0.8 }} // Muncul sangat halus
          >
            {/* HERO SECTION */}
            <section
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <p style={{ letterSpacing: "5px", marginBottom: "15px", opacity: 0.8, fontSize: "0.9rem" }}>
                DEAR INTAN,
              </p>
              <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginBottom: "40px", fontWeight: "bold" }}>
                Happy Anniversary
              </h2>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.05)"
                }}
              >
                <span style={{ fontSize: "4rem", fontWeight: "bold" }}>{days}</span>
                <span style={{ fontSize: "0.8rem", letterSpacing: "3px" }}>DAYS TOGETHER</span>
              </motion.div>
              <p
                style={{
                  marginTop: "50px",
                  maxWidth: "650px",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  lineHeight: "1.8",
                  opacity: 0.9
                }}
              >
                "Today is a celebration of us, and the beautiful journey we've
                embarked upon."
              </p>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                style={{ marginTop: "60px", fontSize: "0.9rem", opacity: 0.7 }}
              >
                ↓ Scroll Down My Love ↓
              </motion.div>
            </section>

            {/* ZIGZAG STORIES */}
            <section style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
              {DATA.stories.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection:
                      window.innerWidth < 768
                        ? "column"
                        : index % 2 === 0
                        ? "row"
                        : "row-reverse",
                    alignItems: "center",
                    gap: "60px",
                    marginBottom: "150px",
                  }}
                >
                  {/* FOTO DENGAN BINGKAI KREM */}
                  <div style={{ flex: 1, width: "100%" }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        backgroundColor: "#FDF5E6", // Warna Krem (Old Lace)
                        padding: "15px",            // Tebal Bingkai
                        borderRadius: "10px",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                        border: "1px solid #F5F5DC" // Definisi Tepi
                      }}
                    >
                      <img
                        src={item.img}
                        alt="Our Memories"
                        style={{
                          width: "100%",
                          height: "450px",
                          objectFit: "cover",
                          borderRadius: "4px", // Sudut foto sedikit membulat di dalam bingkai
                        }}
                      />
                    </motion.div>
                  </div>

                  <div
                    style={{
                      flex: 1.2,
                      textAlign: index % 2 === 0 ? "left" : "right",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.35rem",
                        lineHeight: "2",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        padding: "35px",
                        borderRadius: "25px",
                        backdropFilter: "blur(5px)",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </section>

            {/* FINAL MESSAGE */}
            <footer
              style={{
                padding: "150px 20px",
                textAlign: "center",
                background: "linear-gradient(transparent, rgba(0,0,0,0.1))",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ marginBottom: "30px" }}
              >
                <Heart fill="#F8FBF8" size={56} />
              </motion.div>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>I Love You, {DATA.recipient}</h3>
              <p style={{ fontSize: "1.1rem", opacity: 0.8, letterSpacing: "2px" }}>
                Always and Forever.
              </p>
              <div style={{ marginTop: "100px", fontSize: "0.8rem", opacity: 0.5 }}>
                Made with ❤️ by Prasetiyo
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}