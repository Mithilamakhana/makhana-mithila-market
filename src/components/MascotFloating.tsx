
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-mobile';

const MascotFloating = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Motion values for dragging
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Add springs for smoother movement
  const springConfig = { damping: 40, stiffness: 400 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 cursor-grab active:cursor-grabbing touch-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      style={{ x: springX, y: springY }}
      drag
      dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/lovable-uploads/6cde9e41-dea8-4d15-8787-d9ee49aca8fe.png" 
          alt="Makhana Mascot" 
          className={`${isMobile ? 'h-20 w-20' : 'h-24 w-24 md:h-32 md:w-32'} object-contain drop-shadow-xl`}
          style={{
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))"
          }}
          draggable="false"
        />
      </motion.div>
    </motion.div>
  );
};

export default MascotFloating;
