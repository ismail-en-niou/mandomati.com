import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

const effetVerre = "backdrop-blur-xl bg-black/40 border border-white/10";
const lueurNeon = "shadow-[0_0_30px_rgba(255,255,255,0.1)]";
const survolCarte = "hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]";

const IconeReseauSocial = ({ plateforme }) => {
  switch (plateforme.toLowerCase()) {
    case 'github':
      return <FaGithub className="w-5 h-5" />;
    case 'linkedin':
      return <FaLinkedinIn className="w-5 h-5" />;
    default:
      return <HiOutlineExternalLink className="w-5 h-5" />;
  }
};

const SectionEquipe = () => {
  // Informations système
  const dateHeureActuelle = "2025-06-19 10:51:52";
  const utilisateurActuel = "ismail-en-niou";

  const conteneurRef = useRef(null);
  const [indexActif, setIndexActif] = useState(null);
  const [positionSurvol, setPositionSurvol] = useState(null);

  const { scrollYProgress } = useScroll({
    target: conteneurRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const echelle = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

const membresEquipe = [
  {
    nom: "Malika El Abderrahmani",
    role: "Développeuse Backend",
    expertise: ["React.js", "Tailwind CSS", "Conception UI/UX"],
    image: "https://camo.githubusercontent.com/8838001a0d4904e38bf3faacbe731be59461f400e249c6d301465493bb9665c7/68747470733a2f2f63646e2e696e7472612e34322e66722f75736572732f36663231626261646632636466306563313834353265643936646639383136612f736d616c6c5f6d656c2d616264652e6a7067",
    gradient: "from-violet-600 to-purple-500",
    liensReseauxSociaux: {
      github: "https://github.com/Malikaelabderrahmani",
      linkedin: "https://www.linkedin.com/in/malika-el-abderrahmani/"  // Fixed: Changed to Malika's actual LinkedIn
    }
  },
  {
    nom: "Ismail Enniou",
    role: "Chef de Projet & DevOps Engineer",  // Fixed: Corrected role title
    expertise: ["Méthodologies Agiles", "Leadership d'Équipe", "Docker", "Fullstack Dev"],  // Fixed: Added missing comma
    image: "https://camo.githubusercontent.com/f9d43ca384f9771181c8599b379b9f311dca505dafbc59b10f7f06d705618974/68747470733a2f2f63646e2e696e7472612e34322e66722f75736572732f33333738393838616132666538353261306235306361376566633937333233322f736d616c6c5f69656e2d6e696f752e6a7067",
    gradient: "from-blue-600 to-cyan-500",
    liensReseauxSociaux: {
      github: "https://github.com/ismail-en-niou",
      linkedin: "https://www.linkedin.com/in/ismail-en-niou-898566275/"
    }
  },
  
  {
    nom: "Fatima El Asri",
    role: "Développeuse Backend",
    expertise: ["Java Spring Boot", "MySQL", "Conception d'API"],
    image: "https://camo.githubusercontent.com/fb2434dce442afa152bf809870763c971d4181da06a82f5c6750ed1a06c678ef/68747470733a2f2f63646e2e696e7472612e34322e66722f75736572732f31373733393830363635656466663835393233363639373236303531643036612f736d616c6c5f66656c2d617372692e6a7067",
    gradient: "from-pink-600 to-rose-500",
    liensReseauxSociaux: {
      github: "https://github.com/fatimaelasri01",
      linkedin: "https://www.linkedin.com/in/fatima-el-asri/"  // Fixed: Changed to Fatima's actual LinkedIn
    }
  }
];

  const postesOuverts = [
    {
      role: "Designer UI/UX",
      description: "Nous recherchons un designer créatif avec de l'expérience dans les logiciels éducatifs",
      exigences: ["3+ années d'expérience", "Expertise Figma", "Connaissance du secteur éducatif"],
      gradient: "from-amber-600 to-yellow-500"
    },
    {
      role: "Développeur Full Stack",
      description: "Nous recherchons un développeur expérimenté en technologies frontend et backend",
      exigences: ["React & Node.js", "Conception de base de données", "Développement d'API"],
      gradient: "from-emerald-600 to-teal-500"
    }
  ];

  const CarteVerre = ({ children, delai = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: delai,
        type: "spring",
        stiffness: 100
      }}
      className={`relative ${effetVerre} ${lueurNeon} ${survolCarte} rounded-2xl p-8 transition-all duration-300`}
    >
      {children}
    </motion.div>
  );

  return (
    <section 
      id='equipe'
      ref={conteneurRef} 
      className="relative min-h-screen bg-white py-24 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-6 pt-20">
        {/* En-tête de Section */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, scale: echelle }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold"
          >
            Rencontrez Notre Équipe
          </motion.span>

          <motion.h2 
            className="text-5xl md:text-6xl font-bold mt-8 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Les Innovateurs
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Construire l'avenir de la technologie éducative
          </motion.p>
        </motion.div>
        
        {/* Grille de l'Équipe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {membresEquipe.map((membre, index) => (
            <motion.div
              key={membre.nom}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                {/* Image de Profil */}
                <motion.div 
                  className="relative w-32 h-32 mx-auto mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${membre.gradient} rounded-full opacity-10`} />
                  <img 
                    src={membre.image}
                    alt={membre.nom}
                    className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                    loading="lazy"
                  />
                </motion.div>

                {/* Informations du Membre */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {membre.nom}
                  </h3>
                  <div className="text-gray-600 font-medium mb-4">{membre.role}</div>

                  {/* Expertise */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {membre.expertise.map((competence) => (
                      <motion.span
                        key={competence}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600"
                      >
                        {competence}
                      </motion.span>
                    ))}
                  </div>

                  {/* Liens Réseaux Sociaux */}
                  <div className="flex justify-center space-x-3">
                    {Object.entries(membre.liensReseauxSociaux).map(([plateforme, lien]) => (
                      <motion.a
                        key={plateforme}
                        href={lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${membre.gradient} text-white shadow-md`}
                      >
                        <IconeReseauSocial plateforme={plateforme} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Postes Ouverts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Postes Ouverts</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Rejoignez notre équipe en croissance et aidez à façonner l'avenir de l'éducation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {postesOuverts.map((poste, index) => (
              <motion.div
                key={poste.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <h4 className={`text-xl font-bold bg-gradient-to-r ${poste.gradient} bg-clip-text text-transparent mb-4`}>
                  {poste.role}
                </h4>
                <p className="text-gray-600 mb-6">{poste.description}</p>
                
                <div className="space-y-3 mb-8">
                  {poste.exigences.map((exigence) => (
                    <div key={exigence} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {exigence}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium bg-gradient-to-r ${poste.gradient} text-white shadow-md`}
                >
                  Postuler Maintenant →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionEquipe;