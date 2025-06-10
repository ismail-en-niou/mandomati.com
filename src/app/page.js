"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Header from './components/Headers';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhyDigital from './components/WhyDigital';
import ImpactSection from './components/ImpactSection';
import TeamSection from './components/TeamSection';

// Interactive particles background
const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-black/5 rounded-full"
        />
      ))}
    </div>
  );
};

// Smooth scroll navigation
const SmoothScrollNav = () => {
  const sections = ['hero', 'features', 'testimonials', 'pricing', 'cta'];
  const [activeSection, setActiveSection] = useState(0);

  const scrollTo = (index) => { // Removed TypeScript type annotation
    const element = document.getElementById(sections[index]);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(index);
  };

  return (
    <motion.div 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section, index) => (
        <motion.div
          key={section}
          onClick={() => scrollTo(index)}
          className="cursor-pointer group"
          whileHover={{ scale: 1.2 }}
        >
          <motion.div 
            className={`w-3 h-3 rounded-full ${
              activeSection === index ? 'bg-black' : 'bg-gray-300'
            } transition-colors duration-300`}
            initial={false}
            animate={{
              scale: activeSection === index ? 1.2 : 1,
              backgroundColor: activeSection === index ? "#000" : "#D1D5DB"
            }}
          />
          <motion.span
            className="absolute left-0 ml-6 text-sm font-medium text-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            initial={{ x: 20, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-gray-500 to-black origin-left z-50"
      style={{ scaleX }}
    />
  );
};

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = useState(true);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-white z-[100] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 border-4 border-black border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={containerRef}
        className="overflow-x-hidden relative "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <ParticlesBackground />
        <ScrollProgress />
        <SmoothScrollNav />
        
        <Header />
        
        <motion.main>
          {['hero', 'features', 'whyDigital', 'impact' ,'testimonials', 'pricing','TeamSection' , 'cta'].map((sectionId, index) => (
            <motion.section
              key={sectionId}
              id={sectionId}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [index * 0.2, (index + 1) * 0.2],
                    [0, 1]
                  )
                }}
              />

              {sectionId === 'hero' && <Hero />}
              {sectionId === 'features' && <Features />}
              {sectionId === 'whyDigital' && <WhyDigital />}
              {sectionId === 'pricing' && <Pricing />}
              {sectionId === 'impact' && <ImpactSection />}
              {sectionId === 'TeamSection' && <TeamSection />}
              {sectionId === 'cta' && <CTA />}
            </motion.section>
          ))}
        </motion.main>

        <Footer />

        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-black rounded-full p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-2 bg-black rounded-full mx-auto"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
          <span className="text-sm text-black/50">Scroll</span>
        </motion.div>
      </motion.div>
    </>
  );
}

export default App;