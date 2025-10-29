import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={onClose}>
      <div 
        style={{ 
          backgroundColor: 'var(--bg-1)',
          padding: '24px',
          borderRadius: '12px',
          minWidth: '400px',
          maxWidth: '500px',
          position: 'relative',
          border: '1px solid var(--border)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'var(--text-dim)',
            padding: '4px',
            lineHeight: '1',
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
