"use client";

import { useState } from "react";
import { CharacterProvider } from "./CharacterStateContext";
import { GeneratorControls } from "./GeneratorControls";
import { StepIdentity } from "./StepIdentity";
import { StepRaceClass } from "./StepRaceClass";
import { StepAbilities } from "./StepAbilities";
import { StepEquipment } from "./StepEquipment";
import { StepDetails } from "./StepDetails";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  { id: "identity", title: "Identity", component: StepIdentity },
  { id: "race-class", title: "Race & Class", component: StepRaceClass },
  { id: "abilities", title: "Attributes", component: StepAbilities },
  { id: "equipment", title: "Gear & Magic", component: StepEquipment },
  { id: "details", title: "Persona", component: StepDetails },
];

function WizardContent() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const CurrentStepComponent = STEPS[currentStepIndex].component;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (!isFirstStep) setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8 min-h-[calc(100vh-140px)]">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-2xl">
        <div>
          <h1 className="text-4xl font-black font-['Cinzel'] tracking-wider text-transparent bg-clip-text bg-linear-to-r from-neutral-100 to-neutral-400 mb-2">
            Chronicles of the Hero
          </h1>
          <p className="text-muted-foreground">
            Forge your destiny and shape your legend.
          </p>
        </div>

        {/* Generator Controls (compact or popover depending on design, just mounting here for now) */}
        <GeneratorControls />
      </div>

      {/* Progress Indicator */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-indigo-500/50 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
          }}
        />

        <div className="relative flex justify-between w-full">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-2 relative z-10 w-24"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 backdrop-blur-sm
                    ${isCompleted ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' :
                      isCurrent ? 'bg-primary border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
                        'bg-card border-white/10 text-muted-foreground'}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold font-['Cinzel']">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-medium text-center ${isCurrent ? 'text-white' : 'text-muted-foreground'}`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="flex-1 bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative min-h-125">
        <div className="p-6 sm:p-8 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center py-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
          className="border-white/10 bg-black/40 hover:bg-white/10 hover:text-white shrink-0"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Button
          onClick={handleNext}
          className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50 shrink-0 px-8"
        >
          {isLastStep ? "Complete Character" : "Next Step"}{" "}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export function CharacterWizard() {
  return (
    <CharacterProvider>
      <WizardContent />
    </CharacterProvider>
  );
}
