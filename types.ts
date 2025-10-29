export type ElementType = 'Creative' | 'Administrative' | 'Maintenance' | 'Quick Wins' | 'Emotional';

export interface ElementInfo {
  name: string;
  emoji: string;
  colors: string;
  motion: string;
  effect: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  elementType: ElementType;
  effort: number; // 1-5
  createdAt: string; // ISO string
}

export interface Artifact {
  id: string;
  task: Task;
  imageUrl: string;
  createdAt: string; // ISO string
  metadata: {
    prompt: string;
    userMood: string;
    userColor: string;
    context: { 
      location?: { lat: number; lon: number };
      timestamp: string;
    };
  }
}

export type View = 'BOARD' | 'BINDER';
