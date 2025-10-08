import { z } from 'zod';

export const weaponSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Simple', 'Martial', 'Exotic']),
  type: z.enum(['Melee', 'Ranged', 'Thrown']),
  size: z.enum(['Light', 'One-Handed', 'Two-Handed']),
  cost: z.string().min(1, 'Cost is required'),
  damage: z.object({
    small: z.string(),
    medium: z.string(),
  }),
  critical: z.string().min(1, 'Critical is required'),
  range: z.string().optional(),
  weight: z.string().min(1, 'Weight is required'),
  damageType: z.array(z.enum(['Slashing', 'Piercing', 'Bludgeoning'])),
  special: z.array(z.string()).default([]),
  description: z.string().optional(),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export const armorSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Light', 'Medium', 'Heavy', 'Shield']),
  cost: z.string().min(1, 'Cost is required'),
  armorBonus: z.number(),
  maxDexBonus: z.number().nullable(),
  armorCheckPenalty: z.number(),
  arcaneSpellFailure: z.number(),
  speed30ft: z.string(),
  speed20ft: z.string(),
  weight: z.string().min(1, 'Weight is required'),
  special: z.array(z.string()).default([]),
  description: z.string().optional(),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export const goodSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  cost: z.string().min(1, 'Cost is required'),
  weight: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export const magicItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  category: z.enum([
    'Armor',
    'Weapon',
    'Potion',
    'Ring',
    'Rod',
    'Scroll',
    'Staff',
    'Wand',
    'Wondrous Item',
    'Artifact',
  ]),
  aura: z.string().optional(),
  casterLevel: z.number().optional(),
  slot: z.string().optional(),
  price: z.string().optional(),
  weight: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  construction: z.object({
    requirements: z.string().optional(),
    cost: z.string().optional(),
  }).optional(),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export type Weapon = z.infer<typeof weaponSchema>;
export type Armor = z.infer<typeof armorSchema>;
export type Good = z.infer<typeof goodSchema>;
export type MagicItem = z.infer<typeof magicItemSchema>;
