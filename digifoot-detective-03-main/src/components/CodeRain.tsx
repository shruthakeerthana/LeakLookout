
import React, { useEffect, useRef } from 'react';

export const CodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the matrix
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    
    // Create drops
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const drawMatrix = () => {
      // Semi-transparent black background to show trail effect
      ctx.fillStyle = 'rgba(15, 15, 27, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over each drop
      for (let i = 0; i < drops.length; i++) {
        // Generate random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Different shades of blue/cyan
        const colorValue = Math.random();
        let color;
        
        if (colorValue < 0.3) {
          // Main characters (cyan)
          color = '#00e0ff'; 
        } else if (colorValue < 0.5) {
          // Secondary characters (lighter blue)
          color = 'rgba(0, 224, 255, 0.8)';
        } else {
          // Tertiary characters (faded)
          color = 'rgba(0, 224, 255, 0.5)';
        }
        
        ctx.fillStyle = color;
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        drops[i]++;
        
        // Reset drop to top with some randomization
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    const interval = setInterval(drawMatrix, 50);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
