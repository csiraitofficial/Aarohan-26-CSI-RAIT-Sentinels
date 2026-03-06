import { useEffect, useRef, useState } from 'react';
import { Upload, Lock, CheckCircle } from 'lucide-react';

export function Solution() {
  const [radarAngle, setRadarAngle] = useState(0);
  const [nodesVisible, setNodesVisible] = useState([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Radar sweep animation
    let animationId: number;
    const animate = () => {
      setRadarAngle((prev) => (prev + 0.5) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    // Intersection observer for node animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger node appearance
            setTimeout(() => setNodesVisible([true, false, false]), 100);
            setTimeout(() => setNodesVisible([true, true, false]), 400);
            setTimeout(() => setNodesVisible([true, true, true]), 700);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  const nodes = [
    { 
      angle: -90, 
      icon: Upload, 
      label: 'UPLOAD SHIELD',
      description: 'Your image enters an encrypted pipeline. Zero data retention.',
    },
    { 
      angle: 30, 
      icon: Lock, 
      label: 'ENCRYPT LAYER',
      description: 'Invisible adversarial perturbations embedded via FGSM algorithm.',
    },
    { 
      angle: 150, 
      icon: CheckCircle, 
      label: 'SAFE DEPLOY',
      description: 'Protected image returned. Deepfake AI encounters only noise.',
    },
  ];

  return (
    <section id="solution" ref={sectionRef} className="py-24 md:py-32 px-6 bg-[#050a0f]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl tracking-[0.15em] uppercase mb-6"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            HOW SENTINEL <span className="text-[#00d4ff]">PROTECTS YOU</span>
          </h2>
          <p
            className="text-lg text-white/70 max-w-[700px] mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Orbital defense system for your digital identity
          </p>
        </div>

        {/* Orbital Defense Ring */}
        <div className="relative w-full max-w-[600px] aspect-square mx-auto mb-16">
          {/* Radar sweep background */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from ${radarAngle}deg, transparent 340deg, rgba(0, 212, 255, 0.08) 360deg)`,
              transition: 'background 0.1s linear',
            }}
          ></div>

          {/* Center Shield */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-24 h-24">
              {/* Rotating outer ring */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full orbit-ring"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1"
                  strokeDasharray="10 5"
                  opacity="0.4"
                />
              </svg>
              
              {/* Shield icon */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, rgba(5, 10, 15, 0.9) 70%)',
                  borderRadius: '50%',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-12 h-12"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Orbiting Nodes */}
          {nodes.map((node, index) => {
            const radius = 180;
            const angleRad = (node.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            return (
              <div key={index}>
                {/* Connecting line to center */}
                <svg
                  className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="#00d4ff"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    opacity="0.4"
                    className="flowing-line"
                  />
                </svg>

                {/* Node */}
                <div
                  className={`absolute top-1/2 left-1/2 transition-all duration-300 ${
                    nodesVisible[index]
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-50'
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(5, 10, 15, 0.9)',
                      border: '2px solid #00d4ff',
                      boxShadow: '0 0 15px rgba(0, 212, 255, 0.6)',
                    }}
                  >
                    <node.icon className="w-8 h-8 text-[#00d4ff]" strokeWidth={2} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat Bars */}
        <div className="space-y-4 max-w-[900px] mx-auto">
          {nodes.map((node, index) => (
            <div
              key={index}
              className="stat-bar group cursor-default"
              style={{
                borderLeft: '2px solid #00d4ff',
                paddingLeft: '1.5rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div className="flex items-center gap-4">
                <node.icon className="w-5 h-5 text-[#00d4ff] flex-shrink-0" strokeWidth={2} />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span
                    className="text-lg whitespace-nowrap"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontWeight: 700,
                      color: '#fff',
                      minWidth: '180px',
                    }}
                  >
                    {node.label}
                  </span>
                  <span className="hidden sm:inline text-[#00d4ff]">|</span>
                  <span
                    className="text-white/70"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {node.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbit-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .orbit-ring {
          animation: orbit-ring 8s linear infinite;
        }

        @keyframes flowingDash {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 10;
          }
        }

        .flowing-line {
          animation: flowingDash 2s linear infinite;
        }

        .stat-bar:hover {
          border-left-color: #00d4ff;
          box-shadow: -4px 0 20px rgba(0, 212, 255, 0.3);
          transform: translateX(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .flowing-line {
            animation: none;
          }
          .stat-bar:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
