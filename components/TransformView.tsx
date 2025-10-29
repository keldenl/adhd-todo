import React, { useState } from 'react';
import type { Task } from '../types';
import { ELEMENTS, ARTISTIC_COLORS } from '../constants';

interface TransformViewProps {
  task: Task;
  onCreate: (artisticNudge: { mood: string; color: string; }) => Promise<void>;
}

const TransformView: React.FC<TransformViewProps> = ({ task, onCreate }) => {
  const [mood, setMood] = useState('');
  const [color, setColor] = useState(ARTISTIC_COLORS[0].hex);
  const [isLoading, setIsLoading] = useState(false);
  const element = ELEMENTS[task.elementType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim() && !isLoading) {
      setIsLoading(true);
      await onCreate({ mood, color });
      setIsLoading(false);
    }
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
    <form onSubmit={handleSubmit} style={cardStyle}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-high)', margin: '0 0 4px' }}>
          Transformation Complete
        </h3>
        <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '14px' }}>"{task.title}"</p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-med)' }}>Add a one-word mood or feeling</label>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g., Victorious, Calm, Energized"
          style={inputStyle}
          required
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-med)' }}>Add a color nudge</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {ARTISTIC_COLORS.map(c => (
            <button
              type="button"
              key={c.name}
              onClick={() => setColor(c.hex)}
              style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: c.hex,
                border: '2px solid',
                borderColor: color === c.hex ? 'var(--text-high)' : 'transparent',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>
      
      <button type="submit" disabled={isLoading} style={{
        padding: '12px',
        background: 'var(--accent)',
        border: 'none',
        borderRadius: '6px',
        color: 'var(--text-invert)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '8px',
        opacity: isLoading ? 0.7 : 1,
      }}>
        {isLoading ? 'Sealing...' : 'Seal Artifact'}
      </button>
    </form>
  );
};

export default TransformView;
