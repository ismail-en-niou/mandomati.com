import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const WhyDigital = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and transform effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const features = [
    {
      title: "Modern Infrastructure",
      description: "Built with the latest technologies including React, Next.js, and TypeScript",
      icon: "/stack.svg", // Replace with actual icon paths
      gradient: "from-[#FF6B6B] to-[#4ECDC4]"
    },
    {
      title: "Blazing Fast",
      description: "Optimized performance with server-side rendering and static generation",
      icon: "/performance.svg",
      gradient: "from-[#6C63FF] to-[#3B82F6]"
    },
    {
      title: "Type Safe",
      description: "End-to-end type safety with TypeScript and tRPC",
      icon: "/shield.svg",
      gradient: "from-[#F59E0B] to-[#EF4444]"
    }
  ];

  const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", 
    "tRPC", "NextAuth.js", "PostgreSQL", "Vercel"
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-24"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white/80 backdrop-blur-sm">
              Built for the Future
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The Next Generation
            <br />
            <span className="text-blue-500">School Management</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Empower your educational institution with modern technology and AI-driven insights
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
              Get Started →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold backdrop-blur-sm transition-colors"
            >
              View Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
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
                <img className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6`} src={feature.icon} />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Technologies Section */}
        <motion.div
          className="text-center mb-24"
          style={{ scale }}
        >
          <h2 className="text-2xl font-semibold mb-8">Built With Modern Stack</h2>
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

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "45ms", label: "Response Time" },
            { value: "500+", label: "Schools" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDigital;