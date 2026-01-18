"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Tour Context ---

type TourStep = {
  targetId: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
};

type TourContextType = {
  startTour: (steps: TourStep[]) => void;
  stopTour: () => void;
  currentStepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  isOpen: boolean;
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = (newSteps: TourStep[]) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsOpen(true);
  };

  const stopTour = () => {
    setIsOpen(false);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      stopTour();
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <TourContext.Provider
      value={{ startTour, stopTour, currentStepIndex, nextStep, prevStep, isOpen }}
    >
      {children}
      <TourOverlay steps={steps} currentStepIndex={currentStepIndex} isOpen={isOpen} onNext={nextStep} onPrev={prevStep} onStop={stopTour} />
    </TourContext.Provider>
  );
}

// --- Tour Overlay Component ---

// --- Tour Overlay Component ---

function TourOverlay({
  steps,
  currentStepIndex,
  isOpen,
  onNext,
  onPrev,
  onStop,
}: {
  steps: TourStep[];
  currentStepIndex: number;
  isOpen: boolean;
  onNext: () => void;
  onPrev: () => void;
  onStop: () => void;
}) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isOpen || !steps[currentStepIndex]) return;

    const targetId = steps[currentStepIndex].targetId;
    const element = document.getElementById(targetId);
    
    if (!element) return;

    // Scroll to element
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // Track position with RAF for smooth updates during scroll/resize/animation
    let animationFrameId: number;

    const updateRect = () => {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
      animationFrameId = requestAnimationFrame(updateRect);
    };

    updateRect();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, currentStepIndex, steps]);

  if (!isOpen || !steps[currentStepIndex] || !targetRect) return null;

  const step = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] top-0 left-0 w-full h-full pointer-events-none">
       {/* Dark overlays - using specific divs to frame the spotlight */}
       <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         className="absolute bg-background/80 backdrop-blur-[2px] top-0 left-0 w-full transition-all duration-75 ease-out"
         style={{ height: Math.max(0, targetRect.top) }} 
       />
       <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         className="absolute bg-background/80 backdrop-blur-[2px] left-0 w-full transition-all duration-75 ease-out"
         style={{ top: Math.max(0, targetRect.bottom), bottom: 0 }} 
       />
       <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         className="absolute bg-background/80 backdrop-blur-[2px] left-0 transition-all duration-75 ease-out"
         style={{ 
             top: Math.max(0, targetRect.top), 
             height: Math.max(0, targetRect.height), 
             width: Math.max(0, targetRect.left) 
         }} 
       />
       <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
         className="absolute bg-background/80 backdrop-blur-[2px] right-0 transition-all duration-75 ease-out"
         style={{ 
             top: Math.max(0, targetRect.top), 
             height: Math.max(0, targetRect.height), 
             left: Math.max(0, targetRect.right) 
         }} 
       />

       {/* The "Spotlight" Box */}
       <motion.div
          layoutId="spotlight-box"
          className="absolute border-2 border-primary rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] pointer-events-none transition-all duration-75 ease-out"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
       />

       {/* Popover Card */}
       <div className="pointer-events-auto absolute transition-all duration-75 ease-out" 
        style={{
            top: targetRect.bottom + 24, 
            left: Math.min(Math.max(20, targetRect.left + (targetRect.width / 2) - 160), window.innerWidth - 340) // Smart horizontal positioning
        }}
       >
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             key={currentStepIndex}
             className="bg-card text-card-foreground p-6 rounded-xl border shadow-2xl w-[320px]"
          >
             <h3 className="font-bold text-lg mb-2">{step.title}</h3>
             <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{step.description}</p>
             <div className="flex justify-between items-center bg-muted/50 -m-6 mt-0 p-4 rounded-b-xl border-t">
                <span className="text-xs font-medium text-muted-foreground">
                    Step {currentStepIndex + 1} of {steps.length}
                </span>
                <div className="flex gap-2">
                    {currentStepIndex > 0 && (
                        <Button variant="ghost" size="sm" onClick={onPrev} className="h-8">Back</Button>
                    )}
                    <Button size="sm" onClick={onNext} className="h-8">
                        {isLastStep ? "Finish" : "Next"}
                    </Button>
                </div>
             </div>
             <button onClick={onStop} className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors p-1">
                 <span className="sr-only">Close</span>
                 ✕
             </button>
          </motion.div>
       </div>
    </div>
  );
}
