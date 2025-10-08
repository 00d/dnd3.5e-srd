import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import type { ContentType, FileInfo } from '../types';
import { listEntries, searchEntries } from '../api/fs-api';
import { useStore } from '../lib/store';

interface SidebarProps {
  type: ContentType;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function Sidebar({ type, onSelect, onNew }: SidebarProps) {
  const [entries, setEntries] = useState<FileInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentId } = useStore();

  useEffect(() => {
    loadEntries();
  }, [type]);

  useEffect(() => {
    if (searchQuery) {
      searchEntries(type, searchQuery).then(setEntries);
    } else {
      loadEntries();
    }
  }, [searchQuery, type]);

  const loadEntries = async () => {
    const data = await listEntries(type);
    setEntries(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={onNew}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            title="New entry"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-gray-400">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No entries yet. Click + to create one.
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelect(entry.id)}
                className={`w-full p-4 text-left hover:bg-gray-700 transition-colors ${
                  currentId === entry.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{entry.name}</div>
                    <div className="text-xs text-gray-400 truncate mt-1">{entry.id}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getStatusColor(entry.status)}`} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
