import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

// Registration API URL
const REGISTER_API_URL = 'https://iamms.mandomati.com/api/auth/register';

const MenuItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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
        onClick={handleClick}
        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors relative z-10 flex items-center cursor-pointer"
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

// Success/Error Message Component
const MessageAlert = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mb-4 p-4 rounded-lg border ${
        type === 'success' 
          ? 'bg-green-900/50 border-green-500 text-green-200' 
          : 'bg-red-900/50 border-red-500 text-red-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <p className="text-sm">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-4"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

// Sign Up Modal Component with better error handling
const SignInModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    address: '',
    birthDate: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const clearMessage = () => {
    setMessage('');
    setMessageType('');
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    // Auto-clear success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        clearMessage();
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearMessage();
    
    try {
      const registrationData = {
        username: formData.email, // Using email as username
        lastname: formData.lastname,
        firstname: formData.firstname,
        email: formData.email,
        role: {
          id: 1,
          name: "ROOT"
        },
        password: formData.password,
        status: true,
        address: formData.address || "123, Rue des Codeurs", // Default address if empty
        birthDate: formData.birthDate || "2000-05-15", // Default birth date if empty
        city: formData.city,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(REGISTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      // Handle different response types
      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (response.ok) {
        // Success
        showMessage('Registration successful! Welcome to Mandomati.', 'success');
        setTimeout(() => {
          onClose();
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            address: '',
            birthDate: '',
            city: ''
          });
          clearMessage();
        }, 2000);
      } else {
        // Error handling based on status code
        let errorMessage = '';
        
        switch (response.status) {
          case 409:
            errorMessage = typeof responseData === 'string' ? responseData : 'User already exists with this email address.';
            break;
          case 400:
            errorMessage = typeof responseData === 'string' ? responseData : 'Invalid registration data. Please check your information.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = typeof responseData === 'string' ? responseData : 'Registration failed. Please try again.';
        }
        
        showMessage(errorMessage, 'error');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Create Account</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>

          <MessageAlert 
            message={message} 
            type={messageType} 
            onClose={clearMessage}
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name *"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password *"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength="6"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="City *"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Address (Optional)"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Birth Date (Optional)</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Contact Form Component
const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // You can replace this with a contact API endpoint if needed
      console.log('Contact form submitted:', formData);
      alert('Message sent successfully!');
      onClose();
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Contact Us</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject *"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <textarea
                placeholder="Your message... *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none resize-none disabled:opacity-50"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Header = () => {
  const [currentDateTime] = useState("2025-06-19 14:48:02");
  const [currentUser] = useState("ismail-en-niou");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerBackgroundOpacity = useTransform(scrollY, 
    [0, 100], 
    [0.2, 0.8]
  );

  const menuItems = ['Fonctionnalités', 'pourquoiDigital', 'Tarification', 'Équipe', 'Contact'];

  const handleGetStarted = () => {
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignIn = () => {
    setIsSignInModalOpen(true);
  };

  const handleMenuItemClick = (item) => {
    if (item === 'Contact') {
      setIsContactFormOpen(true);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
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
              className="flex items-center space-x-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                onClick={handleSignIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Sign Up
              </motion.button>

              <motion.button
                onClick={handleGetStarted}
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
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="block py-2 text-gray-400 hover:text-white font-medium cursor-pointer"
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Modals */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
      />
      
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)}
      />
    </>
  );
};

export default Header;