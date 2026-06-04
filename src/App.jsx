import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Programs from "./components/Programs";
import Trainers from "./components/Trainers";
import Transformation from "./components/Transformation";
import Membership from "./components/Membership";
import BMICalculator from "./components/BMICalculator";
import CostEstimator from "./components/CostEstimator";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-charcoal-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <Trainers />
      <Transformation />
      <Membership />
      <BMICalculator />
      <CostEstimator />
      <Testimonials />
      <Gallery />
      <section id="faq">
        <FAQ />
      </section>
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
