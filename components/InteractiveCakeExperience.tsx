"use client";

import React, { useEffect, useState } from "react";
import { content } from '@/content';


type Step =
  | "building"
  | "readyToLight"
  | "candlesLit"
  | "candlesOut"
  | "cut"
  | "fireworks"
  | "final";


export const InteractiveCake: React.FC = () => {
  const [buildStage, setBuildStage] = useState(0); // 0–5
  const [step, setStep] = useState<Step>("building");

  // Auto-build cake pieces on first load
  useEffect(() => {
    if (step !== "building") return;
    let current = 0;
    const stages = 5; // plate, base, middle, top, candles
    const interval = setInterval(() => {
      current += 1;
      setBuildStage(current);
      if (current >= stages) {
        clearInterval(interval);
        setTimeout(() => setStep("readyToLight"), 600);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [step]);

  // Handle transition from cut to fireworks
  useEffect(() => {
    if (step === "cut") {
      const timer = setTimeout(() => {
        setStep("fireworks");
      }, 800); // Match knife animation duration
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle fireworks animation
  useEffect(() => {
    if (step === "fireworks") {
      // Duration extended to at least 3 seconds
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const createFirework = (x: number, y: number, color: string) => {
        const particleCount = 40; // Further reduced for tighter bursts
        
        for (let i = 0; i < particleCount; i++) {
          // Realistic firework distribution - tighter circular burst
          const angle = (i * 360 / particleCount);
          const velocity = 0.5 + Math.random() * 1.5; // Lower velocity for tighter bursts
          const size = 2 + Math.random() * 2;
          
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.left = `${x}%`;
          particle.style.top = `${y}%`;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = color;
          particle.style.borderRadius = '50%';
          particle.style.boxShadow = `0 0 ${size}px ${color}`; // Minimal glow for cleaner look
          particle.style.pointerEvents = 'none';
          particle.style.zIndex = '1000';
          
          // Constrain particles to cake scene container
          const cakeScene = document.querySelector('.cake-scene');
          if (cakeScene) {
            cakeScene.appendChild(particle);
          } else {
            document.body.appendChild(particle);
          }
          
          // Realistic firework physics - particles move outward then fall
          const radians = (angle * Math.PI) / 180;
          const vx = Math.cos(radians) * velocity;
          const vy = Math.sin(radians) * velocity;
          
          let posX = x;
          let posY = y;
          let opacity = 1;
          let gravity = 0.02; // Gentle gravity for realistic fall
          let vyCurrent = vy;
          
          const animate = () => {
            posX += vx;
            vyCurrent += gravity;
            posY += vyCurrent;
            opacity -= 0.01; // Faster fade for crisp effect
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = `${opacity}`;
            
            // Constrain particles to visible area (0-100%)
            if (opacity > 0 && posY >= 0 && posY <= 100 && posX >= 0 && posX <= 100) {
              requestAnimationFrame(animate);
            } else {
              particle.remove();
            }
          };
          
          requestAnimationFrame(animate);
        }
      };

      // Create growing text effect
      const createGrowingText = () => {
        // Check if text container already exists
        let textContainer = document.getElementById('birthday-text-container');
        let textElement: HTMLElement | null;
        
        if (!textContainer) {
          // Create new container if it doesn't exist
          textContainer = document.createElement('div');
          textContainer.id = 'birthday-text-container';
          // Attach to cake scene instead of body to keep it scoped to this component
          const cakeScene = document.querySelector('.cake-scene');
          if (cakeScene) {
            textContainer.style.position = 'absolute';
            textContainer.style.top = '0';
            textContainer.style.left = '0';
            textContainer.style.width = '100%';
            textContainer.style.height = '100%';
            textContainer.style.display = 'flex';
            textContainer.style.flexDirection = 'column';
            textContainer.style.justifyContent = 'center';
            textContainer.style.alignItems = 'center';
            textContainer.style.zIndex = '2000';
            textContainer.style.pointerEvents = 'none';
            
            textElement = document.createElement('div');
            textElement.textContent = 'Happy Birthday, Tunnu Babyyy ❤️';
            textElement.className = 'font-script'; // Use the same script font as "Our Story"
            textElement.style.color = '#ff6ba9';
            textElement.style.fontSize = '36px'; // Larger initial size for better script font display
            textElement.style.textAlign = 'center';
            textElement.style.opacity = '0';
            textElement.style.transform = 'scale(0.3)'; // Smaller initial scale to compensate for larger font
            textElement.style.transition = 'all 2s ease-out';
            textElement.style.textShadow = '0 0 15px rgba(255, 107, 169, 0.8)';
            
            textContainer.appendChild(textElement);
            cakeScene.appendChild(textContainer);
          }
        } else {
          // Use existing text element
          textElement = textContainer.firstChild;
        }
        
        // Trigger animation after a small delay
        setTimeout(() => {
          if (textElement) {
            textElement.style.opacity = '1';
            textElement.style.transform = 'scale(1.5)'; // Adjusted scale for script font
          }
        }, 100);
        
        // Don't remove the text - let it persist
      };

      const colors = ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24", "#60a5fa", "#34d399"];
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          clearInterval(interval);
          // Create growing text effect
          createGrowingText();
          // Clean up any remaining particles
          setTimeout(() => setStep("final"), 200);
          return;
        }
        
        // Create fireworks at strategic positions for realistic effect
        const positions = [
          { x: 25, y: 30 },
          { x: 50, y: 25 },
          { x: 75, y: 30 },
          { x: 40, y: 45 },
          { x: 60, y: 45 }
        ];
        
        const pos = positions[Math.floor(Math.random() * positions.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        createFirework(pos.x, pos.y, color);
        
        // Extra concentrated fireworks near the end
        if (timeLeft < 1000) {
          setTimeout(() => {
            const pos2 = positions[Math.floor(Math.random() * positions.length)];
            const color2 = colors[Math.floor(Math.random() * colors.length)];
            createFirework(pos2.x, pos2.y, color2);
          }, 200);
        }
      }, 400); // Slower interval for more deliberate bursts

      // Initial concentrated fireworks
      setTimeout(() => createFirework(50, 30, colors[0]), 100);
      setTimeout(() => createFirework(35, 35, colors[1]), 500);
      setTimeout(() => createFirework(65, 35, colors[2]), 900);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Cleanup effect to remove text when component unmounts
  useEffect(() => {
    return () => {
      // Remove the birthday text container when component unmounts
      const textContainer = document.getElementById('birthday-text-container');
      if (textContainer) {
        textContainer.remove();
      }
    };
  }, []);

  const handleLight = () => setStep("candlesLit");
  const handleBlow = () => setStep("candlesOut");
  const handleCut = () => setStep("cut");

  const showCandles = buildStage >= 5;

  return (
    <section className="cake-scene">
      <div className="container-custom relative z-10">
        <div className="cake-stage" style={{ opacity: step === 'fireworks' || step === 'final' ? 0 : 1, transition: 'opacity 1s ease' }}>
          <div className="cake-pedestal" data-visible={buildStage >= 1} />
          <div className="cake-layer cake-layer--bottom" data-visible={buildStage >= 2} />
          <div className="cake-cream cake-cream--bottom" data-visible={buildStage >= 2} />

          <div className="cake-layer cake-layer--middle" data-visible={buildStage >= 3} />
          <div className="cake-cream cake-cream--middle" data-visible={buildStage >= 3} />

          <div className="cake-layer cake-layer--top" data-visible={buildStage >= 4} />

          {showCandles && (
            <div className="cake-candles" data-lit={step === "candlesLit" ? "true" : "false"}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="candle" key={i}>
                  <div className="candle-body" />
                  <div className="candle-flame" />
                  <div className="candle-smoke" />
                </div>
              ))}
            </div>
          )}

          {step === "cut" && (
            <div className="cake-knife">
              <div className="knife-tip" />
              <div className="knife-blade" />
              <div className="knife-handle" />
            </div>
          )}

          {step === "fireworks" && (
            <div className="fireworks-placeholder" />
          )}

          {step === 'final' && (
            <div className="final-message">
              <span>{content.hero.title}</span>
            </div>
          )}
        </div>

        <div className="cake-controls">
          {step === "readyToLight" && (
            <button onClick={handleLight}>Light the candles</button>
          )}
          {step === "candlesLit" && (
            <button onClick={handleBlow}>Blow the candles</button>
          )}
          {step === "candlesOut" && (
            <button onClick={handleCut}>Cut the cake</button>
          )}
          {step === "final" && (
            <p className="after-text">{content.hero.subtitle} ↓</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveCake;