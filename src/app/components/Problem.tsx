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
              Every photo you share online is a weapon waiting to be used against
              you. Deepfake technology has evolved from a curiosity to an
              existential threat.
            </p>
            <p
              className="text-lg text-white/90 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Your face can be stolen. Your voice can be cloned. Your identity
              can be weaponized — all from a single social media post.
            </p>
            <p
              className="text-lg text-white/90 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Traditional watermarks are easily removed. Metadata can be stripped.
              By the time you discover the fake, the damage is already done.
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
      </div>
    </section>
  );
}
