import { z } from 'zod';

export const classSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['Base', 'Prestige', 'NPC']),
  hitDie: z.string().min(1, 'Hit die is required'),
  skillPoints: z.string().min(1, 'Skill points is required'),
  classSkills: z.array(z.string()).default([]),
  weaponProficiencies: z.array(z.string()).default([]),
  armorProficiencies: z.array(z.string()).default([]),
  baseAttackBonus: z.enum(['Good', 'Average', 'Poor']),
  fortitudeSave: z.enum(['Good', 'Poor']),
  reflexSave: z.enum(['Good', 'Poor']),
  willSave: z.enum(['Good', 'Poor']),
  classFeatures: z.array(z.object({
    level: z.number(),
    name: z.string(),
    description: z.string(),
  })).default([]),
  spellcasting: z.object({
    ability: z.string().optional(),
    type: z.enum(['Arcane', 'Divine', 'None']),
    spellsPerDay: z.string().optional(),
  }).optional(),
  requirements: z.object({
    alignment: z.string().optional(),
    baseAttackBonus: z.string().optional(),
    skills: z.record(z.string(), z.number()).optional(),
    feats: z.array(z.string()).optional(),
    spells: z.string().optional(),
    special: z.string().optional(),
  }).optional(),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export const featSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['General', 'Item Creation', 'Metamagic', 'Special']),
  prerequisites: z.array(z.string()).default([]),
  benefit: z.string().min(1, 'Benefit is required'),
  normal: z.string().optional(),
  special: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export const skillSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  keyAbility: z.enum(['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']),
  trainedOnly: z.boolean().default(false),
  armorCheckPenalty: z.boolean().default(false),
  check: z.string().min(1, 'Check description is required'),
  action: z.string().optional(),
  tryAgain: z.string().optional(),
  special: z.string().optional(),
  synergy: z.string().optional(),
  restriction: z.string().optional(),
  untrained: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export type Class = z.infer<typeof classSchema>;
export type Feat = z.infer<typeof featSchema>;
export type Skill = z.infer<typeof skillSchema>;
