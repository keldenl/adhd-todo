import React, { useState } from 'react';
import type { Artifact } from '../types';
import { ELEMENTS } from '../constants';
import Modal from './Modal';

interface ArtifactCardProps {
  artifact: Artifact;
}

const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const element = ELEMENTS[artifact.task.elementType];

  return (
    <>
      <div 
        style={{ cursor: 'pointer', background: 'var(--surface)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={artifact.imageUrl} alt={`Artifact for ${artifact.task.title}`} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-high)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {artifact.task.title}
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: element.color }}>
            {element.emoji} {element.name}
          </p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '80vh' }}>
          <img src={artifact.imageUrl} alt={`Artifact for ${artifact.task.title}`} style={{ width: '100%', borderRadius: '8px', objectFit: 'contain' }} />
          <div>
            <h3 style={{ margin: 0, fontSize: '20px', color: 'var(--text-high)' }}>{artifact.task.title}</h3>
            <p style={{ margin: '8px 0 0', color: 'var(--text-med)', lineHeight: 1.5 }}>
              A <strong>{element.name}</strong> type task ({element.emoji}) with an effort of <strong>{artifact.task.effort}/5</strong>,
              completed on {new Date(artifact.createdAt).toLocaleDateString()}.
              The final nudge was a mood of "<strong>{artifact.metadata.userMood}</strong>" with a splash of 
              <span style={{ color: artifact.metadata.userColor, fontWeight: 500 }}> color</span>.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ArtifactCard;
