import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

// --- DATA KONTEN ---
const DATA = {
  recipient: "Intan Putri Wulandari",
  startDate: "2025-03-06", // Tepat 365 hari pada 6 Maret 2026
  musicUrl: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/Iron%20&%20Wine%20-%20Flightless%20Bird,%20American%20Mouth.mp3",
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
          style={{ position: 'absolute', top: 0, fontSize: `${heart.size}px`, color: 'rgba(248, 251, 248, 0.5)' }}
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

  // Pop-up muncul dengan jeda 3 detik setelah scroll sampai bawah
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

    // ANIMASI KEMBANG API MERIAH (Side Cannons)
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

  // --- MODIFIKASI: ANIMASI LAVENDER MEWAH YANG DITINGKATKAN ---
  const triggerLavenderExplosion = () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      // Kelopak lavender jatuh secara elegan dari berbagai sisi atas layar
      confetti({
        particleCount: 2,
        angle: Math.random() * 360,
        spread: 55,
        origin: { x: Math.random(), y: -0.1 }, // Jatuh dari atas layar
        colors: ["#E6E6FA", "#D8BFD8", "#B19CD9", "#FFFFFF"],
        ticks: 300,
        gravity: 0.5, // Jatuh lebih lambat & anggun
        scalar: Math.random() * 0.5 + 0.8, // Ukuran variatif
        drift: Math.random() * 1 - 0.5 // Goyangan tertiup angin
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div style={{ backgroundColor: "#9DC183", color: "#F8FBF8", minHeight: "100vh", fontFamily: "'Playfair Display', serif", overflowX: 'hidden' }}>
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
            style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "#9DC183", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
          >
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8 }} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "30px", fontWeight: "lighter", letterSpacing: "2px" }}>
              For You, <br /> {DATA.recipient}
            </motion.h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startJourney} style={{ padding: "18px 50px", backgroundColor: "#F8FBF8", color: "#9DC183", border: "none", borderRadius: "40px", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
              Open Letter
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3.5, delay: 0.8 }}>
            
            {/* HERO SECTION */}
            <section style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
              <p style={{ letterSpacing: "5px", marginBottom: "15px", opacity: 0.8 }}>DEAR INTAN,</p>
              <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginBottom: "40px", fontWeight: "bold" }}>Happy Anniversary</h2>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 1.5 }}
                style={{ width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(10px)", boxShadow: "0 15px 35px rgba(0,0,0,0.05)" }}
              >
                <span style={{ fontSize: "4rem", fontWeight: "bold" }}>{days}</span>
                <span style={{ fontSize: "0.8rem", letterSpacing: "3px" }}>DAYS TOGETHER</span>
              </motion.div>
              <p style={{ marginTop: "50px", maxWidth: "650px", fontSize: "1.2rem", fontStyle: "italic", lineHeight: "1.8", opacity: 0.9 }}>
                "Today is a celebration of us, and the beautiful journey we've embarked upon."
              </p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginTop: "60px", opacity: 0.7 }}> ↓ Scroll Down My Love ↓ </motion.div>
            </section>

            {/* STORIES SECTION */}
            <section style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
              {DATA.stories.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: window.innerWidth < 768 ? "column" : index % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "60px", marginBottom: "150px" }}
                >
                  <div style={{ flex: 1, width: "100%" }}>
                    <motion.div whileHover={{ scale: 1.02 }} style={{ backgroundColor: "#FDF5E6", padding: "15px", borderRadius: "10px", boxShadow: "0 15px 40px rgba(0,0,0,0.15)", border: "1px solid #F5F5DC" }}>
                      <img src={item.img} alt="Memories" style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "4px" }} />
                    </motion.div>
                  </div>
                  <div style={{ flex: 1.2, textAlign: index % 2 === 0 ? "left" : "right" }}>
                    <p style={{ fontSize: "1.35rem", lineHeight: "2", backgroundColor: "rgba(255,255,255,0.08)", padding: "35px", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </section>

            <footer style={{ padding: "150px 20px", textAlign: "center", background: "linear-gradient(transparent, rgba(0,0,0,0.1))" }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginBottom: "30px" }}>
                <Heart fill="#F8FBF8" size={56} color="#F8FBF8" />
              </motion.div>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>I Love You, {DATA.recipient}</h3>
              <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>Always and Forever.</p>
              <div style={{ marginTop: "100px", fontSize: "0.8rem", opacity: 0.5 }}> Made with ❤️ by Prasetiyo </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL POP-UP DENGAN ANIMASI SOFT */}
      <AnimatePresence>
        {showPopUp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}
          >
            <motion.div 
              initial={{ scale: 0.7, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ backgroundColor: '#F8FBF8', color: '#9DC183', padding: '40px', borderRadius: '30px', textAlign: 'center', maxWidth: '400px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
            >
              <Heart fill="#9DC183" size={48} style={{ marginBottom: '20px', margin: '0 auto' }} />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>One last thing...</h2>
              <p style={{ marginBottom: '30px', lineHeight: '1.6', color: '#555' }}>Will you continue this beautiful journey with me for the next 365 days and beyond?</p>
              <button 
                onClick={() => {
                  triggerLavenderExplosion(); // Efek kelopak lavender jatuh dari atas
                  setPopUpAnswered(true);
                  setShowPopUp(false);
                  setTimeout(() => alert("I love you more than words can say! My heart is yours forever. ❤️"), 2000);
                }}
                style={{ padding: '12px 35px', backgroundColor: '#9DC183', color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}
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