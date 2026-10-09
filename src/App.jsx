import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

// --- DATA KONTEN ---
const DATA = {
  recipient: "Intan Putri Wulandari",
  startDate: "2025-03-08",
  musicUrl: "/music/All%20We%20Are.mp3",
  stories: [
    { text: "Since meeting you, my KKN has felt very colorful, nothing can beat that moment in my life, nothing can replace it, you are so beautiful in my heart. Your smile has a way of brightening even my darkest days, and I'm so grateful to have you by my side.",
       img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/A.JPG" },
    { text: "We've shared so many laughs, weathered so many storms, and we've built memories I'll cherish forever. You're not just my nyanya, but also my most comfortable place, my home.",
       img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/B.jpeg" },
    { text: "I promise to keep choosing you every single day. Happy Anniversary, Intan. I look forward to many more years of happiness and growth with you.",
       img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/C.jpeg" },
  ],
};

// --- KOMPONEN HUJAN LOVE ---
const FloatingHearts = () => {
  const hearts = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 8,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 5,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: -50, x: `${heart.x}vw` }}
          animate={{ opacity: [0, 1, 1, 0], y: '100vh', rotate: Math.random() * 360 }}
          transition={{ duration: heart.duration, delay: heart.delay, ease: 'linear', repeat: Infinity }}
          style={{ position: 'absolute', top: 0, fontSize: `${heart.size}px`, color: 'rgba(248, 251, 248, 0.7)' }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [days, setDays] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpAnswered, setPopUpAnswered] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const start = new Date(DATA.startDate);
    const now = new Date();
    setDays(Math.floor((now - start) / (1000 * 60 * 60 * 24)));
  }, []);

  useEffect(() => {
    let timer;
    if (journeyStarted && !popUpAnswered) {
      const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          timer = setTimeout(() => {
            setShowPopUp(true);
          }, 3000); 
          window.removeEventListener("scroll", handleScroll);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
      };
    }
  }, [journeyStarted, popUpAnswered]);

  const startJourney = () => {
    setJourneyStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((err) => console.log(err));
    }

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FDF5E6', '#F8FBF8'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FDF5E6', '#F8FBF8'] });
    }, 250);

    setTimeout(() => setShowHearts(true), 5000);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const triggerLavenderExplosion = () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: Math.random() * 360,
        spread: 55,
        origin: { x: Math.random(), y: -0.1 },
        colors: ["#E6E6FA", "#D8BFD8", "#B19CD9", "#FFFFFF"],
        ticks: 300,
        gravity: 0.5,
        scalar: Math.random() * 0.5 + 0.8,
        drift: Math.random() * 1 - 0.5 
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div style={{ 
      /* --- MODIFIKASI BACKGROUND DISINI --- */
      backgroundImage: "url('/background.png')", 
      backgroundSize: "cover", // Membuat gambar memenuhi layar
      backgroundPosition: "center", // Posisi gambar di tengah
      backgroundAttachment: "fixed", // INI YANG MEMBUAT BACKGROUND DIAM SAAT DI-SCROLL
      backgroundRepeat: "no-repeat", // Mencegah gambar berulang
      color: "#F8FBF8", 
      minHeight: "100vh", 
      fontFamily: "'Playfair Display', serif", 
      overflowX: 'hidden' 
    }}>
      <audio ref={audioRef} src={DATA.musicUrl} loop />

      {showHearts && <FloatingHearts />}

      {journeyStarted && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={toggleMute}
          style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000, background: "rgba(255,255,255,0.2)", border: "2px solid white", borderRadius: "50%", padding: "12px", cursor: "pointer", backdropFilter: "blur(8px)" }}
        >
          {isMuted ? <VolumeX size={24} color="white" /> : <Volume2 size={24} color="white" />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!journeyStarted ? (
          <motion.div key="overlay" exit={{ opacity: 0, scale: 1.08, filter: "blur(15px)" }} transition={{ duration: 2.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ 
              position: "fixed", inset: 0, zIndex: 100, 
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Memberikan efek gelap agar teks terbaca, namun background tetap terlihat
              backdropFilter: "blur(3px)", // Memberikan efek blur tipis
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" 
            }}
          >
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8 }} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "30px", fontWeight: "lighter", letterSpacing: "2px", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
              For You, <br /> {DATA.recipient}
            </motion.h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startJourney} style={{ padding: "18px 50px", backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#F8FBF8", border: "2px solid white", borderRadius: "40px", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem", backdropFilter: "blur(10px)", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
              Open Letter
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3.5, delay: 0.8 }}>
            
            {/* HERO SECTION */}
            <section style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px", backgroundColor: "rgba(0,0,0,0.2)" }}>
              <p style={{ letterSpacing: "5px", marginBottom: "15px", opacity: 0.9, textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>DEAR INTAN,</p>
              <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginBottom: "40px", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}>Happy Anniversary</h2>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 1.5 }}
                style={{ width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(10px)", boxShadow: "0 15px 35px rgba(0,0,0,0.2)" }}
              >
                <span style={{ fontSize: "4rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>{days}</span>
                <span style={{ fontSize: "0.8rem", letterSpacing: "3px", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>DAYS TOGETHER</span>
              </motion.div>
              <p style={{ marginTop: "50px", maxWidth: "650px", fontSize: "1.2rem", fontStyle: "italic", lineHeight: "1.8", opacity: 0.9, textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
                "Today is a celebration of us, and the beautiful journey we've embarked upon."
              </p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginTop: "60px", opacity: 0.9, textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}> ↓ Scroll Down My Love ↓ </motion.div>
            </section>

            {/* STORIES SECTION */}
            <section style={{ padding: "80px 20px", maxWidth: "1100px", margin: "0 auto", backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "20px", marginTop: "20px" }}>
              {DATA.stories.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: window.innerWidth < 768 ? "column" : index % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "60px", marginBottom: "150px" }}
                >
                  <div style={{ flex: 1, width: "100%" }}>
                    <motion.div whileHover={{ scale: 1.02 }} style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "15px", borderRadius: "10px", boxShadow: "0 15px 40px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(5px)" }}>
                      <img src={item.img} alt="Memories" style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "4px" }} />
                    </motion.div>
                  </div>
                  <div style={{ flex: 1.2, textAlign: index % 2 === 0 ? "left" : "right" }}>
                    <p style={{ fontSize: "1.35rem", lineHeight: "2", backgroundColor: "rgba(0,0,0,0.4)", padding: "35px", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </section>

            <footer style={{ padding: "150px 20px", textAlign: "center", background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginBottom: "30px" }}>
                <Heart fill="#F8FBF8" size={56} color="#F8FBF8" style={{ filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))" }} />
              </motion.div>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "15px", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>I Love You, {DATA.recipient}</h3>
              <p style={{ fontSize: "1.1rem", opacity: 0.9, textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>Always and Forever.</p>
              <div style={{ marginTop: "100px", fontSize: "0.8rem", opacity: 0.7, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}> Made with ❤️ by Prasetiyo </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL POP-UP */}
      <AnimatePresence>
        {showPopUp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' }}
          >
            <motion.div 
              initial={{ scale: 0.7, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', padding: '40px', borderRadius: '30px', textAlign: 'center', maxWidth: '400px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
            >
              <Heart fill="#E74C3C" size={48} style={{ marginBottom: '20px', margin: '0 auto' }} />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>One last thing...</h2>
              <p style={{ marginBottom: '30px', lineHeight: '1.6', color: '#555' }}>Will you continue this beautiful journey with me for the next 365 days and beyond?</p>
              <button 
                onClick={() => {
                  triggerLavenderExplosion();
                  setPopUpAnswered(true);
                  setShowPopUp(false);
                  setTimeout(() => alert("I love you more than words can say! My heart is yours forever. ❤️"), 2000);
                }}
                style={{ padding: '12px 35px', backgroundColor: '#E74C3C', color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', boxShadow: "0 4px 15px rgba(231, 76, 60, 0.4)" }}
              >
                Yes, I will! ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}