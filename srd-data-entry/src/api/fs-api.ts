/**
 * File system API for reading/writing JSON data files
 * In a real implementation, this would use a backend API
 * For now, using localStorage for development
 */

import type { ContentType, FileInfo } from '../types';

const STORAGE_PREFIX = 'srd_';

export async function saveEntry(type: ContentType, id: string, data: any): Promise<void> {
  try {
    const key = `${STORAGE_PREFIX}${type}_${id}`;
    localStorage.setItem(key, JSON.stringify(data));

    // Update index
    await updateIndex(type, id, data);
  } catch (error) {
    console.error('Error saving entry:', error);
    throw new Error('Failed to save entry');
  }
}

export async function loadEntry(type: ContentType, id: string): Promise<any | null> {
  try {
    const key = `${STORAGE_PREFIX}${type}_${id}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading entry:', error);
    return null;
  }
}

export async function deleteEntry(type: ContentType, id: string): Promise<void> {
  try {
    const key = `${STORAGE_PREFIX}${type}_${id}`;
    localStorage.removeItem(key);

    // Update index
    await removeFromIndex(type, id);
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw new Error('Failed to delete entry');
  }
}

export async function listEntries(type: ContentType): Promise<FileInfo[]> {
  try {
    const indexKey = `${STORAGE_PREFIX}index_${type}`;
    const indexData = localStorage.getItem(indexKey);
    return indexData ? JSON.parse(indexData) : [];
  } catch (error) {
    console.error('Error listing entries:', error);
    return [];
  }
}

export async function searchEntries(type: ContentType, query: string): Promise<FileInfo[]> {
  const allEntries = await listEntries(type);
  const lowerQuery = query.toLowerCase();

  return allEntries.filter(entry =>
    entry.name.toLowerCase().includes(lowerQuery) ||
    entry.id.toLowerCase().includes(lowerQuery)
  );
}

async function updateIndex(type: ContentType, id: string, data: any): Promise<void> {
  const indexKey = `${STORAGE_PREFIX}index_${type}`;
  const indexData = localStorage.getItem(indexKey);
  const index: FileInfo[] = indexData ? JSON.parse(indexData) : [];

  const existingIndex = index.findIndex(item => item.id === id);
  const fileInfo: FileInfo = {
    id,
    name: data.name || id,
    type,
    status: data.status || 'draft',
    lastModified: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    index[existingIndex] = fileInfo;
  } else {
    index.push(fileInfo);
  }

  localStorage.setItem(indexKey, JSON.stringify(index));
}

async function removeFromIndex(type: ContentType, id: string): Promise<void> {
  const indexKey = `${STORAGE_PREFIX}index_${type}`;
  const indexData = localStorage.getItem(indexKey);
  if (!indexData) return;

  const index: FileInfo[] = JSON.parse(indexData);
  const filtered = index.filter(item => item.id !== id);
  localStorage.setItem(indexKey, JSON.stringify(filtered));
}

export async function loadSourceMarkdown(filename: string): Promise<string> {
  // In production, this would fetch from the file system
  // For now, return placeholder
  return `# Source content for ${filename}\n\nContent would be loaded here...`;
}

export async function getProgressStats(type: ContentType) {
  const entries = await listEntries(type);
  return {
    total: entries.length,
    draft: entries.filter(e => e.status === 'draft').length,
    review: entries.filter(e => e.status === 'review').length,
    complete: entries.filter(e => e.status === 'complete').length,
  };
}
