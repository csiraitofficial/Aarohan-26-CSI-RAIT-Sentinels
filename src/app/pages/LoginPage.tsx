import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050a0f] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff88]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-[#00d4ff]" strokeWidth={2} />
            <span
              className="text-3xl tracking-[0.15em] uppercase"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                textShadow: '0 0 20px #00d4ff',
                color: '#fff',
              }}
            >
              SENTINEL
            </span>
          </Link>
          <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
            Access Your AI Protection Dashboard
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className="backdrop-blur-xl bg-white/5 rounded-2xl border border-[#00d4ff]/20 p-8 shadow-2xl"
          style={{
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 212, 255, 0.05)',
          }}
        >
          <h2
            className="text-2xl mb-6 text-center tracking-wider"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 600,
              color: '#fff',
            }}
          >
            LOGIN
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#ff2d55]/10 border border-[#ff2d55]/30 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#ff2d55]" />
              <span className="text-[#ff2d55] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {error}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 text-white/80"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d4ff]/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-[#00d4ff]/30 rounded-lg px-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 text-white/80"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d4ff]/60" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-[#00d4ff]/30 rounded-lg px-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff]/20 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#050a0f] py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#00d4ff] hover:text-[#00ff88] transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-white/60 hover:text-[#00d4ff] transition-colors text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
