import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Trash2 } from 'lucide-react';
import { spellSchema, type Spell } from '../schemas/spell.schema';
import { saveEntry, deleteEntry } from '../api/fs-api';
import { DiceRoller } from './DiceRoller';

interface SpellFormProps {
  initialData?: Partial<Spell>;
  onSave: () => void;
  onDelete?: () => void;
}

export function SpellForm({ initialData, onSave, onDelete }: SpellFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<Spell>({
    resolver: zodResolver(spellSchema),
    defaultValues: initialData || {
      id: '',
      name: '',
      school: 'Evocation',
      descriptors: [],
      level: {},
      components: {
        verbal: false,
        somatic: false,
      },
      castingTime: '',
      range: { type: 'Medium' },
      duration: '',
      savingThrow: '',
      spellResistance: false,
      description: '',
      tags: [],
      relatedSpells: [],
      status: 'draft',
    },
  });

  const onSubmit = async (data: Spell) => {
    try {
      await saveEntry('spell', data.id, data);
      onSave();
    } catch (error) {
      console.error('Error saving spell:', error);
      alert('Failed to save spell');
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm('Are you sure you want to delete this spell?')) return;

    try {
      await deleteEntry('spell', initialData.id);
      onDelete?.();
    } catch (error) {
      console.error('Error deleting spell:', error);
      alert('Failed to delete spell');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {initialData?.id ? 'Edit Spell' : 'New Spell'}
        </h2>
        <div className="flex gap-2">
          {initialData?.id && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={!isDirty}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID *</label>
          <input
            {...register('id')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="acid-arrow"
          />
          {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register('name')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Acid Arrow"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">School *</label>
          <select
            {...register('school')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Abjuration">Abjuration</option>
            <option value="Conjuration">Conjuration</option>
            <option value="Divination">Divination</option>
            <option value="Enchantment">Enchantment</option>
            <option value="Evocation">Evocation</option>
            <option value="Illusion">Illusion</option>
            <option value="Necromancy">Necromancy</option>
            <option value="Transmutation">Transmutation</option>
            <option value="Universal">Universal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subschool</label>
          <input
            {...register('subschool')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Creation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descriptors</label>
          <input
            {...register('descriptors')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Acid, Fire (comma-separated)"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Casting Time *</label>
        <input
          {...register('castingTime')}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1 standard action"
        />
        {errors.castingTime && (
          <p className="text-red-500 text-sm mt-1">{errors.castingTime.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Range Type *</label>
          <select
            {...register('range.type')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Personal">Personal</option>
            <option value="Touch">Touch</option>
            <option value="Close">Close</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
            <option value="Unlimited">Unlimited</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration *</label>
          <input
            {...register('duration')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1 round/level"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Saving Throw *</label>
          <input
            {...register('savingThrow')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="None"
          />
          {errors.savingThrow && (
            <p className="text-red-500 text-sm mt-1">{errors.savingThrow.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Spell Resistance *</label>
          <select
            {...register('spellResistance', { valueAsNumber: false })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          {...register('description')}
          rows={8}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="Spell description..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          {...register('status')}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <DiceRoller />
    </form>
  );
}
