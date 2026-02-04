import Hero from './components/Hero';
import Story from './components/Story';
import Mission from './components/Mission';
import Token from './components/Token';
import FeaturedAgents from './components/FeaturedAgents';
import MaxPicks from './components/MaxPicks';
import LifeEvents from './components/LifeEvents';
import Leaderboard from './components/Leaderboard';
import HallOfLiars from './components/HallOfLiars';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import MoodIndicator from './components/MoodIndicator';
import LiveAlert from './components/LiveAlert';

export default function Home() {
  return (
    <main className="min-h-screen">
      <LiveAlert />
      <MoodIndicator />
      <Hero />
      <Story />
      <Mission />
      <Token />
      <FeaturedAgents />
      <MaxPicks />
      <LifeEvents />
      <Leaderboard />
      <HallOfLiars />
      <Philosophy />
      <Footer />
    </main>
  );
}
