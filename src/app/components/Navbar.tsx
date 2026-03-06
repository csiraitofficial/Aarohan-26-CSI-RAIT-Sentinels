import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050a0f]/80 backdrop-blur-xl border-b border-[#00d4ff]/15'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#00d4ff]" strokeWidth={2} />
            <span
              className="text-2xl tracking-[0.15em] uppercase"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                textShadow: '0 0 20px #00d4ff',
                color: '#fff',
              }}
            >
              SENTINEL
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('problem')}
              className="text-white/80 hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Problem
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-white/80 hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Solution
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-white/80 hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              How It Works
            </button>
            <button
              className="px-6 py-2 bg-[#00d4ff] text-[#050a0f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              GET PROTECTED
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-[#050a0f]/95 backdrop-blur-xl border-l border-[#00d4ff]/15 z-50 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 p-8 pt-20">
          <button
            onClick={() => scrollToSection('problem')}
            className="text-white/80 hover:text-[#00d4ff] transition-colors text-left"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Problem
          </button>
          <button
            onClick={() => scrollToSection('solution')}
            className="text-white/80 hover:text-[#00d4ff] transition-colors text-left"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Solution
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-white/80 hover:text-[#00d4ff] transition-colors text-left"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            How It Works
          </button>
          <button
            className="px-6 py-2 bg-[#00d4ff] text-[#050a0f] transition-all duration-300"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            GET PROTECTED
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}