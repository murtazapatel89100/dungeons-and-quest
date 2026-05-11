"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import {
  type CharacterState,
  INITIAL_CHARACTER_STATE,
} from "@/lib/character-types";

interface CharacterContextType {
  state: CharacterState;
  updateState: (updates: Partial<CharacterState>) => void;
  updateNestedState: <K extends keyof CharacterState>(
    key: K,
    updates: Partial<CharacterState[K]>,
  ) => void;
  resetState: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined,
);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CharacterState>(INITIAL_CHARACTER_STATE);

  const updateState = (updates: Partial<CharacterState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const updateNestedState = <K extends keyof CharacterState>(
    key: K,
    updates: Partial<CharacterState[K]>,
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        ...(typeof prev[key] === "object" && prev[key] !== null
          ? prev[key]
          : {}),
        ...updates,
      },
    }));
  };

  const resetState = () => setState(INITIAL_CHARACTER_STATE);

  return (
    <CharacterContext.Provider
      value={{ state, updateState, updateNestedState, resetState }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
}
