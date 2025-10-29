import React from 'react';
import type { Task } from '../types';
import TaskCard from './TaskCard';
import FocusView from './FocusView';
import TransformView from './TransformView';

interface KanbanViewProps {
  tasks: Task[];
  activeTask: Task | null;
  completedTask: Task | null;
  onStartTask: (task: Task) => void;
  onCompleteFocus: () => void;
  onCreateArtifact: (artisticNudge: { mood: string; color: string; }) => Promise<void>;
}

const KanbanColumn: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => {
  return (
    <div style={{ flex: '1 1 33.33%', display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', minWidth: 300 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-high)', margin: 0 }}>{title}</h2>
        <span style={{ fontSize: '14px', color: 'var(--text-dim)' }}>{count}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
    </div>
  );
};

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, activeTask, completedTask, onStartTask, onCompleteFocus, onCreateArtifact }) => {
  return (
    <div style={{ display: 'flex', height: '100%', overflowX: 'auto', backgroundColor: 'var(--bg-1)' }}>
      <KanbanColumn title="Deck" count={tasks.length}>
        {tasks.length > 0 ? tasks.map(task => (
          <TaskCard key={task.id} task={task} onStart={onStartTask} />
        )) : <p style={{color: 'var(--text-dim)', padding: '0 8px'}}>Your deck is empty. Draw a new card to begin.</p>}
      </KanbanColumn>

      <div style={{ width: '1px', backgroundColor: 'var(--border)', height: '100%' }} />

      <KanbanColumn title="Focus Battle" count={activeTask ? 1 : 0}>
        {activeTask ? (
          <FocusView task={activeTask} onComplete={onCompleteFocus} />
        ) : <p style={{color: 'var(--text-dim)', padding: '0 8px'}}>Start a task from your deck to begin the focus battle.</p>}
      </KanbanColumn>

      <div style={{ width: '1px', backgroundColor: 'var(--border)', height: '100%' }} />

      <KanbanColumn title="Transformation" count={completedTask ? 1 : 0}>
        {completedTask ? (
          <TransformView task={completedTask} onCreate={onCreateArtifact} />
        ) : <p style={{color: 'var(--text-dim)', padding: '0 8px'}}>Complete a focus battle to transform your effort into art.</p>}
      </KanbanColumn>
    </div>
  );
};

export default KanbanView;
