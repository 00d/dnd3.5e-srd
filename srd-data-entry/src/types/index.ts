export type ContentType = 'spell' | 'monster' | 'weapon' | 'armor' | 'good' | 'magic-item' | 'class' | 'feat' | 'skill';

export interface FileInfo {
  id: string;
  name: string;
  type: ContentType;
  status: 'draft' | 'review' | 'complete';
  lastModified?: string;
}

export interface ProgressStats {
  total: number;
  draft: number;
  review: number;
  complete: number;
}

export interface DiceRoll {
  notation: string;
  result?: number;
  rolls?: number[];
}
