// src/components/MusicPlayer.jsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Music2 } from 'lucide-react';
import musicFile from '../assets/music.mp3'; // Pastikan file ada

const MusicPlayer = ({ autoPlayTrigger }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Mencoba autoplay ketika trigger aktif (setelah tombol 'Start' diklik)
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.log("Autoplay blocked:", error));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={musicFile} loop />
      <motion.button
        onClick={togglePlay}
        className="p-4 rounded-full bg-primary-mint text-white shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Music size={24} /> : <Music2 size={24} />}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;