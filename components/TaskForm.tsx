import React, { useState } from 'react';
import type { ElementType } from '../types';
import { ELEMENTS } from '../constants';

interface TaskFormProps {
  onSubmit: (title: string, elementType: ElementType, effort: number) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [elementType, setElementType] = useState<ElementType>('Creative');
  const [effort, setEffort] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, elementType, effort);
      setTitle('');
      setElementType('Creative');
      setEffort(3);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    background: 'var(--bg-0)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--text-high)',
    fontSize: '14px',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, color: 'var(--text-high)', fontSize: '18px', fontWeight: 600 }}>Draw a New Card</h3>
      
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-med)' }}>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Design the new landing page"
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-med)' }}>Element Type</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {Object.keys(ELEMENTS).map(key => {
            const el = ELEMENTS[key as ElementType];
            const isSelected = elementType === el.name;
            return (
              <button 
                type="button" 
                key={el.name} 
                onClick={() => setElementType(el.name as ElementType)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 12px',
                  border: '1px solid',
                  borderColor: isSelected ? el.color : 'var(--border)',
                  borderRadius: '6px',
                  background: isSelected ? `${el.color}20` : 'var(--surface)',
                  color: isSelected ? el.color : 'var(--text-med)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'all 150ms ease',
                }}
              >
                <span>{el.emoji}</span> {el.name}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-med)' }}>Effort (1-5)</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="range"
            min="1"
            max="5"
            value={effort}
            onChange={(e) => setEffort(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{color: 'var(--text-high)', fontWeight: 600, width: '20px', textAlign: 'center'}}>{effort}</span>
        </div>
      </div>

      <button type="submit" style={{
        padding: '12px',
        background: 'var(--accent)',
        border: 'none',
        borderRadius: '6px',
        color: 'var(--text-invert)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '8px',
      }}>
        Add to Deck
      </button>
    </form>
  );
};

export default TaskForm;
