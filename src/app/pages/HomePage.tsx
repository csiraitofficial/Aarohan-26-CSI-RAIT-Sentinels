import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { HowItWorks } from '../components/HowItWorks';
import { Impact } from '../components/Impact';

export function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Impact />
    </>
  );
}