import React from 'react';
import { Sparkles, Layers, Search } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header-bar mac-window">
      <div className="logo-group">
        <div className="logo-icon-bg">
          <Search size={24} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 className="logo-title text-gradient">TruthLens AI</h1>
          </div>
          <p className="tagline-text">
            One scan, all media, one truth.
          </p>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'inspector' ? 'active' : ''}`}
          onClick={() => setActiveTab('inspector')}
        >
          <Sparkles size={16} /> Live Inspector
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'samples' ? 'active' : ''}`}
          onClick={() => setActiveTab('samples')}
        >
          <Layers size={16} /> Sample Sandbox
        </button>
      </nav>
    </header>
  );
}
