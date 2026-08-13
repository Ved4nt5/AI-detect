import React from 'react';
import { MOCK_SAMPLES } from '../data/samples';
import { Sparkles, ShieldAlert, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export default function SampleLab({ onSelectSample }) {
  return (
    <div>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
          Interactive Forensic Sample Sandbox
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Evaluate TruthLens AI on curated real vs. AI-generated images. Click any sample to execute instant neural multi-spectral verification.
        </p>
      </div>

      <div className="samples-grid">
        {MOCK_SAMPLES.map((sample) => (
          <div 
            key={sample.id}
            className="sample-card mac-card"
            onClick={() => onSelectSample(sample)}
          >
            <div className="sample-img-box">
              <img src={sample.thumbnail} alt={sample.title} />

              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: sample.verdict === 'HIGH_RISK' ? 'rgba(255, 59, 48, 0.92)' : 'rgba(52, 199, 89, 0.92)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>
                {sample.verdict === 'HIGH_RISK' ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                {sample.score}% SYNTHETIC
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                {sample.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Generator Target: <strong style={{ color: 'var(--text-main)' }}>{sample.aiModel}</strong>
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-mono" style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                  {sample.resolution}
                </span>

                <button className="btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>
                  <Sparkles size={14} /> Analyze Sample
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
