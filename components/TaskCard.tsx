import React, { useState } from 'react';
import type { Task } from '../types';
import { ELEMENTS } from '../constants';

interface TaskCardProps {
  task: Task;
  onStart: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const element = ELEMENTS[task.elementType];

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'border-color 150ms ease, background-color 150ms ease',
    borderColor: isHovered ? 'var(--border-strong)' : 'var(--border)',
    position: 'relative',
    overflow: 'hidden'
  };
  
  const topBorderStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      backgroundColor: element.color,
      opacity: 0.8
  }

  return (
    <div 
      style={cardStyle} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onStart(task)}
    >
      <div style={topBorderStyle} />
      <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-high)', margin: '0 0 8px' }}>
        {task.title}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
        <div title={task.elementType} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-med)' }}>
          <span style={{ color: element.color }}>{element.emoji}</span>
          <span>{element.name}</span>
        </div>
        <div title={`${task.effort} Effort Points`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-med)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="var(--elem-air)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>{task.effort}</span>
        </div>
      </div>

      {isHovered && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onStart(task);
          }}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'var(--accent)',
            color: 'var(--text-invert)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Start Focus
        </button>
      )}
    </div>
  );
};

export default TaskCard;
