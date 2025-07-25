
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-mobile';

const MascotFloating = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
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
    
    // Horizontal wraparound with immediate repositioning
    if (currentX > screenWidth - 40) {
      x.set(-mascotSize + 40); // Appears from left side
    } else if (currentX < -mascotSize + 40) {
      x.set(screenWidth - 80); // Appears from right side
    }
    
    // Vertical wraparound with immediate repositioning
    if (currentY > screenHeight - 200) {
      y.set(-mascotSize + 40); // Appears from top
    } else if (currentY < -mascotSize + 40) {
      y.set(screenHeight - 240); // Appears from bottom
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

  // Handle double-click for Shaktimaan-style rotation
  const handleDoubleClick = () => {
    setIsSpinning(true);
    setShowCelebration(true);
    setShowWelcomeMessage(true);
    
    // Stop spinning after 1 second
    setTimeout(() => {
      setIsSpinning(false);
      setShowCelebration(false);
    }, 1000);
    
    // Hide welcome message after 3 seconds
    setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000);
  };

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
        animate={{ 
          y: [0, -10, 0],
          rotate: isSpinning ? 1440 : 0 // Faster rotation - 4 full spins
        }}
        transition={{ 
          y: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          },
          rotate: {
            duration: 1, // Much faster rotation
            ease: "linear"
          }
        }}
        onDoubleClick={handleDoubleClick}
        className="cursor-pointer relative"
      >
        {/* Celebration Effects */}
        {showCelebration && (
          <>
            {/* Sparkles/Stars around mascot */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-lg pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center'
                }}
                initial={{ scale: 0, rotate: i * 45 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                  rotate: [i * 45, i * 45 + 360]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut"
                }}
              >
                ⭐
              </motion.div>
            ))}
            
            {/* Welcome Message */}
            <motion.div
              className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 bg-mithila-green text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap pointer-events-none shadow-lg z-10"
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              🎉 Welcome to Mithila Makhana! 🎉
            </motion.div>
          </>
        )}
        
        <img 
          src="/lovable-uploads/6cde9e41-dea8-4d15-8787-d9ee49aca8fe.png" 
          alt="Makhana Mascot" 
          className={`${isMobile ? 'h-20 w-20' : 'h-24 w-24 md:h-32 md:w-32'} object-contain drop-shadow-xl ${showCelebration ? 'brightness-110' : ''}`}
          style={{
            filter: showCelebration 
              ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))" 
              : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))"
          }}
          draggable="false"
        />
      </motion.div>
    </motion.div>
  );
};

export default MascotFloating;
