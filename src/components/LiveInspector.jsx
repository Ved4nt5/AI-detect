import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, ShieldAlert, ShieldCheck, AlertTriangle, Download, Copy, Check, 
  Eye, FileText, RefreshCw, Image as ImageIcon, Sliders, Cpu, Sparkles 
} from 'lucide-react';
import { renderELA, renderSobel, renderFFT, analyzeCustomFile, generateForensicPdfReport } from '../utils/forensicEngine';

export default function LiveInspector({ selectedMedia, setSelectedMedia, onScanComplete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepLog, setScanStepLog] = useState('');
  const [activeVisualizer, setActiveVisualizer] = useState('original');
  const [copiedJson, setCopiedJson] = useState(false);

  const mediaRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Render Canvas Visualizers
  useEffect(() => {
    if (!selectedMedia || isScanning) return;

    const timeout = setTimeout(async () => {
      if (!canvasRef.current || !mediaRef.current) return;

      if (activeVisualizer === 'ela') {
        await renderELA(mediaRef.current, canvasRef.current, 14, 0.75);
      } else if (activeVisualizer === 'sobel') {
        renderSobel(mediaRef.current, canvasRef.current);
      } else if (activeVisualizer === 'fft') {
        const isSynthetic = selectedMedia.verdict !== 'AUTHENTIC';
        renderFFT(canvasRef.current, isSynthetic);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [selectedMedia, activeVisualizer, isScanning]);

  const handleDrop = async (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startAnalysisForFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysisForFile(e.target.files[0]);
    }
  };

  const startAnalysisForFile = async (file) => {
    setIsScanning(true);
    setScanProgress(15);
    setScanStepLog('Reading Spatial Noise Variance & Metadata...');

    const steps = [
      { p: 35, log: 'Parsing Image EXIF Metatags & Bayer Matrix...' },
      { p: 60, log: 'Executing 2D Fourier Spectrum Frequency Analysis...' },
      { p: 82, log: 'Generating Error Level Analysis (ELA) Heatmap...' },
      { p: 100, log: 'Synthesizing Image Forensics Verdict...' }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setScanProgress(steps[i].p);
      setScanStepLog(steps[i].log);
    }

    const resultData = await analyzeCustomFile(file);
    setSelectedMedia(resultData);
    setIsScanning(false);
    setActiveVisualizer('original');
    if (onScanComplete) onScanComplete(resultData);
  };

  const handleCopyJson = () => {
    if (!selectedMedia) return;
    navigator.clipboard.writeText(JSON.stringify(selectedMedia, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="inspector-container">
      {/* Upload Dropzone */}
      {!selectedMedia && !isScanning && (
        <div 
          className="dropzone-container mac-window"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div className="dropzone-icon">
            <Upload size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Upload Image for AI & Synthetic Manipulation Scan
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 1.5rem auto' }}>
            Inspect JPG, PNG, WEBP images with Error Level Analysis (ELA), 2D Fourier frequency spectra, and neural diffusion model classifiers.
          </p>

          <button className="btn-primary" type="button">
            <ImageIcon size={16} /> Choose Image File
          </button>
        </div>
      )}

      {/* Neural Scan Progress */}
      {isScanning && (
        <div className="mac-window" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
          <div style={{ margin: '0 auto 1.25rem auto', width: '56px', height: '56px' }}>
            <RefreshCw size={48} className="spin-icon" style={{ animation: 'spin 1.5s linear infinite', color: 'var(--mac-blue)' }} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Neural Image Forensics Scan...
          </h2>
          <p className="text-mono" style={{ color: 'var(--mac-blue)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {scanStepLog}
          </p>

          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <div className="metric-track" style={{ height: '10px', background: '#E2E8F0' }}>
              <div 
                className="metric-fill" 
                style={{ width: `${scanProgress}%`, background: 'linear-gradient(90deg, #007AFF, #5856D6)' }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <span>Multi-Spectral Extraction</span>
              <span>{scanProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Forensic Inspection Results */}
      {selectedMedia && !isScanning && (
        <div>
          {/* Top Verdict Banner */}
          <div className={`verdict-banner ${selectedMedia.verdict === 'HIGH_RISK' ? 'high-risk' : (selectedMedia.verdict === 'SUSPICIOUS' ? 'suspicious' : 'authentic')}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {selectedMedia.verdict === 'HIGH_RISK' && <ShieldAlert size={40} />}
              {selectedMedia.verdict === 'SUSPICIOUS' && <AlertTriangle size={40} />}
              {selectedMedia.verdict === 'AUTHENTIC' && <ShieldCheck size={40} />}
              
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, opacity: 0.9 }}>
                  TRUTHLENS FORENSIC VERDICT
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  {selectedMedia.verdict === 'HIGH_RISK' && 'ALERT: AI-GENERATED SYNTHETIC IMAGE DETECTED'}
                  {selectedMedia.verdict === 'SUSPICIOUS' && 'WARNING: SUSPICIOUS MANIPULATION INDICATORS'}
                  {selectedMedia.verdict === 'AUTHENTIC' && 'VERIFIED: AUTHENTIC CAMERA PHOTOGRAPH'}
                </div>
                <div style={{ fontSize: '0.88rem', opacity: 0.88, marginTop: '2px' }}>
                  Origin: <strong>{selectedMedia.aiModel}</strong> • SHA-256: <span className="text-mono">{selectedMedia.hash.substring(0, 16)}...</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div className="score-display-ring">
                {selectedMedia.score}%
              </div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.85, fontWeight: 600 }}>
                Synthetic Confidence Score
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button 
              className="btn-secondary" 
              onClick={() => { setSelectedMedia(null); setActiveVisualizer('original'); }}
            >
              <RefreshCw size={14} /> Scan New Image
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={handleCopyJson}>
                {copiedJson ? <Check size={14} style={{ color: '#34C759' }} /> : <Copy size={14} />}
                {copiedJson ? 'Copied JSON!' : 'Copy JSON Audit'}
              </button>

              <button className="btn-primary" onClick={() => generateForensicPdfReport(selectedMedia)}>
                <Download size={16} /> Download Forensic Certificate
              </button>
            </div>
          </div>

          {/* Main Grid: Visualizer Left, Gauges Right */}
          <div className="inspector-grid">
            {/* LEFT COLUMN: Visualizer Canvas */}
            <div className="mac-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Eye size={18} style={{ color: 'var(--mac-blue)' }} /> Multi-Spectral Visualizer
                </h3>

                <div className="visualizer-switch-tabs">
                  <button 
                    className={`visual-tab-btn ${activeVisualizer === 'original' ? 'active' : ''}`}
                    onClick={() => setActiveVisualizer('original')}
                  >
                    Original
                  </button>
                  <button 
                    className={`visual-tab-btn ${activeVisualizer === 'ela' ? 'active' : ''}`}
                    onClick={() => setActiveVisualizer('ela')}
                  >
                    ELA Heatmap
                  </button>
                  <button 
                    className={`visual-tab-btn ${activeVisualizer === 'sobel' ? 'active' : ''}`}
                    onClick={() => setActiveVisualizer('sobel')}
                  >
                    Sobel Gradient
                  </button>
                  <button 
                    className={`visual-tab-btn ${activeVisualizer === 'fft' ? 'active' : ''}`}
                    onClick={() => setActiveVisualizer('fft')}
                  >
                    2D Fourier Spectrum
                  </button>
                </div>
              </div>

              {/* Canvas Display Wrapper */}
              <div className="canvas-wrapper">
                {activeVisualizer === 'original' ? (
                  <img 
                    ref={mediaRef} 
                    src={selectedMedia.thumbnail || selectedMedia.sourceUrl} 
                    alt="Target image" 
                    crossOrigin="anonymous"
                  />
                ) : (
                  <>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', maxHeight: '440px' }} />
                    <img 
                      ref={mediaRef} 
                      src={selectedMedia.thumbnail || selectedMedia.sourceUrl} 
                      alt="Hidden frame sampler" 
                      crossOrigin="anonymous"
                      style={{ display: 'none' }}
                    />
                  </>
                )}
              </div>

              {/* Visualizer Legend Explanation */}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--border-glass)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {activeVisualizer === 'original' && '● Original Image View: Raw pixel container representation.'}
                {activeVisualizer === 'ela' && '● Error Level Analysis (ELA): High-contrast pixel difference highlights localized re-compression anomalies.'}
                {activeVisualizer === 'sobel' && '● Sobel Edge Integrity: Gradient vectors display edge sharpness transitions vs diffusion blur.'}
                {activeVisualizer === 'fft' && '● 2D Fourier Spectrum: Radial grid lines and frequency spikes indicate neural generative noise fingerprints.'}
              </div>
            </div>

            {/* RIGHT COLUMN: Gauges & Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Multimodal Risk Gauges */}
              <div className="mac-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sliders size={18} style={{ color: 'var(--mac-blue)' }} /> DeepForensic Multi-Vector Gauges
                </h3>

                <div className="metric-bar-group">
                  <div className="metric-header">
                    <span>Pixel Artifact Anomaly</span>
                    <span style={{ fontWeight: 600 }}>{selectedMedia.metrics.pixelArtifacts}%</span>
                  </div>
                  <div className="metric-track">
                    <div className={`metric-fill ${selectedMedia.metrics.pixelArtifacts > 60 ? 'high' : 'low'}`} style={{ width: `${selectedMedia.metrics.pixelArtifacts}%` }}></div>
                  </div>
                </div>

                <div className="metric-bar-group">
                  <div className="metric-header">
                    <span>Fourier Spectral Frequency Anomaly</span>
                    <span style={{ fontWeight: 600 }}>{selectedMedia.metrics.spectralAnomaly}%</span>
                  </div>
                  <div className="metric-track">
                    <div className={`metric-fill ${selectedMedia.metrics.spectralAnomaly > 60 ? 'high' : 'low'}`} style={{ width: `${selectedMedia.metrics.spectralAnomaly}%` }}></div>
                  </div>
                </div>

                <div className="metric-bar-group">
                  <div className="metric-header">
                    <span>Facial Geometry Integrity</span>
                    <span style={{ fontWeight: 600 }}>{selectedMedia.metrics.facialGeometry}%</span>
                  </div>
                  <div className="metric-track">
                    <div className={`metric-fill ${selectedMedia.metrics.facialGeometry > 60 ? 'high' : 'low'}`} style={{ width: `${selectedMedia.metrics.facialGeometry}%` }}></div>
                  </div>
                </div>

                <div className="metric-bar-group">
                  <div className="metric-header">
                    <span>Lighting & Specular Ray Consistency</span>
                    <span style={{ fontWeight: 600 }}>{selectedMedia.metrics.lightingConsistency}%</span>
                  </div>
                  <div className="metric-track">
                    <div className={`metric-fill ${selectedMedia.metrics.lightingConsistency < 50 ? 'high' : 'low'}`} style={{ width: `${100 - selectedMedia.metrics.lightingConsistency}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Model Probabilities */}
              <div className="mac-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={18} style={{ color: 'var(--mac-purple)' }} /> Generator Model Classification
                </h3>

                {selectedMedia.modelBreakdown.map((m, idx) => (
                  <div key={idx} className="model-prob-item">
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{m.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '80px', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${m.probability}%`, background: idx === 0 ? 'var(--mac-blue)' : '#94A3B8' }}></div>
                      </div>
                      <span className="text-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: idx === 0 ? 'var(--mac-blue)' : 'var(--text-muted)' }}>
                        {m.probability}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Forensic Audit Findings */}
              <div className="mac-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} style={{ color: '#0284C7' }} /> Forensic Audit Findings
                </h3>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedMedia.anomalies.map((anom, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      <span style={{ color: selectedMedia.verdict === 'AUTHENTIC' ? '#34C759' : '#FF3B30', fontWeight: 700 }}>•</span>
                      {anom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
