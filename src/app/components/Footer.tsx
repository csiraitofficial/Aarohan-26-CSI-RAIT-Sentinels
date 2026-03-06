import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 px-6 bg-[#050a0f] border-t border-[#00d4ff]/10 overflow-hidden">
      {/* Scanline texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, #00d4ff 2px, #00d4ff 4px)',
        }}
      ></div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Shield Icon */}
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30"
            style={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
            }}
          >
            <Shield className="w-8 h-8 text-[#00d4ff]" strokeWidth={2} />
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p
              className="text-white/60 mb-2"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              <span className="text-[#00d4ff]">SENTINEL</span> © 2025
            </p>
            <p
              className="text-white/40 text-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Team Sentinels · RAIT
            </p>
          </div>

          {/* Additional Footer Info */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-white/40">
            <a
              href="#"
              className="hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href="#"
              className="hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Terms of Service
            </a>
            <span>·</span>
            <a
              href="#"
              className="hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
