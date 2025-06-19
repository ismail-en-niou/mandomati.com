import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import TrueFocus from './ui/TrueFocus';
import CountUp from './ui/CountUp';

const PourquoiNumerique = () => {
  const conteneurRef = useRef(null);
  const [positionSouris, setPositionSouris] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: conteneurRef,
    offset: ["start start", "end start"]
  });

  // Effets de parallaxe et de transformation
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacite = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const echelle = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const fonctionnalites = [
    {
      titre: "Infrastructure Moderne",
      description: "Construit avec les dernières technologies incluant React, Next.js et TypeScript",
      icone: "/stack.svg", // Remplacer par les chemins d'icônes réels
      gradient: "from-[#FF6B6B] to-[#4ECDC4]"
    },
    {
      titre: "Ultra Rapide",
      description: "Performance optimisée avec rendu côté serveur et génération statique",
      icone: "/performance.svg",
      gradient: "from-[#6C63FF] to-[#3B82F6]"
    },
    {
      titre: "Sécurisé par Type",
      description: "Sécurité de type de bout en bout avec TypeScript et tRPC",
      icone: "/shield.svg",
      gradient: "from-[#F59E0B] to-[#EF4444]"
    }
  ];

  const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", 
    "tRPC", "NextAuth.js", "PostgreSQL", "Vercel"
  ];

  return (
    <section 
      id="pourquoidigital"
      ref={conteneurRef} 
      className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Dégradé d'Arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Motif de Grille */}
      <div className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      {/* Conteneur de Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Section Hero */}
        <motion.div 
          className="flex flex-col items-center text-center mb-24"
          style={{ y, opacity: opacite }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white/80 backdrop-blur-sm">
              Conçu pour l'Avenir
            </span>
          </motion.div>
          
          <TrueFocus 
            sentence="La Nouvelle Génération"
            manualMode={false}
            blurAmount={5}
            borderColor="red"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Renforcez votre institution éducative avec la technologie moderne et des analyses pilotées par l'IA
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
            >
              Commencer →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold backdrop-blur-sm transition-colors"
            >
              Voir la Démo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Grille des Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {fonctionnalites.map((fonctionnalite, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <img className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fonctionnalite.gradient} p-3 mb-6`} src={fonctionnalite.icone} />
                <h3 className="text-xl font-semibold mb-4">{fonctionnalite.titre}</h3>
                <p className="text-gray-400">{fonctionnalite.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Section Technologies */}
        <motion.div
          className="text-center mb-24"
          style={{ scale: echelle }}
        >
          <h2 className="text-2xl font-semibold mb-8">Construit avec une Stack Moderne</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { valeur: "99.9%", libelle: "Temps de Fonctionnement" },
            { valeur: "45ms", libelle: "Temps de Réponse" },
            { valeur: "500+", libelle: "Écoles" },
            { valeur: "24/7", libelle: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <CountUp
                from={0}
                to={stat.valeur}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
              />
              <div className="text-gray-400 text-sm">{stat.libelle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PourquoiNumerique;