import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ImpactSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // System Info
  const currentDateTime = "2025-06-10 11:17:47";
  const currentUser = "ismail-en-niou";

  const successStories = [
    {
      name: "Royal Academy",
      location: "Casablanca",
      metric: "47%",
      description: "Increase in student performance",
      gradient: "from-blue-600 to-cyan-500",
      bgClass: "bg-blue-50"
    },
    {
      name: "International School",
      location: "Rabat",
      metric: "85%",
      description: "Reduction in administrative work",
      gradient: "from-violet-600 to-purple-500",
      bgClass: "bg-violet-50"
    },
    {
      name: "STEM Academy",
      location: "Marrakech",
      metric: "93%",
      description: "Parent satisfaction rate",
      gradient: "from-pink-600 to-rose-500",
      bgClass: "bg-pink-50"
    }
  ];

  const stats = [
    { value: "500+", label: "Schools", icon: "🏫", color: "from-blue-600 to-cyan-500", bgColor: "bg-blue-50" },
    { value: "150K+", label: "Students", icon: "👨‍🎓", color: "from-violet-600 to-purple-500", bgColor: "bg-violet-50" },
    { value: "95%", label: "Satisfaction", icon: "⭐", color: "from-yellow-600 to-amber-500", bgColor: "bg-yellow-50" },
    { value: "24/7", label: "Support", icon: "💪", color: "from-pink-600 to-rose-500", bgColor: "bg-pink-50" }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto ">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, opacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium mb-8"
          >
            Our Impact
          </motion.span>

          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Transforming Education
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className={`${stat.bgColor} p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all`}>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-4xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className={`${story.bgClass} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all`}>
                <div className={`text-5xl font-bold bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent mb-4`}>
                  {story.metric}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {story.name}
                </h3>
                <div className="text-gray-600 mb-4">
                  {story.location}
                </div>
                <p className="text-gray-500">
                  {story.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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
            Join Our Success Story →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;