import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';

const glassEffect = "backdrop-blur-xl bg-black/40 border border-white/10";
const neonGlow = "shadow-[0_0_30px_rgba(255,255,255,0.1)]";
const cardHover = "hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]";

const SocialIcon = ({ platform }) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return <FaGithub className="w-5 h-5" />;
    case 'linkedin':
      return <FaLinkedinIn className="w-5 h-5" />;
    default:
      return <HiOutlineExternalLink className="w-5 h-5" />;
  }
};

const TeamSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const teamMembers = [
    {
      name: "Ismail Enniou",
      role: "Project Manager",
      expertise: ["Agile Methodologies", "Team Leadership"],
      image: "https://camo.githubusercontent.com/f9d43ca384f9771181c8599b379b9f311dca505dafbc59b10f7f06d705618974/68747470733a2f2f63646e2e696e7472612e34322e66722f75736572732f33333738393838616132666538353261306235306361376566633937333233322f736d616c6c5f69656e2d6e696f752e6a7067",
      gradient: "from-blue-600 to-cyan-500",
      socialLinks: {
        github: "https://github.com/ismailenniou",
        linkedin: "https://linkedin.com/in/ismailenniou"
      }
    },
    {
      name: "Malika El Abderrahmani",
      role: "Frontend Developer",
      expertise: ["React.js", "Tailwind CSS", "UI/UX Design"],
      image: "https://camo.githubusercontent.com/8838001a0d4904e38bf3faacbe731be59461f400e249c6d301465493bb9665c7/68747470733a2f2f63646e2e696e7472612e34322e66722f75736572732f36663231626261646632636466306563313834353265643936646639383136612f736d616c6c5f6d656c2d616264652e6a7067",
      gradient: "from-violet-600 to-purple-500",
      socialLinks: {
        github: "#",
        linkedin: "#"
      }
    },
    {
      name: "Fatima El Asri",
      role: "Backend Developer",
      expertise: ["Java Spring Boot", "MySQL", "API Design"],
      image: "https://camo.githubusercontent.com/fb2434dce442afa152bf809870763c971d4181da06a82f5c6750ed1a06c678ef/68747470733a2f2f63646e2e696e7472612e34322e66722f75736572732f31373733393830363635656466663835393233363639373236303531643036612f736d616c6c5f66656c2d617372692e6a7067",
      gradient: "from-pink-600 to-rose-500",
      socialLinks: {
        github: "#",
        linkedin: "#"
      }
    }
  ];

  const openPositions = [
    {
      role: "UI/UX Designer",
      description: "Looking for a creative designer with experience in educational software",
      requirements: ["3+ years experience", "Figma expertise", "Educational sector knowledge"],
      gradient: "from-amber-600 to-yellow-500"
    },
    {
      role: "Full Stack Developer",
      description: "Seeking a developer experienced in both frontend and backend technologies",
      requirements: ["React & Node.js", "Database design", "API development"],
      gradient: "from-emerald-600 to-teal-500"
    }
  ];

  const GlassCard = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100
      }}
      className={`relative ${glassEffect} ${neonGlow} ${cardHover} rounded-2xl p-8 transition-all duration-300`}
    >
      {children}
    </motion.div>
  );

  return (
    <section 
    id='team'
      ref={containerRef} 
      className="relative min-h-screen bg-white py-24 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-6 pt-20">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, scale }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold"
          >
            Meet Our Team
          </motion.span>

          <motion.h2 
            className="text-5xl md:text-6xl font-bold mt-8 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Innovators
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Building the future of education technology
          </motion.p>
        </motion.div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                {/* Profile Image */}
                <motion.div 
                  className="relative w-32 h-32 mx-auto mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full opacity-10`} />
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                    loading="lazy"
                  />
                </motion.div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-gray-600 font-medium mb-4">{member.role}</div>

                  {/* Expertise */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.expertise.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {Object.entries(member.socialLinks).map(([platform, link]) => (
                      <motion.a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${member.gradient} text-white shadow-md`}
                      >
                        <SocialIcon platform={platform} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Open Positions</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Join our growing team and help shape the future of education
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <h4 className={`text-xl font-bold bg-gradient-to-r ${position.gradient} bg-clip-text text-transparent mb-4`}>
                  {position.role}
                </h4>
                <p className="text-gray-600 mb-6">{position.description}</p>
                
                <div className="space-y-3 mb-8">
                  {position.requirements.map((req) => (
                    <div key={req} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium bg-gradient-to-r ${position.gradient} text-white shadow-md`}
                >
                  Apply Now →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;