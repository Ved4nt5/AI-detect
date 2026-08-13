export const MOCK_SAMPLES = [
  {
    id: "sample-1",
    title: "Midjourney v6.1 Photorealistic Executive Portrait",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    verdict: "HIGH_RISK",
    score: 96.7,
    aiModel: "Midjourney v6.1",
    timestamp: "2026-08-13 14:42:09 UTC",
    fileSize: "4.8 MB",
    duration: "N/A",
    resolution: "2048x2048",
    hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    exif: {
      encoder: "Midjourney Latent Upscaler v6",
      software: "MJ Diffusion Pipeline",
      cameraMake: "None (Generated)",
      cameraModel: "Midjourney v6",
      colorSpace: "Display P3"
    },
    metrics: {
      pixelArtifacts: 94,
      spectralAnomaly: 97,
      metadataIntegrity: 0,
      lightingConsistency: 68,
      facialGeometry: 92
    },
    modelBreakdown: [
      { name: "Midjourney v6.1", probability: 89.4 },
      { name: "Flux.1 Dev", probability: 7.2 },
      { name: "Stable Diffusion XL", probability: 2.1 },
      { name: "Authentic Camera", probability: 1.3 }
    ],
    anomalies: [
      "Iris specular reflection asymmetric between left and right eyes.",
      "High Error Level Analysis (ELA) variance in background hair strands.",
      "Fourier Spectrum displays artificial grid peaks at high frequency bands.",
      "Missing C2PA / CAI authenticity cryptographical signatures."
    ]
  },
  {
    id: "sample-2",
    title: "Canon EOS R5 Alpine Landscape RAW Shot",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    verdict: "AUTHENTIC",
    score: 1.8,
    aiModel: "Authentic Camera Hardware",
    timestamp: "2026-08-12 16:20:00 UTC",
    fileSize: "28.4 MB",
    duration: "N/A",
    resolution: "8192x5464",
    hash: "c79d1a3a60c7f76e7a2b918d3b2f56e9c403328e1d57fb40a92d475a894bc25d",
    exif: {
      encoder: "Canon EOS R5 Native Firmware 1.8.1",
      software: "Adobe Lightroom Classic 13.2",
      cameraMake: "Canon",
      cameraModel: "Canon EOS R5 (RF24-70mm F2.8 L IS USM)",
      colorSpace: "Adobe RGB (1998)"
    },
    metrics: {
      pixelArtifacts: 2,
      spectralAnomaly: 3,
      metadataIntegrity: 98,
      lightingConsistency: 99,
      facialGeometry: 100
    },
    modelBreakdown: [
      { name: "Authentic Camera", probability: 98.2 },
      { name: "Midjourney v6", probability: 0.9 },
      { name: "Flux.1 Dev", probability: 0.6 },
      { name: "Stable Diffusion XL", probability: 0.3 }
    ],
    anomalies: [
      "No synthetic pixel artifacts detected.",
      "Natural Bayer sensor photon noise distribution verified.",
      "Cryptographical EXIF payload match with Canon firmware signatures."
    ]
  },
  {
    id: "sample-3",
    title: "Flux.1 Dev Cyberpunk Futuristic City",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    verdict: "HIGH_RISK",
    score: 99.1,
    aiModel: "Flux.1 Dev (Black Forest Labs)",
    timestamp: "2026-08-13 12:00:44 UTC",
    fileSize: "6.1 MB",
    duration: "N/A",
    resolution: "1920x1080",
    hash: "7d891b2c45e89a0123f456789a012bc345d6789e012f3456789a012b345c678d",
    exif: {
      encoder: "Flux.1 Rectified Flow Transformer",
      software: "ComfyUI Flow Workflow",
      cameraMake: "None (Generated)",
      cameraModel: "Flux.1 Dev",
      colorSpace: "sRGB"
    },
    metrics: {
      pixelArtifacts: 99,
      spectralAnomaly: 98,
      metadataIntegrity: 0,
      lightingConsistency: 72,
      facialGeometry: 85
    },
    modelBreakdown: [
      { name: "Flux.1 Dev", probability: 94.1 },
      { name: "Midjourney v6", probability: 4.3 },
      { name: "Stable Diffusion XL", probability: 1.2 },
      { name: "Authentic Camera", probability: 0.4 }
    ],
    anomalies: [
      "Synthetic neon light glow falloff defying inverse-square ray physics.",
      "High frequency radial spectral ring pattern in 2D FFT Fourier Canvas.",
      "Garbled micro-signage text rendering typical of text-to-image latent UNet/DiT models."
    ]
  },
  {
    id: "sample-4",
    title: "DALL-E 3 Hyper-Realistic Architectural Render",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    verdict: "HIGH_RISK",
    score: 97.4,
    aiModel: "OpenAI DALL-E 3",
    timestamp: "2026-08-13 13:10:00 UTC",
    fileSize: "3.2 MB",
    duration: "N/A",
    resolution: "1792x1024",
    hash: "3b91a2c4819e021a842b10928a319c812a391092831a9021a90218a90128a391",
    exif: {
      encoder: "OpenAI DALL-E 3 API Pipeline",
      software: "ChatGPT Plus Media Synthesizer",
      cameraMake: "None (Generated)",
      cameraModel: "DALL-E 3",
      colorSpace: "sRGB Profile"
    },
    metrics: {
      pixelArtifacts: 95,
      spectralAnomaly: 96,
      metadataIntegrity: 0,
      lightingConsistency: 64,
      facialGeometry: 90
    },
    modelBreakdown: [
      { name: "OpenAI DALL-E 3", probability: 91.8 },
      { name: "Midjourney v6", probability: 5.4 },
      { name: "Flux.1 Dev", probability: 2.1 },
      { name: "Authentic Camera", probability: 0.7 }
    ],
    anomalies: [
      "Unnatural window reflection refraction vectors.",
      "Missing camera lens distortion profiles in edge margins.",
      "Synthetic spatial noise coherence verified across glass surfaces."
    ]
  },
  {
    id: "sample-5",
    title: "iPhone 15 Pro Natural Outdoor Street Portrait",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    verdict: "AUTHENTIC",
    score: 2.1,
    aiModel: "Authentic Camera Hardware",
    timestamp: "2026-08-13 09:15:30 UTC",
    fileSize: "5.4 MB",
    duration: "N/A",
    resolution: "4032x3024",
    hash: "91a82f3c40129a8341902ba9102381a9203189201938a1928310a928139012a3",
    exif: {
      encoder: "Apple iOS 17.5.1 Smart HDR 5",
      software: "Camera app 17.5",
      cameraMake: "Apple",
      cameraModel: "iPhone 15 Pro 24mm f/1.78",
      colorSpace: "Display P3"
    },
    metrics: {
      pixelArtifacts: 2,
      spectralAnomaly: 3,
      metadataIntegrity: 99,
      lightingConsistency: 98,
      facialGeometry: 99
    },
    modelBreakdown: [
      { name: "Authentic Camera", probability: 97.9 },
      { name: "Midjourney v6", probability: 1.2 },
      { name: "Flux.1 Dev", probability: 0.6 },
      { name: "Stable Diffusion", probability: 0.3 }
    ],
    anomalies: [
      "Authentic Bayer sensor noise profile and natural skin texture pores.",
      "Verified Apple C2PA metadata provenance headers intact.",
      "Consistent specular catchlights across pupils."
    ]
  }
];
