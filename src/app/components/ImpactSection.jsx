import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  School, 
  GraduationCap, 
  Star, 
  Headphones, 
  TrendingUp,
  MapPin
} from 'lucide-react';

const SectionImpact = () => {
  const conteneurRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: conteneurRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacite = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Informations Système
  const dateHeureActuelle = "2025-06-19 10:47:47";
  const utilisateurActuel = "ismail-en-niou";

  const histoiresSucces = [
    {
      nom: "Académie Royale",
      localisation: "Casablanca",
      metrique: "47%",
      description: "Augmentation des performances étudiantes",
      gradient: "from-blue-600 to-cyan-500",
      classBg: "bg-blue-50",
      couleurIcone: "text-blue-600",
      icone: TrendingUp
    },
    {
      nom: "École Internationale",
      localisation: "Rabat",
      metrique: "85%",
      description: "Réduction du travail administratif",
      gradient: "from-violet-600 to-purple-500",
      classBg: "bg-violet-50",
      couleurIcone: "text-violet-600",
      icone: TrendingUp
    },
    {
      nom: "Académie STEM",
      localisation: "Marrakech",
      metrique: "93%",
      description: "Taux de satisfaction des parents",
      gradient: "from-pink-600 to-rose-500",
      classBg: "bg-pink-50",
      couleurIcone: "text-pink-600",
      icone: Star
    }
  ];

  const statistiques = [
    { 
      valeur: "500+", 
      libelle: "Écoles", 
      icone: School, 
      couleur: "from-blue-600 to-cyan-500", 
      couleurBg: "bg-blue-50",
      couleurIcone: "text-blue-600"
    },
    { 
      valeur: "150K+", 
      libelle: "Étudiants", 
      icone: GraduationCap, 
      couleur: "from-violet-600 to-purple-500", 
      couleurBg: "bg-violet-50",
      couleurIcone: "text-violet-600"
    },
    { 
      valeur: "95%", 
      libelle: "Satisfaction", 
      icone: Star, 
      couleur: "from-yellow-600 to-amber-500", 
      couleurBg: "bg-yellow-50",
      couleurIcone: "text-yellow-600"
    },
    { 
      valeur: "24/7", 
      libelle: "Support", 
      icone: Headphones, 
      couleur: "from-pink-600 to-rose-500", 
      couleurBg: "bg-pink-50",
      couleurIcone: "text-pink-600"
    }
  ];

  return (
    <section 
      ref={conteneurRef} 
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden"
    >
      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-6">
        {/* En-tête */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, opacity: opacite }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium mb-8"
          >
            Notre Impact
          </motion.span>

          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Transformer l'Éducation
          </motion.h2>
        </motion.div>

        {/* Grille des Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {statistiques.map((stat, index) => {
            const IconeComponent = stat.icone;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className={`${stat.couleurBg} p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all`}>
                  <motion.div
                    animate={{
                      scale: [1, 1, 1],
                      rotate: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                      <IconeComponent 
                        size={32} 
                        className={`${stat.couleurIcone}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.couleur} bg-clip-text text-transparent mb-2`}>
                    {stat.valeur}
                  </div>
                  <div className="text-gray-600">{stat.libelle}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Histoires de Succès */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {histoiresSucces.map((histoire, index) => {
            const IconeComponent = histoire.icone;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className={`${histoire.classBg} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all`}>
                  {/* Icône et métrique */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-5xl font-bold bg-gradient-to-r ${histoire.gradient} bg-clip-text text-transparent`}>
                      {histoire.metrique}
                    </div>
                    <div className="p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                      <IconeComponent 
                        size={24} 
                        className={`${histoire.couleurIcone}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {histoire.nom}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    {histoire.localisation}
                  </div>
                  
                  <p className="text-gray-500">
                    {histoire.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Appel à l'Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Rejoignez Notre Histoire de Succès →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionImpact;