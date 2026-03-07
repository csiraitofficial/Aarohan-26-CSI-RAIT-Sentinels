import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
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
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
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
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white/80 hover:text-[#00d4ff] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Home
            </button>
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

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <UserIcon className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-white/90">{user?.name}</span>
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#050a0f]/95 backdrop-blur-xl border border-[#00d4ff]/20 rounded-lg overflow-hidden shadow-xl">
                    <div className="p-3 border-b border-[#00d4ff]/10">
                      <p className="text-xs text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[#ff2d55]/10 text-[#ff2d55] transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#050a0f] hover:shadow-lg hover:shadow-[#00d4ff]/50 transition-all duration-300"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                LOGIN
              </button>
            )}
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
            onClick={() => scrollToSection('home')}
            className="text-white/80 hover:text-[#00d4ff] transition-colors text-left"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Home
          </button>
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

          <div className="border-t border-[#00d4ff]/15 pt-6 mt-2">
            {isAuthenticated ? (
              <>
                <div className="mb-4 p-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20">
                  <p className="text-sm text-white/90 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {user?.name}
                  </p>
                  <p className="text-xs text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg flex items-center gap-2 bg-[#ff2d55]/10 border border-[#ff2d55]/30 text-[#ff2d55] hover:bg-[#ff2d55]/20 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#050a0f] hover:shadow-lg hover:shadow-[#00d4ff]/50 transition-all duration-300"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        ></div>
      )}
    </>
  );
}