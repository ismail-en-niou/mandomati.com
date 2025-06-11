import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const MenuItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, ...SPRING_TRANSITION }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <motion.a
        href={`#${item.toLowerCase()}`}
        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors relative z-10 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {item}
      </motion.a>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-white/5 rounded-lg -z-10"
            layoutId={`menu-background-${index}`}
            transition={SPRING_TRANSITION}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Header = () => {
  const [currentDateTime] = useState("2025-06-10 11:39:03");
  const [currentUser] = useState("ismail-en-niou");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerBackgroundOpacity = useTransform(scrollY, 
    [0, 100], 
    [0.2, 0.8]
  );

  const menuItems = ['Features', 'whyDigital', 'Pricing','Team' , 'Contact'];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={SPRING_TRANSITION}
      className="fixed w-full z-50"
    >

      {/* Main Header */}
      <motion.div 
        className="absolute inset-0 bg-black"
        style={{ opacity: headerBackgroundOpacity }}
      />

      <div className="container mx-auto px-6">
        <div className="relative z-10 flex items-center justify-between h-20">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="relative w-10 h-10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.9 }}
            >
              <motion.div 
                className="absolute inset-0 bg-white rounded-xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 100,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg">
                M
              </span>
            </motion.div>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">
                Mandomati
              </span>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="px-2 py-1 bg-white/10 text-white text-xs font-medium rounded-full"
              >
                BETA
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <MenuItem key={item} item={item} index={index} />
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 bg-white text-black text-sm font-medium rounded-full overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-white/90"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="space-y-2">
                <motion.span
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                  className="block w-6 h-0.5 bg-white/70"
                />
                <motion.span
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="block w-6 h-0.5 bg-white/70"
                />
                <motion.span
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                  className="block w-6 h-0.5 bg-white/70"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="block py-2 text-gray-400 hover:text-white font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;