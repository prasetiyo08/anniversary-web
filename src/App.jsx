import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

// --- DATA KONTEN ---
const DATA = {
  recipient: "Intan Putri Wulandari",
  startDate: "2025-03-08",
  musicUrl: "/music/All%20We%20Are.mp3",
  rainMusicUrl: "/music/rain.mp3", 
  stories: [
    { text: "Since meeting you, my KKN has felt very colorful, nothing can beat that moment in my life, nothing can replace it, you are so beautiful in my heart. Your smile has a way of brightening even my darkest days, and I'm so grateful to have you by my side.",
       img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/A.JPG" },
    { text: "We've shared so many laughs, weathered so many storms, and we've built memories I'll cherish forever. You're not just my nyanya, but also my most comfortable place, my home.",
       img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/B.jpeg" },
    { text: "I promise to keep choosing you every single day. Happy Anniversary, Intan. I look forward to many more years of happiness and growth with you.",
       img: "https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/C.jpeg" },
  ],
};

// --- EFEK HUJAN (DIPERJELAS) ---
const CustomRainEffect = () => {
  const rainDrops = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 0.8 + 0.8, 
    opacity: Math.random() * 0.6 + 0.4 
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {rainDrops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: '-10vh', x: `${drop.left}vw`, opacity: 0 }}
          animate={{ y: '110vh', x: `${drop.left - 10}vw`, opacity: drop.opacity }}
          transition={{ duration: drop.duration, delay: drop.delay, ease: 'linear', repeat: Infinity }}
          style={{ position: 'absolute', top: 0, width: '3px', height: '50px', background: 'linear-gradient(transparent, rgba(255,255,255,1))', borderRadius: '50%', boxShadow: '0 0 5px rgba(255,255,255,0.5)' }}
        />
      ))}
    </div>
  );
};

// --- EFEK KILAT (PETIR) ---
const LightningEffect = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 0, 0.8, 0, 0, 0.4, 0, 0, 0, 0, 0, 0, 0, 0],
        background: ["transparent", "transparent", "rgba(255,255,255,0.5)", "transparent", "transparent", "rgba(220,180,255,0.3)", "transparent"] 
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
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
  const rainAudioRef = useRef(null); 

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
    
    if (rainAudioRef.current) {
      rainAudioRef.current.volume = 0.5; 
      rainAudioRef.current.play().catch((err) => console.log(err));
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
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (audioRef.current) audioRef.current.muted = newMuteState;
    if (rainAudioRef.current) rainAudioRef.current.muted = newMuteState;
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

  // --- WARNA TEKS BARU: Ungu Gelap Lembut ---
  const glowingText = {
    color: "#6A4C93", // Ungu Gelap Lembut
    textShadow: "0 0 15px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 1px 1px 2px rgba(255, 255, 255, 1)"
  };

  return (
    <div style={{ 
      backgroundImage: "url('/background/bg.png')", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh", 
      fontFamily: "'Playfair Display', serif", 
      overflowX: 'hidden' 
    }}>
      <audio ref={audioRef} src={DATA.musicUrl} loop />
      <audio ref={rainAudioRef} src={DATA.rainMusicUrl} loop autoPlay />

      {journeyStarted && <LightningEffect />}
      {showHearts && <CustomRainEffect />}

      {journeyStarted && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={toggleMute}
          style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000, background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "50%", padding: "12px", cursor: "pointer", backdropFilter: "blur(5px)", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
        >
          {isMuted ? <VolumeX size={24} color="#6A4C93" /> : <Volume2 size={24} color="#6A4C93" />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!journeyStarted ? (
          <motion.div key="overlay" exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} transition={{ duration: 2, ease: "easeInOut" }}
            style={{ 
              position: "fixed", inset: 0, zIndex: 100, 
              backgroundColor: "rgba(255, 255, 255, 0.3)", 
              backdropFilter: "blur(5px)", 
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" 
            }}
          >
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8 }} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "30px", fontWeight: "800", letterSpacing: "2px", ...glowingText }}>
              For You, <br /> {DATA.recipient}
            </motion.h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startJourney} style={{ padding: "18px 50px", backgroundColor: "#fff", color: "#6A4C93", border: "none", borderRadius: "40px", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", letterSpacing: "1px" }}>
              Open Letter
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3.5, delay: 0.5 }}>
            
            <section style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "20px" }}>
              <div style={{ padding: "40px", background: "transparent", maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ letterSpacing: "6px", marginBottom: "20px", fontWeight: "800", textTransform: "uppercase", ...glowingText }}>Dear Intan,</p>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: "40px", fontWeight: "900", ...glowingText }}>Happy Anniversary</h2>
                
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 1 }}
                  style={{ width: "180px", height: "180px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)", backdropFilter: "blur(5px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(255,255,255,0.5)", border: "2px solid rgba(255,255,255,0.8)" }}
                >
                  <span style={{ fontSize: "4rem", fontWeight: "bold", lineHeight: "1", ...glowingText }}>{days}</span>
                  <span style={{ fontSize: "0.8rem", letterSpacing: "3px", fontWeight: "800", marginTop: "5px", ...glowingText }}>DAYS</span>
                </motion.div>
                
                <p style={{ marginTop: "40px", fontSize: "1.2rem", fontStyle: "italic", lineHeight: "1.8", fontWeight: "700", ...glowingText }}>
                  "Today is a celebration of us, and the beautiful journey we've embarked upon."
                </p>
              </div>

              <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginTop: "50px", fontWeight: "800", letterSpacing: "1px", ...glowingText }}> ↓ Scroll Down My Love ↓ </motion.div>
            </section>

            <section style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 5 }}>
              {DATA.stories.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{ display: "flex", flexDirection: window.innerWidth < 768 ? "column" : index % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "50px", marginBottom: "120px" }}
                >
                  <div style={{ flex: 1, width: "100%" }}>
                    <motion.div whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 2 : -2 }} style={{ backgroundColor: "transparent", padding: "0", transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})` }}>
                      <img src={item.img} alt="Memories" style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.4)" }} />
                    </motion.div>
                  </div>
                  
                  <div style={{ flex: 1.2, textAlign: index % 2 === 0 ? "left" : "right" }}>
                    <p style={{ fontSize: "1.4rem", lineHeight: "2", backgroundColor: "transparent", padding: "10px", fontWeight: "700", ...glowingText }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </section>

            <footer style={{ padding: "150px 20px", textAlign: "center", position: "relative", zIndex: 5 }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginBottom: "30px" }}>
                <Heart fill="#6A4C93" size={56} color="#6A4C93" style={{ filter: "drop-shadow(0px 0px 15px rgba(255,255,255,1))" }} />
              </motion.div>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "15px", fontWeight: "900", ...glowingText }}>I Love You, {DATA.recipient}</h3>
              <p style={{ fontSize: "1.2rem", fontWeight: "800", ...glowingText }}>Always and Forever.</p>
              <div style={{ marginTop: "100px", fontSize: "0.9rem", fontWeight: "700", opacity: 0.9, ...glowingText }}> Made with ❤️ by Prasetiyo </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopUp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(10px)' }}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#6A4C93', padding: '50px 40px', borderRadius: '30px', textAlign: 'center', maxWidth: '450px', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.9)' }}
            >
              <Heart fill="#6A4C93" size={50} style={{ marginBottom: '25px', margin: '0 auto' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '15px', fontWeight: 'bold' }}>One last thing...</h2>
              <p style={{ marginBottom: '35px', lineHeight: '1.7', color: '#6A4C93', fontSize: '1.1rem', fontWeight: "600" }}>Will you continue this beautiful journey with me for the next 365 days and beyond?</p>
              <button 
                onClick={() => {
                  triggerLavenderExplosion();
                  setPopUpAnswered(true);
                  setShowPopUp(false);
                  setTimeout(() => alert("I love you more than words can say! My heart is yours forever. ❤️"), 2000);
                }}
                style={{ padding: '15px 40px', backgroundColor: '#6A4C93', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', boxShadow: "0 10px 25px rgba(106, 76, 147, 0.4)", transition: 'all 0.3s' }}
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