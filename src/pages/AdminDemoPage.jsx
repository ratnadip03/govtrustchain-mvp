// Admin Demo Page
// Hidden route for demonstrating trust score manipulation

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProjects, markMilestoneComplete, markProjectDelayed } from '../firebase/firestore';
import ProjectCard from '../components/ProjectCard';

const AdminDemoPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleMilestoneComplete = async (projectId) => {
    setUpdating(true);
    try {
      await markMilestoneComplete(projectId);
      // Reload projects to show updated scores
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleProjectDelayed = async (projectId) => {
    setUpdating(true);
    try {
      await markProjectDelayed(projectId);
      // Reload projects to show updated scores
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-gov-blue">
              GovTrustChain - Admin Demo
            </span>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                Citizen Dashboard
              </button>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gov-dark mb-2">
            Admin Control Panel
          </h1>
          <p className="text-gray-600">
            Demo mode: Manipulate trust scores to see real-time updates
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is a demo page. In production, this would require admin authentication.
              Trust score changes are simulated. Blockchain integration – demo mode.
            </p>
          </div>
        </div>

        {/* Projects with Controls */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gov-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <ProjectCard project={project} index={0} />
                
                {/* Control Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMilestoneComplete(project.id)}
                    disabled={updating}
                    className="w-full bg-trust-green hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    ✓ Mark Milestone Complete (+5)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleProjectDelayed(project.id)}
                    disabled={updating}
                    className="w-full bg-trust-red hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    ⚠ Mark Project Delayed (-10)
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Trust Score Logic Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card bg-blue-50 border-blue-200"
        >
          <h2 className="text-xl font-bold text-gov-dark mb-4">
            Trust Score Logic
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Initial Score:</strong> 80</li>
            <li>• <strong>Milestone Complete:</strong> +5 points</li>
            <li>• <strong>Project Delayed:</strong> -10 points</li>
            <li>• <strong>Verified Feedback:</strong> +5 points</li>
            <li>• <strong>Score Range:</strong> 0-100 (automatically clamped)</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDemoPage;
