import React from 'react';
import type { Artifact } from '../types';
import ArtifactCard from './ArtifactCard';

interface BinderViewProps {
  artifacts: Artifact[];
}

const BinderView: React.FC<BinderViewProps> = ({ artifacts }) => {
  return (
    <div style={{ padding: '32px', height: '100%', overflowY: 'auto', backgroundColor: 'var(--bg-1)' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-high)', margin: 0 }}>Artifact Binder</h1>
        <p style={{ color: 'var(--text-dim)', marginTop: '4px', fontSize: '16px' }}>Your collection of focus, sealed in art.</p>
      </header>

      {artifacts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {artifacts.map(artifact => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px 0', border: '1px dashed var(--border)', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-dim)'}}>Your binder is empty.</p>
          <p style={{ margin: '4px 0 0', color: 'var(--text-dim)'}}>Complete a task to create your first artifact.</p>
        </div>
      )}
    </div>
  );
};

export default BinderView;
