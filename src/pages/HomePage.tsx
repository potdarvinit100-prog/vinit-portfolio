import Hero from '../sections/Hero';
import TrustStats from '../sections/TrustStats';
import Services from '../sections/Services';
import Showcase from '../sections/Showcase';
import LiveSites from '../sections/LiveSites';
import MyWork from '../sections/MyWork';
import Process from '../sections/Process';
import Pricing from '../sections/Pricing';
import FAQ from '../sections/FAQ';
import InquirySection from '../sections/InquirySection';
import Contact from '../sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStats />
      <Services />
      <Showcase />
      <LiveSites />
      <MyWork />
      <Process />
      <Pricing />
      <FAQ />
      <InquirySection />
      <Contact />
    </main>
  );
}
