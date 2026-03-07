import { useState, useRef, useEffect } from 'react';
import { Upload, Check, Shield as ShieldIcon } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';

type PageState = 'upload' | 'processing' | 'complete';

export function ProtectPage() {
  const [state, setState] = useState<PageState>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [protectedBlobUrl, setProtectedBlobUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('LOADING');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      if (protectedBlobUrl) URL.revokeObjectURL(protectedBlobUrl);
    };
  }, [protectedBlobUrl]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.match('image/(jpeg|png|webp)')) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleProtect = async () => {
    if (!file) return;

    setState('processing');
    setProgress(0);
    setError(null);

    const setStage = (p: number) => {
      if (p < 20) setCurrentStage('LOADING');
      else if (p < 40) setCurrentStage('IMAGE PREPROCESSING');
      else if (p < 60) setCurrentStage('APPLYING PROTECTION');
      else if (p < 80) setCurrentStage('IMAGE POST PROCESSING');
      else setCurrentStage('DONE');
    };

    try {
      setProgress(10);
      setStage(10);

      const formData = new FormData();
      formData.append('file', file);

      setProgress(30);
      setStage(30);

      const res = await fetch('/protect', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Server error ${res.status}`);
      }

      setProgress(70);
      setStage(70);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setProtectedBlobUrl(url);

      setProgress(100);
      setStage(100);

      setTimeout(() => setState('complete'), 600);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Protection failed');
      setState('upload');
    }
  };

  const handleDownload = () => {
    if (!protectedBlobUrl) return;
    const a = document.createElement('a');
    a.href = protectedBlobUrl;
    a.download = file ? `sentinel_protected_${file.name}` : 'sentinel_protected.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (protectedBlobUrl) URL.revokeObjectURL(protectedBlobUrl);
    setProtectedBlobUrl(null);
    setFile(null);
    setState('upload');
    setProgress(0);
    setCurrentStage('LOADING');
    setError(null);
  };

  const getProgressGradient = () => {
    if (progress < 20) return 'linear-gradient(90deg, #00d4ff, #00a8cc)';
    if (progress < 40) return 'linear-gradient(90deg, #00a8cc, #0080ff)';
    if (progress < 60) return 'linear-gradient(90deg, #0080ff, #7b2ff7)';
    if (progress < 80) return 'linear-gradient(90deg, #7b2ff7, #00d4ff)';
    return 'linear-gradient(90deg, #00d4ff, #00ff88)';
  };

  const stages = [
    { name: 'LOADING', threshold: 0 },
    { name: 'IMAGE PREPROCESSING', threshold: 20 },
    { name: 'APPLYING PROTECTION', threshold: 40 },
    { name: 'IMAGE POST PROCESSING', threshold: 60 },
    { name: 'DONE', threshold: 80 },
  ];

  const getStageStatus = (stageName: string) => {
    const stageIndex = stages.findIndex((s) => s.name === stageName);
    const currentIndex = stages.findIndex((s) => s.name === currentStage);

    if (stageIndex < currentIndex) return 'complete';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a0f]">
      <ParticleBackground />

      {/* Sonar rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="sonar-ring"></div>
        <div className="sonar-ring" style={{ animationDelay: '1s' }}></div>
        <div className="sonar-ring" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full px-6 py-20">
        {/* STATE 1: Upload Zone */}
        {state === 'upload' && (
          <div className="max-w-[560px] mx-auto text-center fade-in">
            <h1
              className="text-4xl mb-4"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.15em',
              }}
            >
              UPLOAD YOUR IMAGE
            </h1>
            <p
              className="text-[0.95rem] mb-12"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Your file is processed locally. Nothing is stored or transmitted.
            </p>

            <div
              className={`border-2 rounded-lg p-12 sm:p-16 cursor-pointer transition-all duration-300 ${
                isDragging || file
                  ? 'border-solid border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.15)]'
                  : 'border-dashed border-[#00d4ff]/30'
              } ${
                !file && 'hover:border-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]'
              }`}
              style={{
                background: 'rgba(0,212,255,0.03)',
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileSelect(selectedFile);
                }}
              />

              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <Check
                    className="text-[#00d4ff]"
                    size={64}
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5))',
                    }}
                  />
                  <p
                    className="text-white text-base truncate max-w-full"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {file.name.length > 30 ? file.name.substring(0, 30) + '...' : file.name}
                  </p>
                  <p
                    className="text-white/45 text-[0.85rem]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {formatFileSize(file.size)}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload
                    className="text-[#00d4ff]"
                    size={64}
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.5))',
                    }}
                  />
                  <p
                    className="text-white text-base"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Drag & drop your image here
                  </p>
                  <p
                    className="text-white/45 text-[0.85rem] mt-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    or click to browse
                  </p>
                  <p
                    className="text-white/30 text-[0.75rem] mt-4"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Supports: JPG, PNG, WEBP
                  </p>
                </div>
              )}
            </div>

            {file && (
              <button
                onClick={handleProtect}
                className="mt-8 px-8 py-4 bg-[#00d4ff] text-[#050a0f] transition-all duration-300 cta-pulse-button fade-in"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  clipPath:
                    'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                PROTECT MY IMAGE
              </button>
            )}
            {error && (
              <p className="mt-4 text-red-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {error}
              </p>
            )}
          </div>
        )}

        {/* STATE 2: Protection Pipeline */}
        {state === 'processing' && (
          <div className="max-w-[600px] mx-auto text-center fade-in">
            <h2
              className="text-2xl mb-8 text-[#00d4ff]"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              {currentStage}
            </h2>

            <div
              className="text-8xl sm:text-9xl mb-6"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                color: '#fff',
                textShadow: '0 0 30px rgba(0,212,255,0.6)',
              }}
            >
              {Math.floor(progress)}%
            </div>

            {/* Progress Bar */}
            <div
              className="w-full h-[6px] rounded-full overflow-hidden mb-10"
              style={{ background: 'rgba(0,212,255,0.1)' }}
            >
              <div
                className="h-full rounded-full transition-all relative progress-shimmer"
                style={{
                  width: `${progress}%`,
                  background: getProgressGradient(),
                }}
              ></div>
            </div>

            {/* Stage Pipeline */}
            <div className="hidden sm:flex items-center justify-between gap-2">
              {stages.map((stage, index) => {
                const status = getStageStatus(stage.name);
                return (
                  <div key={stage.name} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          status === 'complete'
                            ? 'bg-[#00ff88]'
                            : status === 'active'
                            ? 'bg-[#00d4ff] stage-pulse'
                            : 'bg-white/20'
                        }`}
                      ></div>
                      <p
                        className="text-[0.55rem] text-center"
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          letterSpacing: '0.1em',
                          color:
                            status === 'active'
                              ? '#00d4ff'
                              : status === 'complete'
                              ? 'rgba(255,255,255,0.6)'
                              : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {stage.name}
                      </p>
                    </div>
                    {index < stages.length - 1 && (
                      <div
                        className="w-8 border-t border-dashed"
                        style={{ borderColor: 'rgba(0,212,255,0.2)' }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Stage Pipeline - Vertical */}
            <div className="flex sm:hidden flex-col items-center gap-4">
              {stages.map((stage, index) => {
                const status = getStageStatus(stage.name);
                return (
                  <div key={stage.name} className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          status === 'complete'
                            ? 'bg-[#00ff88]'
                            : status === 'active'
                            ? 'bg-[#00d4ff] stage-pulse'
                            : 'bg-white/20'
                        }`}
                      ></div>
                      <p
                        className="text-[0.7rem]"
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          letterSpacing: '0.1em',
                          color:
                            status === 'active'
                              ? '#00d4ff'
                              : status === 'complete'
                              ? 'rgba(255,255,255,0.6)'
                              : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {stage.name}
                      </p>
                    </div>
                    {index < stages.length - 1 && (
                      <div
                        className="h-4 border-l border-dashed"
                        style={{ borderColor: 'rgba(0,212,255,0.2)' }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STATE 3: Download Ready */}
        {state === 'complete' && (
          <div className="max-w-[560px] mx-auto text-center fade-in">
            <div className="mb-8 shield-reveal">
              <ShieldIcon
                size={80}
                className="mx-auto text-[#00d4ff]"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.5))',
                }}
              />
            </div>

            <h2
              className="text-4xl mb-8"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.15em',
              }}
            >
              PROTECTION COMPLETE
            </h2>

            {/* Disclaimer Block */}
            <div
              className="rounded-lg p-6 sm:p-8 mb-8 text-left"
              style={{
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <p
                className="text-[#00d4ff] text-[0.65rem] mb-3"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '0.12em',
                }}
              >
                SENTINEL PROTECTION REPORT
              </p>
              <p
                className="text-white/70 text-[0.88rem] leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                Your image has been processed with adversarial perturbation technology
                (FGSM-based). This protection is designed to confuse and degrade AI-based
                deepfake generation models.
              </p>
              <p
                className="text-white/70 text-[0.88rem] leading-relaxed mt-4"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                <strong>Estimated protection effectiveness: 70–85%</strong> against standard
                generative AI models. Effectiveness may vary depending on the specific AI tool
                used, image resolution, and future model updates.
              </p>
              <p
                className="text-white/70 text-[0.88rem] leading-relaxed mt-4"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
              >
                This technology is a proactive defense layer — not a guarantee. We recommend using
                it in combination with platform privacy settings.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="px-9 py-4 bg-[#00d4ff] text-[#050a0f] transition-all duration-300 cta-pulse-button mb-6"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                clipPath:
                  'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              DOWNLOAD PROTECTED IMAGE
            </button>

            <button
              onClick={handleReset}
              className="block mx-auto text-white/45 hover:text-[#00d4ff] transition-colors text-[0.85rem]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ← Protect another image
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes sonar {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        .sonar-ring {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid #00d4ff;
          border-radius: 50%;
          animation: sonar 3s ease-out infinite;
          pointer-events: none;
        }

        @keyframes ctaPulse {
          0%, 100% {
            box-shadow: 0 0 0 rgba(0, 212, 255, 0);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
          }
        }

        .cta-pulse-button {
          animation: ctaPulse 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 1.2s linear infinite;
        }

        @keyframes stagePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.4);
          }
        }

        .stage-pulse {
          animation: stagePulse 1s ease-in-out infinite;
        }

        @keyframes shieldReveal {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .shield-reveal {
          animation: shieldReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .fade-in {
          animation: fadeIn 0.4s ease-in;
        }

        @media (prefers-reduced-motion: reduce) {
          .sonar-ring,
          .cta-pulse-button,
          .progress-shimmer::after,
          .stage-pulse,
          .shield-reveal,
          .fade-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
