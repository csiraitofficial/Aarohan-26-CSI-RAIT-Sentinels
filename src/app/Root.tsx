import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from './components/Navbar';

export function Root() {
  const location = useLocation();

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Intersection Observer for section animations (only on home page)
    if (location.pathname === '/') {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe all sections
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        section.classList.add('fade-in-section');
        observer.observe(section);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#050a0f] text-white overflow-x-hidden">
      <Navbar />
      <Outlet />

      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-in-section {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #050a0f;
        }

        ::-webkit-scrollbar-thumb {
          background: #00d4ff;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #00ff88;
        }
      `}</style>
    </div>
  );
}
