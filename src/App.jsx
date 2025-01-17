import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stopwatch } from './components/Stopwatch';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { FiPlusCircle } from 'react-icons/fi';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [stopwatches, setStopwatches] = useState([{ id: 1 }]);
  const [nextId, setNextId] = useState(2);

  const addStopwatch = () => {
    if (stopwatches.length < 5) {
      setStopwatches(prev => [...prev, { id: nextId }]);
      setNextId(prev => prev + 1);
    }
  };

  const removeStopwatch = (id) => {
    setStopwatches(prev => prev.filter(sw => sw.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={addStopwatch}
            disabled={stopwatches.length >= 5}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg 
                     ${stopwatches.length >= 5 
                       ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-75' 
                       : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl'
                     } text-white font-semibold transition-all duration-200`}
          >
            <FiPlusCircle className="w-5 h-5" />
            New Stopwatch
          </motion.button>
          {stopwatches.length >= 5 && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-2 font-medium">
              Maximum limit of 5 stopwatches reached
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {stopwatches.map(({ id }) => (
              <Stopwatch key={id} id={id} onRemove={removeStopwatch} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}