import { useState } from 'react';
import { Dices } from 'lucide-react';
import { rollDice, isValidDiceNotation } from '../lib/dice';

export function DiceRoller() {
  const [notation, setNotation] = useState('1d20');
  const [result, setResult] = useState<string>('');

  const handleRoll = () => {
    if (!isValidDiceNotation(notation)) {
      setResult('Invalid notation');
      return;
    }

    const rollResult = rollDice(notation);
    if (rollResult) {
      setResult(`${rollResult.breakdown}`);
    }
  };

  const quickRolls = ['1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '2d6', '3d6', '4d6'];

  return (
    <div className="border border-gray-600 rounded p-4 bg-gray-750">
      <div className="flex items-center gap-2 mb-3">
        <Dices className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold">Dice Roller</h3>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={notation}
          onChange={(e) => setNotation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleRoll()}
          placeholder="1d20+5"
          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleRoll}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium"
        >
          Roll
        </button>
      </div>

      {result && (
        <div className="mb-3 p-2 bg-gray-800 rounded text-sm font-mono">
          {result}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {quickRolls.map((dice) => (
          <button
            key={dice}
            type="button"
            onClick={() => {
              setNotation(dice);
              const rollResult = rollDice(dice);
              if (rollResult) {
                setResult(rollResult.breakdown);
              }
            }}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
          >
            {dice}
          </button>
        ))}
      </div>
    </div>
  );
}
