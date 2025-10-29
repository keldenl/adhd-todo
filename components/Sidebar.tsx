import React from 'react';
import type { View } from '../types';

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  onAddTask: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: isActive ? 'var(--bg-2)' : 'transparent',
    color: isActive ? 'var(--text-high)' : 'var(--text-dim)',
    fontWeight: isActive ? 600 : 400,
    transition: 'background-color 150ms ease, color 150ms ease',
    marginBottom: '4px',
  };

  return (
    <div onClick={onClick} style={style} onMouseEnter={e => e.currentTarget.style.backgroundColor = isActive ? 'var(--bg-2)' : 'var(--bg-1)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = isActive ? 'var(--bg-2)' : 'transparent'}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ view, setView, onAddTask }) => {
  return (
    <nav style={{ 
      width: '240px', 
      borderRight: '1px solid var(--border)', 
      padding: '16px', 
      height: '100vh', 
      backgroundColor: 'var(--bg-0)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 4px 16px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="var(--accent)"/>
          <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z" fill="var(--accent)"/>
        </svg>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-high)', margin: 0 }}>Focus Seal</h1>
      </div>
      
      <button onClick={onAddTask} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '10px 0',
        marginBottom: '16px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        color: 'var(--text-med)',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background-color 150ms ease, border-color 150ms ease',
      }} onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = 'var(--elev)';
        e.currentTarget.style.borderColor = 'var(--border-strong)';
      }} onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'var(--surface)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Draw a Card
      </button>

      <div>
        <NavItem
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10H21M3 6H21M3 14H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          label="Board"
          isActive={view === 'BOARD'}
          onClick={() => setView('BOARD')}
        />
        <NavItem
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          label="Binder"
          isActive={view === 'BINDER'}
          onClick={() => setView('BINDER')}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
