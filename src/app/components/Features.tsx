import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { 
  GraduationCap, 
  ClipboardCheck, 
  BarChart3, 
  Clock, 
  Users, 
  Shield 
} from 'lucide-react';

const features = [
  {
    title: "Gestion des Étudiants",
    description: "Gérez facilement les dossiers des étudiants, les inscriptions et la progression à travers les niveaux.",
    Icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Suivi de Présence",
    description: "Système de présence automatisé avec notifications en temps réel aux parents.",
    Icon: ClipboardCheck,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Carnet de Notes",
    description: "Carnet de notes complet avec analyses et génération de bulletins scolaires.",
    Icon: BarChart3,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Planification d'Emploi du Temps",
    description: "Planification intelligente qui évite les conflits et optimise l'allocation des ressources.",
    Icon: Clock,
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    title: "Portail Parents",
    description: "Portail sécurisé pour que les parents surveillent les progrès de leurs enfants et les activités scolaires.",
    Icon: Users,
    gradient: "from-red-500 to-rose-500"
  },
  {
    title: "Sécurité des Données",
    description: "Chiffrement de niveau bancaire et sauvegardes régulières pour protéger les informations sensibles.",
    Icon: Shield,
    gradient: "from-indigo-500 to-violet-500"
  }
];

const FeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 0,
      scale: 0,
      rotateX: -1
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0
    }
  };

  const IconComponent = feature.Icon;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.17, 0.55, 0.55, 1]
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        translateZ: 20
      }}
      className="relative group perspective"
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-lg transform-gpu transition-all duration-300 group-hover:shadow-2xl">
        {/* Gradient Border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        
        {/* Icon with floating animation */}
        <motion.div
          animate={{
            y: [0, -1, 0],
            rotate: [0, 0, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6 transform-gpu"
        >
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
            <IconComponent className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>

        {/* Hover Effect Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-full mx-4"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(to right, rgb(59 130 246), rgb(6 182 212))`
          }}
        />
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section 
      ref={containerRef}
      id="features"
      className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, #000 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          scale: scale,
          opacity: opacity
        }}
      />

      <motion.div
        style={{ y }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-20 h-1 bg-black mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="inline-block">Fonctionnalités Puissantes pour les</span>{' '}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Écoles Modernes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tout ce dont vous avez besoin pour gérer efficacement les opérations de votre école dans une plateforme intégrée.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:shadow-xl transition-shadow"
          >
            Explorer Toutes les Fonctionnalités
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;