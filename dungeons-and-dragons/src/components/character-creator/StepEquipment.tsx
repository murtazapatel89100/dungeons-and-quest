"use client";

import React, { useState } from "react";
import { useCharacter } from "./CharacterStateContext";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WEAPONS, ARMOR, EQUIPMENT_PACKS, SPELLS } from "@/lib/character-data";
import { Switch } from "@/components/ui/switch";

export function StepEquipment() {
  const { state, updateState } = useCharacter();

  const toggleArrayItem = (
    key: "weapons" | "armor" | "equipment",
    item: string,
  ) => {
    const arr = state[key] as string[];
    if (arr.includes(item)) {
      updateState({ [key]: arr.filter((i) => i !== item) });
    } else {
      updateState({ [key]: [...arr, item] });
    }
  };

  const toggleSpell = (level: number, spell: string) => {
    const currentSpells = state.spells[level] || [];
    if (currentSpells.includes(spell)) {
      updateState({
        spells: {
          ...state.spells,
          [level]: currentSpells.filter((s) => s !== spell),
        },
      });
    } else {
      updateState({
        spells: {
          ...state.spells,
          [level]: [...currentSpells, spell],
        },
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="border-b border-white/10 pb-4 shrink-0">
        <h2 className="text-2xl font-['Cinzel'] font-bold text-white mb-2">
          Equipment & Magic
        </h2>
        <p className="text-muted-foreground">
          Arm your character and learn arcane arts.
        </p>
      </div>

      <Tabs defaultValue="weapons" className="flex-1 flex flex-col">
        <TabsList className="bg-black/40 border border-white/10 text-muted-foreground p-1 shrink-0 grid grid-cols-4">
          <TabsTrigger
            value="weapons"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Weapons
          </TabsTrigger>
          <TabsTrigger
            value="armor"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Armor
          </TabsTrigger>
          <TabsTrigger
            value="gear"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Packs
          </TabsTrigger>
          <TabsTrigger
            value="spells"
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            Spells
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto mt-4 pr-2 custom-scrollbar">
          <TabsContent value="weapons" className="space-y-6 mt-0">
            {Object.entries(WEAPONS).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-lg font-semibold text-indigo-300 border-b border-white/5 pb-2">
                  {category} Weapons
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <Label className="text-indigo-100 cursor-pointer flex-1">
                        {item}
                      </Label>
                      <Switch
                        checked={state.weapons.includes(item)}
                        onCheckedChange={() => toggleArrayItem("weapons", item)}
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="armor" className="space-y-6 mt-0">
            {Object.entries(ARMOR).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-lg font-semibold text-indigo-300 border-b border-white/5 pb-2">
                  {category} Armor
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <Label className="text-indigo-100 cursor-pointer flex-1">
                        {item}
                      </Label>
                      <Switch
                        checked={state.armor.includes(item)}
                        onCheckedChange={() => toggleArrayItem("armor", item)}
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="gear" className="space-y-6 mt-0">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-indigo-300 border-b border-white/5 pb-2">
                Starting Kits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EQUIPMENT_PACKS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <Label className="text-indigo-100 cursor-pointer flex-1">
                      {item}
                    </Label>
                    <Switch
                      checked={state.equipment.includes(item)}
                      onCheckedChange={() => toggleArrayItem("equipment", item)}
                      className="data-[state=checked]:bg-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spells" className="space-y-6 mt-0">
            <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-lg mb-6">
              <p className="text-sm text-indigo-200">
                Select spells corresponding to your class spellcasting
                capabilities.
              </p>
            </div>

            {Object.entries(SPELLS).map(([category, items]) => {
              // Convert "Level1" to 1, "Cantrips" to 0
              let numericLevel = parseInt(category.replace("Level", ""), 10);
              if (category === "Cantrips") numericLevel = 0;

              if (isNaN(numericLevel)) return null;

              return (
                <div key={category} className="space-y-3">
                  <h4 className="text-lg font-semibold text-fuchsia-300 border-b border-fuchsia-500/20 pb-2">
                    {category === "Cantrips"
                      ? "Cantrips"
                      : `Level \${numericLevel} Spells`}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((spell) => (
                      <div
                        key={spell}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 hover:bg-fuchsia-900/20 hover:border-fuchsia-500/30 transition-colors"
                      >
                        <Label className="text-indigo-100 cursor-pointer flex-1">
                          {spell}
                        </Label>
                        <Switch
                          checked={(state.spells[numericLevel] || []).includes(
                            spell,
                          )}
                          onCheckedChange={() =>
                            toggleSpell(numericLevel, spell)
                          }
                          className="data-[state=checked]:bg-fuchsia-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
