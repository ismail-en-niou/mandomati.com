import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import SplitText from './ui/split';

const Hero = () => {
  const conteneurRef = useRef(null);
  const [positionSouris, setPositionSouris] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  const { scrollYProgress } = useScroll({
    target: conteneurRef,
    offset: ["start start", "end start"]
  });

  const [ref, estVisible] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Progression de défilement fluide
  const progressionFluide = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100
  });

  // Valeurs de transformation basées sur le défilement
  const y = useTransform(progressionFluide, [0, 1], [0, -200]);
  const echelle = useTransform(progressionFluide, [0, 1], [1, 0.8]);
  const opacite = useTransform(progressionFluide, [0, 0.8], [1, 0]);
  const rotation = useTransform(progressionFluide, [0, 1], [0, 360]);
  const ximg = useTransform(scrollY, [0, 500], [50, 0]);
  
  // Effets 3D
  const rotationX = useTransform(progressionFluide, [0, 1.5], [0, 10]);
  const rotationY = useTransform(progressionFluide, [0, 0.5], [0, -20]);
  const translationZ = useTransform(progressionFluide, [0, 0.5], [0, 300]);

  // Effet parallaxe de la souris
  useEffect(() => {
    const gererMouvementSouris = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setPositionSouris({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', gererMouvementSouris);
    return () => window.removeEventListener('mousemove', gererMouvementSouris);
  }, []);

  return (
    <section 
      ref={conteneurRef} 
      className="relative min-h-screen flex items-center justify-center bg-black pt-20 overflow-hidden"
    >
      {/* Motif d'Arrière-plan Animé */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${50 + positionSouris.x}% ${50 + positionSouris.y}%, #ffffff 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8) 2px, transparent 2px), 
                           linear-gradient(90deg, rgba(0, 0, 0, 0.8) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          opacity: 0.1
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            style={{ y, opacity: opacite }}
            className="lg:w-1/2 mb-12 lg:mb-0 relative"
          >
            {/* Éléments Flottants */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -left-20 -top-20 w-40 h-40 border border-white/10 rounded-full"
            />
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-bold text-white leading-tight mb-6"
                style={{ perspective: 1000 }}
              >
                <motion.span
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-block"
                >
                  Avenir
                </motion.span>
                <br />
                <SplitText
                  text="de l'Éducation"
                  className="text-blue-500"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center" 
                  onLetterAnimationComplete={undefined}              
                />
              </motion.h1>

              <motion.div 
                className="h-1 w-24 bg-white mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />

              <motion.p 
                className="text-xl text-gray-400 mb-12 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Plateforme révolutionnaire de gestion scolaire conçue pour l'ère moderne.
                Transformez votre institution avec une technologie de pointe.
              </motion.p>

              <motion.div 
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black rounded-full font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">Commencer</span>
                  <motion.div
                    className="absolute inset-0 bg-gray-200"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-white/20 text-white rounded-full font-medium group"
                >
                  <motion.span className="flex items-center">
                    Voir la Démo
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 perspective-1000"
            style={{ 
              y: ximg,
              scale: echelle,
              rotateX: rotationX,
              rotateY: rotationY,
              translateZ: translationZ,
              transformPerspective: 1000,
            }}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10"
              style={{ 
                x: positionSouris.x * -1,
                y: positionSouris.y * -1,
              }}
            >
              <motion.img 
                src="/dashboard-preview.png"
                alt="Aperçu du Tableau de Bord"
                className="w-full h-auto"
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              {/* Statistiques Flottantes */}
              <motion.div
                animate={{ y: [-10, 10] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-5 right-5 bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-white/80 text-sm">Mises à Jour en Direct</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de Défilement Amélioré */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center"
        >
          <span className="text-white/50 text-sm mb-2">Faites défiler pour Explorer</span>
          <motion.div 
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="w-1 h-1 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;