
import React from 'react';

const MascotFloating = () => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 animate-float">
      <div className="bg-white/80 p-2 rounded-full shadow-lg">
        <img 
          src="/lovable-uploads/6cde9e41-dea8-4d15-8787-d9ee49aca8fe.png" 
          alt="Makhana Mascot" 
          className="h-20 w-20 md:h-28 md:w-28 object-contain"
        />
      </div>
    </div>
  );
};

export default MascotFloating;
