import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
                 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      ) : (
        <FiSun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      )}
    </motion.button>
  );
};