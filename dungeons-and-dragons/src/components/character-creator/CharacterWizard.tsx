"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { validateCharacter } from "@/lib/character-validation";
import { CharacterProvider, useCharacter } from "./CharacterStateContext";
import { StepAbilities } from "./StepAbilities";
import { StepDetails } from "./StepDetails";
import { StepEquipment } from "./StepEquipment";
import { StepIdentity } from "./StepIdentity";
import { StepRaceClass } from "./StepRaceClass";

const STEPS = [
  { id: "identity", title: "Identity", component: StepIdentity },
  { id: "race-class", title: "Race & Class", component: StepRaceClass },
  { id: "abilities", title: "Attributes", component: StepAbilities },
  { id: "equipment", title: "Gear & Magic", component: StepEquipment },
  { id: "details", title: "Persona", component: StepDetails },
];

function WizardContent() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const router = useRouter();
  const { state } = useCharacter();

  const currentStep = STEPS[currentStepIndex];
  const CurrentStepComponent = currentStep.component;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;
  const allWarnings = useMemo(() => validateCharacter(state), [state]);
  const stepWarnings = isFirstStep
    ? []
    : allWarnings.filter((w) => w.step === currentStep.id);

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Complete character
      localStorage.setItem("dnd_character_sheet", JSON.stringify(state));
      router.push("/characters/sheet");
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8 min-h-[calc(100vh-140px)]">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-2xl">
        <div>
          <h1 className="text-2xl md:text-4xl font-black font-heading tracking-wider text-transparent bg-clip-text bg-linear-to-r from-neutral-100 to-neutral-400 mb-2">
            Chronicles of the Hero
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Forge your destiny and shape your legend.
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative px-2">
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
                className="flex flex-col items-center gap-2 relative z-10"
              >
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 backdrop-blur-sm
                    ${
                      isCompleted
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                        : isCurrent
                          ? "bg-primary border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                          : "bg-card border-white/10 text-muted-foreground"
                    }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <span className="text-xs md:text-sm font-semibold font-heading">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`hidden sm:block text-[10px] md:text-xs font-medium text-center ${isCurrent ? "text-white" : "text-muted-foreground"}`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warnings Display */}
      {stepWarnings.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-amber-500">
              Character Builder Recommendations
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-7">
            {stepWarnings.map((warning) => (
              <li key={warning.message} className="text-sm text-amber-200/80">
                {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}

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
      <div className="flex flex-row justify-between items-center py-4 gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
          className="flex-1 sm:flex-none border-white/10 bg-black/40 hover:bg-white/10 hover:text-white shrink-0"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <Button
          onClick={handleNext}
          className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50 shrink-0 px-4 md:px-8"
        >
          {isLastStep ? "Complete" : "Next Step"}{" "}
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
