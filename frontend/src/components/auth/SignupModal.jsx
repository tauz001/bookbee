import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin, onSignupSuccess, onSignupError }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    userType: 'commuter'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signup(formData);
      onClose();
      setFormData({ name: '', mobile: '', password: '', userType: 'commuter' });
      // Call success callback if provided
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      // Call error callback if provided, otherwise show local error
      if (onSignupError) {
        onSignupError(err.message || 'Signup failed');
      } else {
        setError(err.message || 'Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-amber-100 relative">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg text-gray-500 hover:text-amber-600 text-2xl flex items-center justify-center"
          style={{ width: '40px', height: '40px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-4 text-amber-600 text-center">Sign Up</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Enter your full name"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input 
              type="tel" 
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Enter your mobile number"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
            <select 
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="commuter">Commuter (Book Rides)</option>
              <option value="host">Host (Offer Rides)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
              placeholder="Create a password (min 6 characters)"
              required 
              minLength="6"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button className="text-amber-600 hover:underline font-semibold" onClick={onSwitchToLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;