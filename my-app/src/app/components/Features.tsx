import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const features = [
  {
    title: "Student Management",
    description: "Easily manage student records, enrollment, and progression through grades.",
    icon: "👨‍🎓",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Attendance Tracking",
    description: "Automated attendance system with real-time notifications to parents.",
    icon: "📝",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Gradebook",
    description: "Comprehensive gradebook with analytics and report card generation.",
    icon: "📊",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Timetable Scheduling",
    description: "Smart scheduling that avoids conflicts and optimizes resource allocation.",
    icon: "⏰",
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    title: "Parent Portal",
    description: "Secure portal for parents to monitor their children's progress and school activities.",
    icon: "👪",
    gradient: "from-red-500 to-rose-500"
  },
  {
    title: "Data Security",
    description: "Bank-level encryption and regular backups to protect sensitive information.",
    icon: "🔒",
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
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0
    }
  };

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
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-5xl mb-6 transform-gpu"
        >
          {feature.icon}
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
            background: `linear-gradient(to right, ${feature.gradient.replace('from-', '').replace('to-', '')})`
          }}
        />
      </div>
    </motion.div>
  );
};

const Features = () => {
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
      className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, #000 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          scale,
          opacity
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
            <span className="inline-block">Powerful Features for</span>{' '}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Modern Schools
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to efficiently manage your school operations in one integrated platform.
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
            Explore All Features
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;