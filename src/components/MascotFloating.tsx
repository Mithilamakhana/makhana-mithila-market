
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

  // Handle wraparound when mascot reaches screen edges
  const handleDrag = () => {
    const currentX = x.get();
    const currentY = y.get();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const mascotSize = isMobile ? 80 : 128;
    
    // More generous horizontal wraparound
    if (currentX > screenWidth + mascotSize) {
      x.set(-mascotSize); // Appears from left side
    } else if (currentX < -mascotSize * 2) {
      x.set(screenWidth); // Appears from right side
    }
    
    // More generous vertical wraparound
    if (currentY > screenHeight + mascotSize) {
      y.set(-mascotSize); // Appears from top
    } else if (currentY < -mascotSize * 2) {
      y.set(screenHeight - 100); // Appears from bottom
    }
  };

  // Use a more frequent boundary check
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    const checkBoundaries = () => {
      handleDrag();
    };
    
    // Check boundaries every 50ms for smoother wraparound
    intervalId = setInterval(checkBoundaries, 50);
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isMobile, x, y]);

  return (
    <motion.div 
      className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-50 cursor-grab active:cursor-grabbing touch-none"
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
      dragMomentum={true}
      onDrag={handleDrag}
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
