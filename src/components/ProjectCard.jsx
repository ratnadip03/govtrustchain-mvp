// Project Card Component
// Displays project information with animated trust score

import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

const ProjectCard = ({ project, index }) => {
  const isOnTime = project.status === 'On-time';
  const trustScoreColor = project.trustScore >= 70 
    ? 'text-trust-green' 
    : project.trustScore >= 50 
    ? 'text-yellow-500' 
    : 'text-trust-red';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className="card cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gov-dark mb-1">
            {project.name}
          </h3>
          <p className="text-gray-600 text-sm">{project.department}</p>
        </div>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOnTime 
              ? 'bg-green-100 text-trust-green' 
              : 'bg-red-100 text-trust-red'
          }`}
        >
          {project.status}
        </motion.span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Trust Score</span>
          <span className={`text-2xl font-bold ${trustScoreColor}`}>
            <AnimatedNumber value={project.trustScore} decimals={0} />
            <span className="text-lg">/100</span>
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.trustScore}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
            className={`h-full rounded-full ${
              project.trustScore >= 70 
                ? 'bg-trust-green' 
                : project.trustScore >= 50 
                ? 'bg-yellow-500' 
                : 'bg-trust-red'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
