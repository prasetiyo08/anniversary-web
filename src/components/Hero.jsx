// src/components/Hero.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ startDate }) => {
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const start = new Date(startDate);
      const now = new Date();
      const difference = now - start;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDaysSince(days);
    };

    calculateDays();
    // Update every hour just in case
    const timer = setInterval(calculateDays, 3600000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <motion.section 
      className="section flex flex-col items-center justify-center min-h-screen text-center z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.p 
        className="text-primary-mint uppercase tracking-widest text-sm mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Our Journey Began
      </motion.p>
      
      <motion.h1 
        className="text-6xl md:text-7xl mb-8 leading-tight"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Happy <span style={{color: 'var(--primary-mint)'}}>Anniversary</span>, My Love
      </motion.h1>

      <motion.div 
        className="bg-light-mint p-8 rounded-full shadow-inner flex flex-col items-center justify-center"
        style={{ width: '250px', height: '250px', border: '2px solid white' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
      >
        <span className="text-6xl font-bold text-primary-mint">{daysSince}</span>
        <span className="text-lg uppercase tracking-wider text-text-dark mt-2 font-semibold">Days of Us</span>
      </motion.div>

      <motion.p 
        className="mt-12 max-w-lg text-lg italic text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        "Every day with you is a favorite day. So, today is my new favorite day."
      </motion.p>
    </motion.section>
  );
};

export default Hero;