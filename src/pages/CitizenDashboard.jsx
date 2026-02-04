// Citizen Dashboard
// Protected page showing user's submissions and feedback options

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserFeedback } from '../firebase/firestore';

const CitizenDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      if (currentUser) {
        try {
          const feedback = await getUserFeedback(currentUser.uid);
          setSubmissions(feedback);
        } catch (error) {
          console.error('Error loading submissions:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadSubmissions();
  }, [currentUser]);

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
            <Link to="/" className="text-2xl font-bold text-gov-blue">
              GovTrustChain
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                {currentUser?.displayName || currentUser?.email}
              </span>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gov-dark mb-2">
            Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Citizen'}!
          </h1>
          <p className="text-gray-600">
            Manage your feedback and track project trust scores
          </p>
        </motion.div>

        {/* Submit Feedback Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link
            to="/submit-feedback"
            className="inline-block btn-primary text-lg"
          >
            Submit New Feedback
          </Link>
        </motion.div>

        {/* My Submissions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gov-dark mb-6">My Submissions</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gov-blue"></div>
            </div>
          ) : submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gov-dark">
                      {submission.projectName || 'Project Feedback'}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      submission.verified 
                        ? 'bg-green-100 text-trust-green' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {submission.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{submission.feedback}</p>
                  {submission.createdAt && (
                    <p className="text-xs text-gray-400">
                      Submitted: {new Date(submission.createdAt.seconds * 1000).toLocaleDateString()}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">You haven't submitted any feedback yet.</p>
              <Link to="/submit-feedback" className="btn-primary">
                Submit Your First Feedback
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CitizenDashboard;
