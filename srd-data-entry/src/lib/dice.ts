/**
 * Dice roller utility for D&D notation (e.g., "2d6+3", "1d20")
 */

export interface DiceRollResult {
  notation: string;
  rolls: number[];
  modifier: number;
  total: number;
  breakdown: string;
}

/**
 * Parse dice notation string (e.g., "2d6+3" -> {count: 2, sides: 6, modifier: 3})
 */
export function parseDiceNotation(notation: string): {
  count: number;
  sides: number;
  modifier: number;
} | null {
  const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) return null;

  return {
    count: parseInt(match[1], 10),
    sides: parseInt(match[2], 10),
    modifier: match[3] ? parseInt(match[3], 10) : 0,
  };
}

/**
 * Roll dice and return detailed results
 */
export function rollDice(notation: string): DiceRollResult | null {
  const parsed = parseDiceNotation(notation);
  if (!parsed) return null;

  const { count, sides, modifier } = parsed;
  const rolls: number[] = [];

  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }

  const rollTotal = rolls.reduce((sum, roll) => sum + roll, 0);
  const total = rollTotal + modifier;

  const breakdown = `${rolls.join(' + ')}${modifier !== 0 ? ` ${modifier >= 0 ? '+' : ''} ${modifier}` : ''} = ${total}`;

  return {
    notation,
    rolls,
    modifier,
    total,
    breakdown,
  };
}

/**
 * Validate dice notation string
 */
export function isValidDiceNotation(notation: string): boolean {
  return parseDiceNotation(notation) !== null;
}

/**
 * Calculate average for dice notation
 */
export function calculateAverage(notation: string): number | null {
  const parsed = parseDiceNotation(notation);
  if (!parsed) return null;

  const { count, sides, modifier } = parsed;
  const averagePerDie = (sides + 1) / 2;
  return count * averagePerDie + modifier;
}
