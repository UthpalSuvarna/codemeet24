'use client'

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Function for creating background animation with moving shapes and particles
function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let animationFrameId: number;

    if (canvas && ctx) {
      const width = canvas.width = window.innerWidth;
      const height = canvas.height = window.innerHeight;

      const particles: { x: number; y: number; r: number; dx: number; dy: number }[] = [];
      const movingShapes: { x: number; y: number; width: number; height: number; speedX: number; speedY: number }[] = [];

      // Create particles
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 4 + 1,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
        });
      }

      // Create moving shapes
      for (let i = 0; i < 10; i++) {
        movingShapes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          width: Math.random() * 200 + 50,  // Rectangular width
          height: Math.random() * 80 + 20,  // Rectangular height
          speedX: (Math.random() - 0.5) * 1.5,  // Horizontal speed
          speedY: (Math.random() - 0.5) * 1.5,  // Vertical speed
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Animate particles
        particles.forEach((p) => {
          p.x += p.dx;
          p.y += p.dy;

          if (p.x < 0 || p.x > width) p.dx = -p.dx;
          if (p.y < 0 || p.y > height) p.dy = -p.dy;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.fill();
          ctx.closePath();
        });

        // Animate moving shapes (rectangles)
        movingShapes.forEach((shape) => {
          shape.x += shape.speedX;
          shape.y += shape.speedY;

          if (shape.x < 0 || shape.x > width) shape.speedX = -shape.speedX;
          if (shape.y < 0 || shape.y > height) shape.speedY = -shape.speedY;

          ctx.save();
          ctx.fillStyle = "rgba(0, 200, 255, 0.3)";
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
          ctx.restore();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen text-center bg-background text-foreground overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation />

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 max-w-4xl p-4"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to{" "}
          <motion.span 
            className="text-primary"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            WellNest
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          className="mt-4 text-xl md:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Your one-stop solution for all your <span className="text-primary">mental health and wellness needs.</span>
        </motion.p>

        {/* Call to Action Button */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/chat">
          <Button 
            className="px-6 py-2 text-lg relative overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0, 200, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            Get Started
          </Button>
        </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
