import { ParticleBackground } from './ParticleBackground';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Sonar pulse animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="sonar-ring"></div>
        <div className="sonar-ring" style={{ animationDelay: '1s' }}></div>
        <div className="sonar-ring" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <h1
          className="text-5xl md:text-7xl mb-6"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          Your Image. Your Identity.
          <br />
          <span className="text-[#00d4ff]">Protected.</span>
        </h1>

        <p
          className="text-lg md:text-xl text-white/70 max-w-[700px] mx-auto mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Sentinel applies invisible adversarial protection to your photos —
          making them immune to deepfake AI before the damage is done.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="px-8 py-4 bg-[#00d4ff] text-[#050a0f] transition-all duration-300 cta-pulse-button"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
          >
            PROTECT MY IMAGE
          </button>

          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-8 py-4 border-2 border-[#00d4ff] text-[#00d4ff] bg-transparent transition-all duration-300 hover:bg-[#00d4ff]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
            }}
          >
            SEE HOW IT WORKS
          </button>
        </div>
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

        @media (prefers-reduced-motion: reduce) {
          .sonar-ring,
          .cta-pulse-button {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
