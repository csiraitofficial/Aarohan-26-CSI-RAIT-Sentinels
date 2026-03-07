import { useEffect, useRef, useState } from "react";

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>(
    [],
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal steps one by one
            [0, 1, 2, 3, 4].forEach((index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: 1,
      title: "Upload",
      description:
        "Upload any photo you want to protect from being used by AI.",
    },
    {
      number: 2,
      title: "Preprocess",
      description:
        "Our system runs a quick check to prep the pixels for security.",
    },
    {
      number: 3,
      title: "Adversarial ",
      description:
        'We bake in a digital "noise" that makes your face unreadable to tech.',
    },
    {
      number: 4,
      title: "Quality Check",
      description:
        "We make sure the image looks perfect to you but broken to bots.",
    },
    {
      number: 5,
      title: "Protected",
      description:
        "Grab your protected file and share your life on social media again.",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-[#0d1f2d]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl tracking-[0.15em] uppercase mb-6"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            TECHNICAL{" "}
            <span className="text-[#00d4ff]">APPROACH</span>
          </h2>
          <p
            className="text-lg text-white/70 max-w-[700px] mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Advanced adversarial machine learning pipeline
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-[#00d4ff]/20">
              <div
                className="h-full bg-[#00d4ff] transition-all duration-1000 flowing-line"
                style={{
                  width:
                    visibleSteps.length > 0 ? "100%" : "0%",
                }}
              ></div>
            </div>

            <div className="flex justify-between items-start relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-600 ${
                    visibleSteps.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ width: "180px" }}
                >
                  {/* Node */}
                  <div
                    className="w-24 h-24 rounded-full border-4 border-[#00d4ff] bg-[#050a0f] flex items-center justify-center mb-6"
                    style={{
                      boxShadow:
                        "0 0 30px rgba(0, 212, 255, 0.4)",
                    }}
                  >
                    <span
                      className="text-3xl text-[#00d4ff]"
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontWeight: 900,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl mb-3 text-center"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-white/70 text-center leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex gap-6 transition-all duration-600 ${
                visibleSteps.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              {/* Node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-full border-4 border-[#00d4ff] bg-[#050a0f] flex items-center justify-center"
                  style={{
                    boxShadow:
                      "0 0 20px rgba(0, 212, 255, 0.4)",
                  }}
                >
                  <span
                    className="text-2xl text-[#00d4ff]"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: 900,
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[60px] bg-[#00d4ff]/20 mt-4">
                    <div
                      className="w-full bg-[#00d4ff] transition-all duration-1000"
                      style={{
                        height: visibleSteps.includes(index + 1)
                          ? "100%"
                          : "0%",
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3
                  className="text-xl mb-2"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-white/70 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 0;
          }
        }

        .flowing-line {
          background: repeating-linear-gradient(
            90deg,
            #00d4ff 0px,
            #00d4ff 20px,
            transparent 20px,
            transparent 40px
          );
          animation: flow 1s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .flowing-line {
            animation: none;
            background: #00d4ff;
          }
        }
      `}</style>
    </section>
  );
}