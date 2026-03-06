import { useEffect, useState } from 'react';

export function Problem() {
  const [deepfakeCount, setDeepfakeCount] = useState(127453);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeepfakeCount((prev) => prev + Math.floor(Math.random() * 3 + 1));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="problem" className="py-24 md:py-32 px-6 bg-[#050a0f]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h2
            className="text-4xl md:text-5xl tracking-[0.15em] uppercase mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            THE <span className="text-[#ff2d55]">THREAT</span>
          </h2>
          <div className="w-10 h-1 bg-[#ff2d55]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Stats Block */}
          <div className="space-y-8">
            <div>
              <div
                className="text-6xl md:text-7xl text-[#00d4ff] mb-2"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                }}
              >
                1
              </div>
              <p
                className="text-xl text-white/80"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Photo is all it takes
              </p>
            </div>

            <div>
              <div
                className="text-3xl md:text-4xl text-[#ff2d55] mb-2 font-mono"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                }}
              >
                {deepfakeCount.toLocaleString()}
              </div>
              <p
                className="text-xl text-white/80"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                AI deepfakes created today
              </p>
            </div>
          </div>

          {/* Problem Text */}
          <div className="space-y-6">
            <p
              className="text-lg text-white/90 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              
              🛡️"Your face shouldn't be someone else's data point. Sentinel shields your photos from deepfake tech with an invisible layer of protection that actually works."
            </p>
            <p
              className="text-lg text-white/90 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              🛡️"You shouldn't have to be afraid to share your life online. Sentinel gives you your privacy back by making your photos 'immune' to AI manipulation. It’s invisible protection for a digital world."
            </p>
            <p
              className="text-lg text-white/90 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
             
            </p>
            <div className="pt-6">
              <div className="px-6 py-4 bg-[#ff2d55]/10 border-l-4 border-[#ff2d55]">
                <p
                  className="text-[#ff2d55]"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  The question isn't if you'll be targeted.
                  <br />
                  It's when.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Protection Visualizer */}
        <div className="mt-16">
          <div
            className="p-8 md:p-12 rounded-lg"
            style={{
              background: 'rgba(0, 212, 255, 0.03)',
              border: '1px solid rgba(0, 212, 255, 0.12)',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.1)',
            }}
          >
            <div className="grid md:grid-cols-3 gap-8 items-start mb-6">
              {/* Panel 1 - Original Photo */}
              <div className="flex flex-col items-center">
                <p
                  className="text-xs tracking-widest uppercase mb-4 text-[#ff2d55]"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  AI SEES: VULNERABLE
                </p>
                <div className="relative w-full aspect-square bg-[#0d1f2d] rounded-lg overflow-hidden mb-4 scanline-container">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent 0px, transparent 8px, #ff2d55 8px, #ff2d55 9px), repeating-linear-gradient(90deg, transparent 0px, transparent 8px, #ff2d55 8px, #ff2d55 9px)',
                    }}
                  ></div>
                  <div className="scanline"></div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(255, 45, 85, 0.1)',
                      border: '1px solid rgba(255, 45, 85, 0.3)',
                      color: '#ff2d55',
                    }}
                  >
                    Face Detected
                  </span>
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(255, 45, 85, 0.1)',
                      border: '1px solid rgba(255, 45, 85, 0.3)',
                      color: '#ff2d55',
                    }}
                  >
                    Identity Mapped
                  </span>
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(255, 45, 85, 0.1)',
                      border: '1px solid rgba(255, 45, 85, 0.3)',
                      color: '#ff2d55',
                    }}
                  >
                    Exploitable
                  </span>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex flex-col items-center justify-center -mx-8">
                <p
                  className="text-xs tracking-widest uppercase mb-2 text-[#00d4ff]"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  SENTINEL APPLIED
                </p>
                <svg width="60" height="20" viewBox="0 0 60 20" className="flowing-arrow">
                  <defs>
                    <marker
                      id="arrowhead-cyan"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#00d4ff" />
                    </marker>
                  </defs>
                  <line
                    x1="0"
                    y1="10"
                    x2="60"
                    y2="10"
                    stroke="#00d4ff"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead-cyan)"
                  />
                </svg>
              </div>

              {/* Panel 2 - Protection Applied */}
              <div className="flex flex-col items-center">
                <p
                  className="text-xs tracking-widest uppercase mb-4 text-[#00d4ff]"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  PROCESSING: SHIELDING
                </p>
                <div className="relative w-full aspect-square bg-[#0d1f2d] rounded-lg overflow-hidden mb-4">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 212, 255, 0.2) 0%, transparent 50%), linear-gradient(45deg, rgba(0, 212, 255, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 212, 255, 0.1) 75%)',
                      backgroundSize: '100% 100%, 100% 100%, 4px 4px',
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="progress-ring"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#00d4ff',
                    }}
                  >
                    Perturbation Injected
                  </span>
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#00d4ff',
                    }}
                  >
                    FGSM Active
                  </span>
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#00d4ff',
                    }}
                  >
                    Layer Encrypted
                  </span>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex flex-col items-center justify-center -mx-8">
                <p
                  className="text-xs tracking-widest uppercase mb-2 text-[#00ff88]"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  PROTECTION COMPLETE
                </p>
                <svg width="60" height="20" viewBox="0 0 60 20" className="flowing-arrow">
                  <defs>
                    <marker
                      id="arrowhead-green"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#00ff88" />
                    </marker>
                  </defs>
                  <line
                    x1="0"
                    y1="10"
                    x2="60"
                    y2="10"
                    stroke="#00ff88"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead-green)"
                  />
                </svg>
              </div>

              {/* Panel 3 - Protected Image */}
              <div className="flex flex-col items-center">
                <p
                  className="text-xs tracking-widest uppercase mb-4 text-[#00ff88]"
                  style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
                >
                  AI SEES: CORRUPTED
                </p>
                <div className="relative w-full aspect-square bg-[#0d1f2d] rounded-lg overflow-hidden mb-4 glitch-container">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent 0px, transparent 8px, #00ff88 8px, #00ff88 9px), repeating-linear-gradient(90deg, transparent 0px, transparent 8px, #00ff88 8px, #00ff88 9px)',
                    }}
                  ></div>
                  <div className="glitch-effect"></div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                      color: '#00ff88',
                    }}
                  >
                    Deepfake Failed
                  </span>
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                      color: '#00ff88',
                    }}
                  >
                    Output Distorted
                  </span>
                  <span
                    className="px-3 py-1 text-xs rounded-full"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      background: 'rgba(0, 255, 136, 0.1)',
                      border: '1px solid rgba(0, 255, 136, 0.3)',
                      color: '#00ff88',
                    }}
                  >
                    Identity Safe
                  </span>
                </div>
              </div>
            </div>

            <p
              className="text-center text-sm italic text-white/60 mt-8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              To human eyes, all three images look identical. Only AI models are disrupted.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .scanline-container {
          position: relative;
        }

        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #ff2d55;
          box-shadow: 0 0 10px #ff2d55;
          animation: scanline 3s linear infinite;
        }

        @keyframes progressPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }

        .progress-ring {
          width: 60px;
          height: 60px;
          border: 3px solid transparent;
          border-top-color: #00d4ff;
          border-radius: 50%;
          animation: progressPulse 2s ease-in-out infinite;
        }

        @keyframes glitch {
          0%, 90%, 100% {
            clip-path: inset(0 0 0 0);
          }
          92% {
            clip-path: inset(20% 0 30% 0);
            transform: translateX(4px);
          }
          94% {
            clip-path: inset(50% 0 10% 0);
            transform: translateX(-4px);
          }
          96% {
            clip-path: inset(10% 0 60% 0);
            transform: translateX(6px);
          }
        }

        .glitch-effect {
          position: absolute;
          inset: 0;
          background: rgba(0, 255, 136, 0.1);
          animation: glitch 4s ease-in-out infinite;
        }

        @keyframes arrowFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -10;
          }
        }

        .flowing-arrow line {
          animation: arrowFlow 1.5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .scanline,
          .progress-ring,
          .glitch-effect,
          .flowing-arrow line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}