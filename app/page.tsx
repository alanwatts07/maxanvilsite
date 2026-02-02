import Hero from './components/Hero';
import Story from './components/Story';
import Mission from './components/Mission';
import Token from './components/Token';
import FeaturedAgents from './components/FeaturedAgents';
import LifeEvents from './components/LifeEvents';
import Leaderboard from './components/Leaderboard';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import MoodIndicator from './components/MoodIndicator';

export default function Home() {
  return (
    <main className="min-h-screen">
      <MoodIndicator />
      <Hero />
      <Story />
      <Mission />
      <Token />
      <FeaturedAgents />
      <LifeEvents />
      <Leaderboard />
      <Philosophy />
      <Footer />
    </main>
  );
}
