import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const pricingPlans = [
  {
    name: "Starter",
    price: "99",
    period: "month",
    description: "Perfect for small schools getting started",
    features: [
      "Up to 100 students",
      "Basic reporting",
      "Email support",
      "Attendance tracking",
      "Gradebook"
    ],
    gradient: "from-[#3B82F6] to-[#06B6D4]",
    backgroundColor: "bg-[#0A0F1C]",
    featured: false
  },
  {
    name: "Professional",
    price: "199",
    period: "month",
    description: "For growing schools with more needs",
    features: [
      "Up to 500 students",
      "Advanced reporting",
      "Priority support",
      "Parent portal",
      "Timetable scheduling",
      "API access"
    ],
    gradient: "from-[#8B5CF6] to-[#D946EF]",
    backgroundColor: "bg-[#0F1729]",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large institutions with custom needs",
    features: [
      "Unlimited students",
      "Custom reporting",
      "24/7 support",
      "Dedicated account manager",
      "On-premise deployment",
      "Custom integrations"
    ],
    gradient: "from-[#EC4899] to-[#F43F5E]",
    backgroundColor: "bg-[#1A1A2E]",
    featured: false
  }
];

const Pricing = () => {
  const containerRef = useRef(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // Current date/time display
  const currentDateTime = "2025-06-10 11:15:22";
  const currentUser = "ismail-en-niou";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="px-4 py-2 rounded-full bg-white/5 text-sm font-medium text-white/70 backdrop-blur-sm">
              Pricing Plans
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-300 to-blue"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your Plan
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Select the perfect plan for your school's needs
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`h-full rounded-2xl ${plan.backgroundColor} border border-white/10 overflow-hidden backdrop-blur-sm`}
              >
                {/* Gradient Border */}
                <div className={`h-1 w-full bg-gradient-to-r ${plan.gradient}`} />

                {/* Content */}
                <div className="p-8">
                  {plan.featured && (
                    <div className="absolute top-6 right-6">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-sm font-medium`}
                      >
                        Popular
                      </motion.div>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-8">{plan.description}</p>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
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
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-medium transition-all
                      ${plan.featured 
                        ? `bg-gradient-to-r ${plan.gradient} text-white` 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    Get Started →
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400">
            Need a custom plan? {" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 hover:text-blue-300 font-medium"
              href="#contact"
            >
              Contact us →
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;