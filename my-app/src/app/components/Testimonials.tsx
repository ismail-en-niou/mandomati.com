import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const LiveStatus = () => {
  const containerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const stats = [
    {
      label: "Active Users",
      value: "2,547",
      icon: "👥",
      change: "+12%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Schools Online",
      value: "150+",
      icon: "🏫",
      change: "+5%",
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Daily Operations",
      value: "45K+",
      icon: "⚡",
      change: "+25%",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          y
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * 500, Math.random() * 500],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Live Status Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold mb-4">System Status</h2>
          <motion.div
            className="text-gray-400 text-lg"
            animate={{
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Live Updates • {currentTime.toLocaleTimeString()}
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              />
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <motion.span
                  className="text-green-400 text-sm font-medium"
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {stat.change}
                </motion.span>
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Current User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 rounded-2xl p-8 max-w-3xl mx-auto backdrop-blur-sm"
        >
          <div className="flex items-center space-x-4 mb-6">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              👤
            </motion.div>
            <div>
              <div className="text-xl font-bold">@ismail-en-niou</div>
              <div className="text-gray-400">Active Session</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 mb-1">Session Start</div>
              <div>2025-06-10 10:32:25 UTC</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 mb-1">Last Activity</div>
              <motion.div
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Just now
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span>All Systems Operational</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LiveStatus;