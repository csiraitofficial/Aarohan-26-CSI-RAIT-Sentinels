import { useEffect, useRef, useState } from 'react';
import { Upload, Lock, CheckCircle, Download } from 'lucide-react';

interface NodeData {
  angle: number;
  icon: React.ElementType;
  label: string;
  description: string;
}

export function Solution() {
  const [radarAngle, setRadarAngle] = useState(0);
  const [nodesVisible, setNodesVisible] = useState([false, false, false]);
  const [labelsVisible, setLabelsVisible] = useState([false, false, false]);
  const [linesVisible, setLinesVisible] = useState([false, false, false]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nodes: NodeData[] = [
    {
      angle: -90,
      icon: Upload,
      label: 'UPLOAD',
      description: "Drop your photo into Sentinel's encrypted pipeline. Your original file never leaves the secure environment unprotected.",
    },
    {
      angle: 30,
      icon: Lock,
      label: 'GET PROTECTED',
      description: 'Sentinel injects invisible adversarial noise using the FGSM algorithm — imperceptible to humans, catastrophic to deepfake AI models.',
    },
    {
      angle: 150,
      icon: Download,
      label: 'DOWNLOAD',
      description: 'Retrieve your shielded image. Visually identical to the original — but any AI that tries to clone your face will produce distorted, unusable output.',
    },
  ];

  useEffect(() => {
    // Radar sweep animation
    let animationId: number;
    const animate = () => {
      setRadarAngle((prev) => (prev + 0.5) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    // Intersection observer for node burst animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Burst animation: nodes launch from center
            setTimeout(() => setNodesVisible([true, false, false]), 0);
            setTimeout(() => setNodesVisible([true, true, false]), 150);
            setTimeout(() => setNodesVisible([true, true, true]), 300);

            // Labels fade in after nodes arrive
            setTimeout(() => setLabelsVisible([true, false, false]), 200);
            setTimeout(() => setLabelsVisible([true, true, false]), 350);
            setTimeout(() => setLabelsVisible([true, true, true]), 500);

            // Lines fade in after nodes arrive
            setTimeout(() => setLinesVisible([true, false, false]), 500);
            setTimeout(() => setLinesVisible([true, true, false]), 650);
            setTimeout(() => setLinesVisible([true, true, true]), 800);
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

  const handleNodeClick = (index: number) => {
    // For mobile: toggle tooltip
    if (window.innerWidth <= 768) {
      setActiveTooltip(activeTooltip === index ? null : index);
    }
  };

  const handleNodeMouseEnter = (index: number) => {
    if (window.innerWidth > 768) {
      setHoveredNode(index);
    }
  };

  const handleNodeMouseLeave = () => {
    if (window.innerWidth > 768) {
      setHoveredNode(null);
    }
  };

  const handleBackgroundClick = () => {
    // Close tooltips on mobile when clicking outside
    if (window.innerWidth <= 768) {
      setActiveTooltip(null);
    }
  };

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-[#050a0f] relative"
      onClick={handleBackgroundClick}
    >
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
        <div className="relative w-full max-w-[600px] aspect-square mx-auto" style={{ overflow: 'visible' }}>
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
                  background:
                    'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, rgba(5, 10, 15, 0.9) 70%)',
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

            const isHovered = hoveredNode === index;
            const showTooltip = isHovered || activeTooltip === index;

            // Determine tooltip position and arrow direction
            // Top node (index 0, UPLOAD) and bottom-right node (index 1, GET PROTECTED): tooltip on right
            // Bottom-left node (index 2, DOWNLOAD): tooltip on left
            const tooltipOnLeft = index === 2;
            const arrowStartX = tooltipOnLeft ? -32 : 32; // Start from left or right edge of circle
            const arrowLength = 55;
            const arrowAngle = 15; // Upward tilt in degrees
            const arrowEndX = tooltipOnLeft
              ? arrowStartX - arrowLength * Math.cos((arrowAngle * Math.PI) / 180)
              : arrowStartX + arrowLength * Math.cos((arrowAngle * Math.PI) / 180);
            const arrowEndY = -arrowLength * Math.sin((arrowAngle * Math.PI) / 180);

            return (
              <div key={index}>
                {/* Connecting line to center */}
                <svg
                  className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    opacity: linesVisible[index] ? 0.4 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="#00d4ff"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    className="flowing-line"
                  />
                </svg>

                {/* Node */}
                <div
                  className="absolute top-1/2 left-1/2 z-20"
                  style={{
                    transform: nodesVisible[index]
                      ? `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1)`
                      : 'translate(-50%, -50%) translate(0, 0) scale(0)',
                    opacity: nodesVisible[index] ? 1 : 0,
                    transition:
                      'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(index);
                  }}
                  onMouseEnter={() => handleNodeMouseEnter(index)}
                  onMouseLeave={handleNodeMouseLeave}
                >
                  {/* New Tooltip with Arrow */}
                  {showTooltip && (
                    <div className="absolute top-0 left-0 pointer-events-none z-50">
                      {/* Arrow SVG */}
                      <svg
                        className="absolute"
                        style={{
                          width: Math.abs(arrowEndX - arrowStartX) + 20,
                          height: Math.abs(arrowEndY) + 20,
                          left: tooltipOnLeft ? arrowEndX - 10 : arrowStartX - 10,
                          top: arrowEndY - 10,
                          overflow: 'visible',
                        }}
                      >
                        <line
                          x1={tooltipOnLeft ? Math.abs(arrowEndX - arrowStartX) + 10 : 10}
                          y1={Math.abs(arrowEndY) + 10}
                          x2={tooltipOnLeft ? 10 : Math.abs(arrowEndX - arrowStartX) + 10}
                          y2="10"
                          stroke="#00d4ff"
                          strokeWidth="1.5"
                          style={{
                            strokeDasharray: arrowLength,
                            strokeDashoffset: showTooltip ? 0 : arrowLength,
                            transition: 'stroke-dashoffset 0.3s ease',
                          }}
                        />
                      </svg>

                      {/* Description Box */}
                      <div
                        style={{
                          position: 'absolute',
                          left: tooltipOnLeft ? arrowEndX - 220 : arrowEndX,
                          top: arrowEndY - 10,
                          background: 'rgba(5, 10, 15, 0.92)',
                          border: '1px solid rgba(0, 212, 255, 0.25)',
                          backdropFilter: 'blur(14px)',
                          boxShadow:
                            '0 0 24px rgba(0, 212, 255, 0.15), inset 0 0 0 1px rgba(0,212,255,0.05)',
                          borderRadius: '6px',
                          padding: '14px 18px',
                          maxWidth: '220px',
                          minWidth: '180px',
                          zIndex: 50,
                          opacity: showTooltip ? 1 : 0,
                          transform: showTooltip
                            ? 'translateX(0)'
                            : tooltipOnLeft
                            ? 'translateX(8px)'
                            : 'translateX(-8px)',
                          transition: 'opacity 0.25s ease, transform 0.25s ease',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.65rem',
                            letterSpacing: '0.12em',
                            color: '#00d4ff',
                            textTransform: 'uppercase',
                            marginBottom: '8px',
                          }}
                        >
                          {node.label}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.78rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.75)',
                          }}
                        >
                          {node.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Node Circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: 'rgba(5, 10, 15, 0.9)',
                      border: isHovered ? '3px solid #00d4ff' : '2px solid #00d4ff',
                      boxShadow: isHovered
                        ? '0 0 35px rgba(0, 212, 255, 1), 0 0 60px rgba(0, 212, 255, 0.4)'
                        : '0 0 15px rgba(0, 212, 255, 0.6)',
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <node.icon className="w-8 h-8 text-[#00d4ff]" strokeWidth={2} />
                  </div>

                  {/* Node Label */}
                  <div
                    className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      color: isHovered ? '#ffffff' : '#00d4ff',
                      fontWeight: 700,
                      opacity: labelsVisible[index] ? 1 : 0,
                      transition: 'opacity 0.4s ease, color 0.25s ease',
                    }}
                  >
                    {node.label}
                  </div>
                </div>
              </div>
            );
          })}
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

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .flowing-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}