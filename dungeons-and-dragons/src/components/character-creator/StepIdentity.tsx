"use client";

import React, { useMemo } from "react";
import { useCharacter } from "./CharacterStateContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALIGNMENTS, DEITIES, BACKGROUNDS } from "@/lib/character-data";
import { Alignment } from "@/lib/character-types";

export function StepIdentity() {
  const { state, updateNestedState, updateState } = useCharacter();

  // Combine deity arrays
  const allDeities = useMemo(() => {
    return [
      ...DEITIES.Good.map((d) => ({ name: d, align: "Good" })),
      ...DEITIES.Neutral.map((d) => ({ name: d, align: "Neutral" })),
      ...DEITIES.Evil.map((d) => ({ name: d, align: "Evil" })),
    ];
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-['Cinzel'] font-bold text-white mb-2">
          Hero Identity
        </h2>
        <p className="text-muted-foreground">
          Who are you before the adventure begins?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-indigo-200">Name</Label>
          <Input
            value={state.identity.name}
            onChange={(e) =>
              updateNestedState("identity", { name: e.target.value })
            }
            placeholder="e.g. Drizzt Do'Urden"
            className="bg-black/30 border-white/10 text-white placeholder:text-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-indigo-200">Title / Epithet (Optional)</Label>
          <Input
            value={state.identity.title}
            onChange={(e) =>
              updateNestedState("identity", { title: e.target.value })
            }
            placeholder="e.g. The Shadowblade"
            className="bg-black/30 border-white/10 text-white placeholder:text-white/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-indigo-200">Gender</Label>
            <Input
              value={state.identity.gender}
              onChange={(e) =>
                updateNestedState("identity", { gender: e.target.value })
              }
              className="bg-black/30 border-white/10 text-white font-['Inter']"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-indigo-200">Age</Label>
            <Input
              value={state.identity.age}
              onChange={(e) =>
                updateNestedState("identity", { age: e.target.value })
              }
              className="bg-black/30 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-indigo-200">Height</Label>
            <Input
              value={state.identity.height}
              onChange={(e) =>
                updateNestedState("identity", { height: e.target.value })
              }
              placeholder="e.g. 5'10&quot;"
              className="bg-black/30 border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-indigo-200">Weight</Label>
            <Input
              value={state.identity.weight}
              onChange={(e) =>
                updateNestedState("identity", { weight: e.target.value })
              }
              placeholder="e.g. 150 lbs"
              className="bg-black/30 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-indigo-200">Alignment</Label>
          <Select
            value={state.identity.alignment}
            onValueChange={(val: Alignment) =>
              updateNestedState("identity", { alignment: val })
            }
          >
            <SelectTrigger className="bg-black/30 border-white/10 text-white">
              <SelectValue placeholder="Choose your alignment path" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              {ALIGNMENTS.map((align) => (
                <SelectItem key={align} value={align}>
                  {align}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-indigo-200">Background</Label>
          <Select
            value={state.background}
            onValueChange={(val) => updateState({ background: val })}
          >
            <SelectTrigger className="bg-black/30 border-white/10 text-white">
              <SelectValue placeholder="Select your past life" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
              {BACKGROUNDS.map((bg) => (
                <SelectItem key={bg} value={bg}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label className="text-indigo-200">Deity</Label>
          <Select
            value={state.identity.deity}
            onValueChange={(val) =>
              updateNestedState("identity", { deity: val })
            }
          >
            <SelectTrigger className="bg-black/30 border-white/10 text-white">
              <SelectValue placeholder="Do you worship a divine being?" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
              <SelectItem value="none">None / Agnostic</SelectItem>
              {allDeities.map((d) => (
                <SelectItem key={d.name} value={d.name}>
                  {d.name}{" "}
                  <span className="opacity-50 text-xs ml-2">({d.align})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
