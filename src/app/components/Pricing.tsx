import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const plansTarification = [
  {
    nom: "Starter",
    prix: "99",
    periode: "mois",
    description: "Parfait pour les petites écoles qui commencent",
    fonctionnalites: [
      "Jusqu'à 100 étudiants",
      "Rapports de base",
      "Support par email",
      "Suivi de présence",
      "Carnet de notes"
    ],
    gradient: "from-[#3B82F6] to-[#06B6D4]",
    couleurArrierePlan: "bg-[#0A0F1C]",
    populaire: false
  },
  {
    nom: "Professionnel",
    prix: "199",
    periode: "mois",
    description: "Pour les écoles en croissance avec plus de besoins",
    fonctionnalites: [
      "Jusqu'à 500 étudiants",
      "Rapports avancés",
      "Support prioritaire",
      "Portail parents",
      "Planification d'emploi du temps",
      "Accès API"
    ],
    gradient: "from-[#8B5CF6] to-[#D946EF]",
    couleurArrierePlan: "bg-[#0F1729]",
    populaire: true
  },
  {
    nom: "Entreprise",
    prix: "Sur mesure",
    periode: "",
    description: "Pour les grandes institutions avec des besoins personnalisés",
    fonctionnalites: [
      "Étudiants illimités",
      "Rapports personnalisés",
      "Support 24/7",
      "Gestionnaire de compte dédié",
      "Déploiement sur site",
      "Intégrations personnalisées"
    ],
    gradient: "from-[#EC4899] to-[#F43F5E]",
    couleurArrierePlan: "bg-[#1A1A2E]",
    populaire: false
  }
];

const Tarifs = () => {
  const conteneurRef = useRef(null);
  const [planSurvole, setPlanSurvole] = useState(null);

  // Affichage de la date/heure actuelle
  const dateHeureActuelle = "2025-06-19 10:49:05";
  const utilisateurActuel = "ismail-en-niou";

  const { scrollYProgress } = useScroll({
    target: conteneurRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacite = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={conteneurRef} 
      id="tarifs"
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Motif d'Arrière-plan */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* En-tête */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, opacity: opacite }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="px-4 py-2 rounded-full bg-white/5 text-sm font-medium text-white/70 backdrop-blur-sm">
              Plans Tarifaires
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choisissez Votre Plan
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Sélectionnez le plan parfait pour les besoins de votre école
          </motion.p>
        </motion.div>

        {/* Cartes de Tarification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plansTarification.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setPlanSurvole(index)}
              onHoverEnd={() => setPlanSurvole(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`h-full rounded-2xl ${plan.couleurArrierePlan} border border-white/10 overflow-hidden backdrop-blur-sm`}
              >
                {/* Bordure Dégradée */}
                <div className={`h-1 w-full bg-gradient-to-r ${plan.gradient}`} />

                {/* Contenu */}
                <div className="p-8">
                  {plan.populaire && (
                    <div className="absolute top-6 right-6">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-sm font-medium`}
                      >
                        Populaire
                      </motion.div>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-4">{plan.nom}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">
                      {plan.prix === "Sur mesure" ? plan.prix : `${plan.prix}€`}
                    </span>
                    {plan.periode && (
                      <span className="text-gray-400 ml-2">/{plan.periode}</span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-8">{plan.description}</p>

                  <div className="space-y-4 mb-8">
                    {plan.fonctionnalites.map((fonctionnalite, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center text-gray-300"
                      >
                        <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {fonctionnalite}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-medium transition-all
                      ${plan.populaire 
                        ? `bg-gradient-to-r ${plan.gradient} text-white` 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    Commencer →
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bannière de Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400">
            Besoin d'un plan personnalisé ? {" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 hover:text-blue-300 font-medium"
              href="#contact"
            >
              Contactez-nous →
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Tarifs;