import { useState, useEffect } from 'react';
import './styles.css';

interface GeneratedImage {
  id: string;
  prompt: string;
  colors: string[];
  timestamp: number;
}

const WATERCOLOR_PALETTES = [
  ['#E8D5C4', '#C9A89B', '#A67B6B', '#7D5A50'],
  ['#B8D4E3', '#8BB8C9', '#5E9AB3', '#3A7D99'],
  ['#E3D5B8', '#C9B88B', '#A39A6B', '#7D7850'],
  ['#D5E8C4', '#A8C99B', '#7BA66B', '#507D4A'],
  ['#E8C4D5', '#C99BA8', '#A66B7B', '#7D5064'],
  ['#C4D5E8', '#9BA8C9', '#6B7BA6', '#50647D'],
];

const PROMPT_SUGGESTIONS = [
  'A weathered lighthouse on a foggy cliff',
  'Abstract emotions in flowing water',
  'An ancient forest at twilight',
  'Forgotten ruins overtaken by nature',
  'The weight of a single raindrop',
  'Industrial decay meeting wild flowers',
];

function generateWatercolorId(): string {
  return `WC-${Date.now().toString(36).toUpperCase()}`;
}

function WatercolorCanvas({ colors, prompt }: { colors: string[]; prompt: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`watercolor-canvas ${mounted ? 'mounted' : ''}`}>
      <div className="watercolor-inner">
        {/* Watercolor blobs */}
        <svg viewBox="0 0 400 300" className="watercolor-svg">
          <defs>
            <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="paper">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
              <feDiffuseLighting surfaceScale="2" diffuseConstant="1">
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
            </filter>
          </defs>

          {/* Paper texture background */}
          <rect width="100%" height="100%" fill="#FAF8F5" />

          {/* Watercolor shapes */}
          <ellipse
            cx="120" cy="100" rx="90" ry="70"
            fill={colors[0]}
            opacity="0.6"
            filter="url(#watercolor)"
            className="blob blob-1"
          />
          <ellipse
            cx="280" cy="80" rx="70" ry="55"
            fill={colors[1]}
            opacity="0.5"
            filter="url(#watercolor)"
            className="blob blob-2"
          />
          <ellipse
            cx="200" cy="180" rx="100" ry="80"
            fill={colors[2]}
            opacity="0.55"
            filter="url(#watercolor)"
            className="blob blob-3"
          />
          <ellipse
            cx="320" cy="220" rx="60" ry="50"
            fill={colors[3]}
            opacity="0.45"
            filter="url(#watercolor)"
            className="blob blob-4"
          />
          <ellipse
            cx="80" cy="240" rx="75" ry="45"
            fill={colors[0]}
            opacity="0.35"
            filter="url(#watercolor)"
            className="blob blob-5"
          />
        </svg>

        {/* Prompt overlay */}
        <div className="prompt-overlay">
          <span className="prompt-text">"{prompt}"</span>
        </div>
      </div>

      {/* Watercolor bleed effect */}
      <div className="bleed-effect bleed-1" style={{ backgroundColor: colors[0] }} />
      <div className="bleed-effect bleed-2" style={{ backgroundColor: colors[1] }} />
      <div className="bleed-effect bleed-3" style={{ backgroundColor: colors[2] }} />
    </div>
  );
}

function GeneratedCard({ image, index }: { image: GeneratedImage; index: number }) {
  return (
    <div
      className="generated-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header">
        <span className="card-id">{image.id}</span>
        <span className="card-time">{new Date(image.timestamp).toLocaleTimeString()}</span>
      </div>
      <WatercolorCanvas colors={image.colors} prompt={image.prompt} />
    </div>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedImage[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    const palette = WATERCOLOR_PALETTES[Math.floor(Math.random() * WATERCOLOR_PALETTES.length)];

    const newImage: GeneratedImage = {
      id: generateWatercolorId(),
      prompt: prompt.trim(),
      colors: palette,
      timestamp: Date.now(),
    };

    setGenerated(prev => [newImage, ...prev]);
    setPrompt('');
    setIsGenerating(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="app-container">
      {/* Brutalist grid overlay */}
      <div className="grid-overlay" />

      {/* Watercolor splash decorations */}
      <div className="splash splash-1" />
      <div className="splash splash-2" />
      <div className="splash splash-3" />

      <header className="header">
        <div className="header-block">
          <h1 className="title">
            <span className="title-line">WATERCOLOR</span>
            <span className="title-line title-line-alt">GENERATOR</span>
          </h1>
          <div className="subtitle-block">
            <span className="subtitle">AI-POWERED</span>
            <span className="divider">//</span>
            <span className="subtitle">BRUTALIST INTERFACE</span>
          </div>
        </div>

        <div className="version-badge">
          <span>V.01</span>
        </div>
      </header>

      <main className="main-content">
        <section className="input-section">
          <div className="input-label-row">
            <label className="input-label">PROMPT_INPUT</label>
            <button
              className="suggestions-toggle"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              {showSuggestions ? '[-]' : '[+]'} SUGGESTIONS
            </button>
          </div>

          {showSuggestions && (
            <div className="suggestions-panel">
              {PROMPT_SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="input-wrapper">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your watercolor vision..."
              className="prompt-input"
              rows={3}
              disabled={isGenerating}
            />
            <div className="input-border" />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="generate-btn"
          >
            {isGenerating ? (
              <>
                <span className="loading-indicator" />
                RENDERING...
              </>
            ) : (
              <>
                GENERATE
                <span className="btn-arrow">&rarr;</span>
              </>
            )}
          </button>
        </section>

        <section className="output-section">
          <div className="section-header">
            <span className="section-title">OUTPUT_GALLERY</span>
            <span className="section-count">[{generated.length}]</span>
          </div>

          {generated.length === 0 ? (
            <div className="empty-state">
              <div className="empty-box">
                <span className="empty-icon">&#9634;</span>
                <p className="empty-text">NO GENERATIONS YET</p>
                <p className="empty-subtext">Enter a prompt above to create your first watercolor</p>
              </div>
            </div>
          ) : (
            <div className="gallery-grid">
              {generated.map((image, index) => (
                <GeneratedCard key={image.id} image={image} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <span className="footer-text">Requested by @OxPaulius · Built by @clonkbot</span>
      </footer>
    </div>
  );
}
