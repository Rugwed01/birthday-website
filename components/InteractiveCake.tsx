"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { content } from "@/content";

export default function InteractiveCake({ onComplete }: { onComplete?: () => void }) {
  const [buildStage, setBuildStage] = useState(0); // 0–5
  const [step, setStep] = useState('building');
  const [showConfetti, setShowConfetti] = useState(false);
  // Audio reference not needed with current implementation

  // No useEffect initialization due to autoplay policies
  // Audio will be created on user interaction
  
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

  const showCandles = buildStage >= 5;

  const handleLight = () => setStep("candlesLit");

  
  const handleBlow = () => {
    // Play birthday song - create a recognizable birthday tune using Web Audio API
    try {
      // Create a more complete birthday tune
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Happy Birthday tune notes (much faster tempo)
      // Frequency chart: C=261.63, D=293.66, E=329.63, F=349.23, G=392, A=440, B=493.88
      const tune = [
        { note: 'G4', frequency: 392, duration: 0.25 },
        { note: 'G4', frequency: 392, duration: 0.25 },
        { note: 'A4', frequency: 440, duration: 0.5 },
        { note: 'G4', frequency: 392, duration: 0.5 },
        { note: 'C5', frequency: 523.25, duration: 0.5 },
        { note: 'B4', frequency: 493.88, duration: 0.5 },
        { note: 'G4', frequency: 392, duration: 0.25 },
        { note: 'G4', frequency: 392, duration: 0.25 },
        { note: 'A4', frequency: 440, duration: 0.5 },
        { note: 'G4', frequency: 392, duration: 0.5 },
        { note: 'D5', frequency: 587.33, duration: 0.5 },
        { note: 'C5', frequency: 523.25, duration: 0.5 }
      ];
      
      // Play each note in sequence
      let startTime = audioContext.currentTime + 0.1; // Small delay to start
      
      tune.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = note.frequency;
        
        // Create smooth envelope for each note
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0.5, startTime + note.duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
        
        startTime += note.duration;
      });
      
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      console.log("Playing birthday tune using Web Audio API");
    } catch (error) {
      console.log("Web Audio API failed, falling back to simple beep:", error);
      
      // Simple fallback beep
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 440; // A note
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Resume audio context if suspended
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      } catch (beepError) {
        console.log("Even simple beep failed:", beepError);
      }
    }
    
    // Proceed with the candles out step
    setStep("candlesOut");
  };
  
  const handleCut = () => setStep("cut");

  // Fireworks effect
  useEffect(() => {
    if (step !== "cut") return;
    
    const timer = setTimeout(() => {
      setStep("fireworks");
      setShowConfetti(true);
      
      // After fireworks, show final message
      const finalTimer = setTimeout(() => {
        setStep("final");
        setShowConfetti(false);
        if (onComplete) onComplete();
      }, 3000); // Match fireworks duration
      
      return () => clearTimeout(finalTimer);
    }, 1000); // Delay before fireworks
    
    return () => clearTimeout(timer);
  }, [step]);

  // Fireworks animation with confetti
  useEffect(() => {
    if (!showConfetti) return;
    
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24"],
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6ba9", "#c084fc", "#fb923c", "#fbbf24"],
    });
    
    return () => {
      clearInterval(interval);
    };
  }, [showConfetti]);

  if (step === "final") {
    return null; // Don't show the cake anymore when final
  }

  return (
    <div className="flex flex-col items-center">
      {/* Cake Animation */}
      <div className="cake-stage">
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
      </div>

      {/* Cake Controls */}
      <div className="cake-controls mt-5">
        {step === "readyToLight" && (
          <button onClick={handleLight}>Light the candles</button>
        )}
        {step === "candlesLit" && (
          <button onClick={handleBlow}>Blow the candles</button>
        )}
        {step === "candlesOut" && (
          <button onClick={handleCut}>Cut the cake</button>
        )}
      </div>
      

    </div>
  );
}