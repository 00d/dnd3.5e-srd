import { Book, Swords, Shield, Users, Award, Scroll } from 'lucide-react';
import type { ContentType } from '../types';

interface HomeProps {
  onSelectType: (type: ContentType) => void;
}

export function Home({ onSelectType }: HomeProps) {
  const contentTypes: Array<{ type: ContentType; icon: any; label: string; description: string }> = [
    {
      type: 'spell',
      icon: Book,
      label: 'Spells',
      description: 'Arcane and divine spells',
    },
    {
      type: 'monster',
      icon: Swords,
      label: 'Monsters',
      description: 'Creatures and NPCs',
    },
    {
      type: 'weapon',
      icon: Swords,
      label: 'Weapons',
      description: 'Melee and ranged weapons',
    },
    {
      type: 'armor',
      icon: Shield,
      label: 'Armor',
      description: 'Armor and shields',
    },
    {
      type: 'magic-item',
      icon: Scroll,
      label: 'Magic Items',
      description: 'Wondrous items and artifacts',
    },
    {
      type: 'class',
      icon: Users,
      label: 'Classes',
      description: 'Character classes',
    },
    {
      type: 'feat',
      icon: Award,
      label: 'Feats',
      description: 'Character feats',
    },
    {
      type: 'skill',
      icon: Award,
      label: 'Skills',
      description: 'Character skills',
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">D&D 3.5e SRD Data Entry</h2>
        <p className="text-gray-400 mb-8">
          Select a content type to begin entering data
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentTypes.map(({ type, icon: Icon, label, description }) => (
            <button
              key={type}
              onClick={() => onSelectType(type)}
              className="p-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-left"
            >
              <Icon className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-1">{label}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
