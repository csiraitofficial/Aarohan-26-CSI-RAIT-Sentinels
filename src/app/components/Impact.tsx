import { Users, Lock, Cpu } from 'lucide-react';

export function Impact() {
  const impacts = [
    {
      icon: Users,
      title: 'Social Impact',
      description:
        'Empowers individuals to protect their digital identity and maintain control over their online presence. Prevents misuse of personal images for harassment, fraud, or defamation.',
    },
    {
      icon: Lock,
      title: 'Security Impact',
      description:
        'Provides proactive defense against deepfake technology at the source. Creates a new standard for image authentication and verification in the digital age.',
    },
    {
      icon: Cpu,
      title: 'Technological Impact',
      description:
        'Demonstrates practical application of adversarial machine learning for defense. Contributes to the growing field of AI safety and responsible technology development.',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-[#0d1f2d]">
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
            IMPACT & <span className="text-[#00ff88]">FEASIBILITY</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div
                className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#00d4ff]/10 border-2 border-[#00d4ff]"
                style={{
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
                }}
              >
                <impact.icon className="w-10 h-10 text-[#00d4ff]" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3
                className="text-2xl mb-4"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {impact.title}
              </h3>

              {/* Description */}
              <p
                className="text-white/70 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {impact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
