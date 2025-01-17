import { motion, AnimatePresence } from 'framer-motion';
import { useStopwatch } from '../hooks/useStopwatch';
import { FiPlay, FiPause, FiRefreshCw, FiFlag, FiX } from 'react-icons/fi';

export const Stopwatch = ({ onRemove, id }) => {
  const {
    time,
    isRunning,
    laps,
    formatTime,
    start,
    stop,
    reset,
    lap,
    clearLaps
  } = useStopwatch();

  const formattedTime = formatTime(time);

  const fastestLap = laps.length > 1 
    ? laps.reduce((min, lap) => lap.difference < min.difference ? lap : min, laps[0])
    : null;
    
  const slowestLap = laps.length > 1
    ? laps.reduce((max, lap) => lap.difference > max.difference ? lap : max, laps[0])
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700"
    >
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(id)}
          className="absolute -right-3 -top-3 p-2 rounded-full bg-red-100 dark:bg-red-900 
                   hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <FiX className="w-4 h-4 text-red-600 dark:text-red-300" />
        </motion.button>

        <div className="text-center mb-8">
          <div className="text-5xl font-mono font-bold mb-2 dark:text-white tracking-wider">
            {formattedTime.hours}:{formattedTime.minutes}:{formattedTime.seconds}
            <span className="text-3xl text-gray-500 dark:text-gray-400">.{formattedTime.milliseconds}</span>
          </div>
          
          {isRunning && (
            <div className="animate-pulse-slow inline-block w-3 h-3 bg-green-500 rounded-full shadow-lg" />
          )}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRunning ? stop : start}
            className={`p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
              isRunning 
                ? 'bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800' 
                : 'bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800'
            }`}
          >
            {isRunning ? (
              <FiPause className="w-6 h-6 text-red-600 dark:text-red-300" />
            ) : (
              <FiPlay className="w-6 h-6 text-green-600 dark:text-green-300" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="p-4 rounded-full shadow-lg hover:shadow-xl bg-gray-100 dark:bg-gray-700 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
          >
            <FiRefreshCw className="w-6 h-6 dark:text-gray-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: isRunning ? 1.05 : 1 }}
            whileTap={{ scale: isRunning ? 0.95 : 1 }}
            onClick={lap}
            disabled={!isRunning}
            className={`p-4 rounded-full shadow-lg transition-all duration-200 ${
              isRunning
                ? 'bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 hover:shadow-xl'
                : 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'
            }`}
          >
            <FiFlag className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </motion.button>
        </div>

        {laps.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold dark:text-white text-lg">Laps</h3>
              <button
                onClick={clearLaps}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 
                         dark:hover:text-red-300 transition-colors font-medium hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto pr-2">
              <AnimatePresence>
                {laps.map((lap) => {
                  const isFastest = fastestLap && lap.number === fastestLap.number;
                  const isSlowest = slowestLap && lap.number === slowestLap.number;
                  const lapTime = formatTime(lap.difference);

                  return (
                    <motion.div
                      key={lap.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`flex justify-between p-3 rounded-lg mb-2 shadow-sm ${
                        isFastest ? 'bg-green-100 dark:bg-green-900 border-l-4 border-green-500' :
                        isSlowest ? 'bg-red-100 dark:bg-red-900 border-l-4 border-red-500' :
                        'bg-white dark:bg-gray-800'
                      }`}
                    >
                      <span className="dark:text-white font-medium">Lap {lap.number}</span>
                      <span className="font-mono dark:text-white">
                        {lapTime.minutes}:{lapTime.seconds}.{lapTime.milliseconds}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};