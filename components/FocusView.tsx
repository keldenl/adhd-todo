import React, { useState, useEffect } from 'react';
import type { Task } from '../types';
import { ELEMENTS, TASK_HP_MULTIPLIER } from '../constants';

interface FocusViewProps {
  task: Task;
  onComplete: () => void;
}

const FocusView: React.FC<FocusViewProps> = ({ task, onComplete }) => {
  const totalSeconds = task.effort * TASK_HP_MULTIPLIER * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // FIX: Use ReturnType<typeof setInterval> to correctly type the interval ID.
    // This resolves the conflict between Node.js ('Timeout') and browser ('number') types for setInterval.
    let interval: ReturnType<typeof setInterval> | undefined = undefined;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(s => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onComplete]);
  
  const element = ELEMENTS[task.elementType];
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };
  
  const progressBarStyle: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, height: '4px',
    width: `${progress}%`,
    backgroundColor: element.color,
    transition: 'width 500ms linear',
  };

  return (
    <div style={cardStyle}>
      <div style={progressBarStyle} />
      <div>
        <span style={{ fontSize: '14px', color: element.color }}>{element.emoji} {task.elementType}</span>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-high)', margin: '4px 0 0' }}>{task.title}</h3>
      </div>
      
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '48px', color: 'var(--text-high)', fontWeight: 700 }}>
        {timeDisplay}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button onClick={() => setIsActive(!isActive)} style={{
          flex: 1, padding: '10px', background: isActive ? 'var(--bg-2)' : 'var(--accent)', 
          border: isActive ? '1px solid var(--border)' : 'none',
          borderRadius: '6px', color: isActive ? 'var(--text-med)' : 'var(--text-invert)',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer'
        }}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={onComplete} style={{
          flex: 1, padding: '10px', background: 'var(--bg-2)', 
          border: '1px solid var(--border)', borderRadius: '6px',
          color: 'var(--text-med)', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
        }}>
          Finish Early
        </button>
      </div>
    </div>
  );
};

export default FocusView;