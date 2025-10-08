import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Sidebar } from './components/Sidebar';
import { SpellForm } from './components/SpellForm';
import { loadEntry } from './api/fs-api';
import { useStore } from './lib/store';
import type { ContentType } from './types';

export function App() {
  const { currentType, currentId, currentData, setCurrentType, setCurrentId, setCurrentData } = useStore();
  const [view, setView] = useState<'home' | 'editor'>('home');

  const handleSelectType = (type: ContentType) => {
    setCurrentType(type);
    setView('editor');
  };

  const handleSelectEntry = async (id: string) => {
    if (!currentType) return;
    const data = await loadEntry(currentType, id);
    setCurrentId(id);
    setCurrentData(data);
  };

  const handleNewEntry = () => {
    setCurrentId(null);
    setCurrentData(null);
  };

  const handleSave = async () => {
    // Reload entries after save
    if (currentType && currentId) {
      const data = await loadEntry(currentType, currentId);
      setCurrentData(data);
    }
  };

  const handleDelete = () => {
    setCurrentId(null);
    setCurrentData(null);
  };

  const renderForm = () => {
    if (!currentType) return null;

    switch (currentType) {
      case 'spell':
        return (
          <SpellForm
            initialData={currentData}
            onSave={handleSave}
            onDelete={currentId ? handleDelete : undefined}
          />
        );
      default:
        return (
          <div className="p-6 text-center text-gray-400">
            Form for {currentType} coming soon...
          </div>
        );
    }
  };

  return (
    <Layout>
      {view === 'home' ? (
        <Home onSelectType={handleSelectType} />
      ) : (
        <div className="flex h-full">
          {currentType && (
            <Sidebar
              type={currentType}
              onSelect={handleSelectEntry}
              onNew={handleNewEntry}
            />
          )}
          <div className="flex-1 overflow-y-auto">
            {renderForm()}
          </div>
        </div>
      )}
    </Layout>
  );
}
