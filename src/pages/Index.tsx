import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import WhyChooseUs from '@/components/WhyChooseUs';
import BusinessGrowth from '@/components/BusinessGrowth';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
        <WhyChooseUs />
        <BusinessGrowth />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;