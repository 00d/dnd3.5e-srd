import { z } from 'zod';

export const spellSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  school: z.enum([
    'Abjuration',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Necromancy',
    'Transmutation',
    'Universal',
  ]),
  subschool: z.string().optional(),
  descriptors: z.array(z.string()).default([]),
  level: z.record(z.string(), z.number()).refine(
    (obj) => Object.keys(obj).length > 0,
    { message: 'At least one class level is required' }
  ),
  components: z.object({
    verbal: z.boolean().default(false),
    somatic: z.boolean().default(false),
    material: z.object({
      required: z.boolean().default(false),
      description: z.string().optional(),
    }).optional(),
    focus: z.object({
      required: z.boolean().default(false),
      description: z.string().optional(),
    }).optional(),
    divineFocus: z.boolean().default(false),
    xpCost: z.object({
      required: z.boolean().default(false),
      amount: z.string().optional(),
    }).optional(),
  }),
  castingTime: z.string().min(1, 'Casting time is required'),
  range: z.object({
    type: z.enum(['Personal', 'Touch', 'Close', 'Medium', 'Long', 'Unlimited', 'Custom']),
    distance: z.string().optional(),
  }),
  target: z.string().optional(),
  effect: z.string().optional(),
  area: z.string().optional(),
  duration: z.string().min(1, 'Duration is required'),
  savingThrow: z.string().min(1, 'Saving throw is required'),
  spellResistance: z.boolean(),
  description: z.string().min(1, 'Description is required'),
  materialComponent: z.string().optional(),
  focus: z.string().optional(),
  xpCost: z.string().optional(),
  tags: z.array(z.string()).default([]),
  relatedSpells: z.array(z.string()).default([]),
  status: z.enum(['draft', 'review', 'complete']).default('draft'),
  notes: z.string().optional(),
});

export type Spell = z.infer<typeof spellSchema>;
