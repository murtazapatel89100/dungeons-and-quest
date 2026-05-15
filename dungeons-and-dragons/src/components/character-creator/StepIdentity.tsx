"use client";

import { ImageIcon, UploadIcon } from "lucide-react";
import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ALIGNMENTS,
  BACKGROUNDS,
  DEITIES,
  GENDERS,
} from "@/lib/character-data";
import { buildCharacterDefaults } from "@/lib/character-rules";
import type { Alignment } from "@/lib/character-types";
import { useCharacter } from "./CharacterStateContext";

export function StepIdentity() {
  const { state, updateNestedState, updateState } = useCharacter();

  // Combine deity arrays
  const filteredDeities = useMemo(() => {
    const alignment = state.identity.alignment || "True Neutral";

    let allowed: { name: string; align: string }[] = [];

    if (alignment.includes("Good")) {
      allowed = [
        ...DEITIES.Good.map((d) => ({ name: d, align: "Good" })),
        ...DEITIES.Neutral.map((d) => ({ name: d, align: "Neutral" })),
      ];
    } else if (alignment.includes("Evil")) {
      allowed = [
        ...DEITIES.Evil.map((d) => ({ name: d, align: "Evil" })),
        ...DEITIES.Neutral.map((d) => ({ name: d, align: "Neutral" })),
      ];
    } else {
      // Neutral alignments
      allowed = [
        ...DEITIES.Neutral.map((d) => ({ name: d, align: "Neutral" })),
        ...DEITIES.Good.map((d) => ({ name: d, align: "Good" })),
      ];
    }

    return allowed;
  }, [state.identity.alignment]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
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

        <div className="space-y-2 md:col-span-2">
          <Label className="text-indigo-200">Portrait (Optional)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="relative">
              <Input
                type="file"
                disabled
                className="hidden"
                id="portrait-upload"
              />
              <Label
                htmlFor="portrait-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg bg-black/20 text-white/50 cursor-not-allowed hover:bg-black/30 transition-colors"
              >
                <UploadIcon className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm font-medium">Upload Image</span>
                <span className="text-xs opacity-75 mt-1">(Coming Soon)</span>
              </Label>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 rounded-lg bg-black/20 text-indigo-200 cursor-pointer hover:bg-black/40 hover:border-indigo-500/50 transition-all group overflow-hidden"
                >
                  {state.identity.imageUrl ? (
                    // biome-ignore lint/performance/noImgElement: Portrait preview
                    <img
                      src={state.identity.imageUrl}
                      alt="Selected Portrait"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium">
                        Choose Portrait
                      </span>
                      <span className="text-xs opacity-75 mt-1 text-white/50">
                        Select from library
                      </span>
                    </>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-indigo-500/30 text-white max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading text-indigo-300">
                    Choose a Portrait
                  </DialogTitle>
                  <DialogDescription className="text-indigo-200/70">
                    Select a portrait for your character from our gallery.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] mt-4 pr-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                    {[
                      ...Array.from(
                        { length: 7 },
                        (_, i) =>
                          `/images/character-portraits/male-portrait-${i + 1}.png`,
                      ),
                      ...Array.from(
                        { length: 5 },
                        (_, i) =>
                          `/images/character-portraits/female-portrait-${i + 1}.png`,
                      ),
                    ].map((portraitPath, i) => {
                      const isSelected =
                        state.identity.imageUrl === portraitPath;
                      return (
                        <button
                          key={portraitPath}
                          type="button"
                          onClick={() =>
                            updateNestedState("identity", {
                              imageUrl: portraitPath,
                            })
                          }
                          className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            isSelected
                              ? "border-indigo-500 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20"
                              : "border-transparent hover:border-indigo-400/50"
                          }`}
                        >
                          {/* biome-ignore lint/performance/noImgElement: Portrait gallery */}
                          <img
                            src={portraitPath}
                            alt={`Portrait ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                              <div className="bg-indigo-600 rounded-full p-1 shadow-lg">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-indigo-200">Gender</Label>
            <Select
              value={state.identity.gender}
              onValueChange={(val) =>
                updateNestedState("identity", { gender: val })
              }
            >
              <SelectTrigger className="bg-black/30 border-white/10 text-white">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                {GENDERS.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            onValueChange={(val) =>
              updateState({
                background: val,
                ...buildCharacterDefaults({
                  race: state.race,
                  characterClass: state.characterClass,
                  background: val,
                }),
              })
            }
          >
            <SelectTrigger className="bg-black/30 border-white/10 text-white">
              <SelectValue placeholder="Select your past life" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white max-h-75">
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
            <SelectContent className="bg-slate-900 border-white/10 text-white max-h-75">
              <SelectItem value="none">None / Agnostic</SelectItem>
              {filteredDeities.map((d) => (
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
