import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

const AppelAction = () => {
  const conteneurRef = useRef(null);
  const [positionSouris, setPositionSouris] = useState({ x: 0, y: 0 });
  const dateHeureActuelle = "2025-06-10 11:10:45";
  const utilisateurActuel = "ismail-en-niou";

  const { scrollYProgress } = useScroll({
    target: conteneurRef,
    offset: ["start end", "end start"]
  });

  // Animations basées sur le scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacite = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const echelle = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section 
      ref={conteneurRef}
      id="contact" 
      className="relative height-full bg-black overflow-hidden py-24"
      onMouseMove={(e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setPositionSouris({
          x: (clientX / innerWidth - 0.5) * 20,
          y: (clientY / innerHeight - 0.5) * 20
        });
      }}
    >
      {/* Arrière-plan Animé */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + positionSouris.x}% ${50 + positionSouris.y}%, #ffffff08 0%, transparent 50%)`
        }}
      />

      {/* Motif de Grille */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{ y, opacity: opacite, scale: echelle }}
        >
          {/* Badge Flottant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="text-white/70 text-sm font-medium">
                Offre Limitée dans le Temps
              </span>
            </motion.div>
          </motion.div>

          {/* Contenu Principal */}
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Transformez la Gestion de Votre École Aujourd'hui
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Rejoignez des dizaines d'écoles marocaines qui utilisent déjà notre plateforme pour rationaliser leurs opérations et améliorer la réussite des étudiants.
          </motion.p>

          {/* Boutons d'Appel à l'Action */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-black rounded-xl font-medium overflow-hidden"
            >
              <span className="relative z-10">Commencer l'Essai Gratuit</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-colors"
            >
              Contacter les Ventes →
            </motion.button>
          </motion.div>

          {/* Indicateurs de Confiance */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {[
              { valeur: "500+", libelle: "Écoles Actives" },
              { valeur: "99.9%", libelle: "Temps de Fonctionnement" },
              { valeur: "24/7", libelle: "Support" },
              { valeur: "4.9/5", libelle: "Note Utilisateur" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <motion.div 
                  className="text-2xl font-bold text-white mb-2"
                  animate={{
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.valeur}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.libelle}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppelAction;