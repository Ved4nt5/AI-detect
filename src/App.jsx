import React, { useState } from 'react';
import Header from './components/Header';
import LiveInspector from './components/LiveInspector';
import SampleLab from './components/SampleLab';
import { MOCK_SAMPLES } from './data/samples';
import { Shield, CheckCircle2, Lock, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inspector');
  const [selectedMedia, setSelectedMedia] = useState(MOCK_SAMPLES[0]);

  const handleSelectSample = (sample) => {
    setSelectedMedia(sample);
    setActiveTab('inspector');
  };

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ minHeight: '620px' }}>
        {activeTab === 'inspector' && (
          <LiveInspector 
            selectedMedia={selectedMedia} 
            setSelectedMedia={setSelectedMedia} 
          />
        )}

        {activeTab === 'samples' && (
          <SampleLab onSelectSample={handleSelectSample} />
        )}
      </main>

      {/* macOS Style Footer */}
      <footer style={{ 
        marginTop: '3.5rem', 
        paddingTop: '1.5rem', 
        borderTop: '1px solid var(--border-glass)', 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem', 
        color: 'var(--text-subtle)', 
        fontSize: '0.82rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
          <Shield size={16} style={{ color: 'var(--mac-blue)' }} />
          <span>TruthLens AI • One scan, all media, one truth.</span>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Lock size={12} /> SHA-256 Signature</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Cpu size={12} /> Fourier 2D Neural Pipeline</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={12} /> C2PA Provenance Compliant</span>
        </div>
      </footer>
    </div>
  );
}
