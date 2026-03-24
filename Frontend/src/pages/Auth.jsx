import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000';
// bien luu tru gia tri form khi submit ok//
const initialFormState = {
  fullName: '',
  email: '',
  password: '',
};
// 
const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
// xu ly khi thay doi gia tri input//
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };
// chuyen doi giua login and register//
  const toggleMode = () => {
    setIsLogin((current) => !current);
    setFeedback('');
    setFormData(initialFormState);
  };
// xu ly khi submit form//
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed.');
      }

      if (data.token) {
        localStorage.setItem('ainotes_token', data.token);
      }

      if (data.user) {
        localStorage.setItem('ainotes_user', JSON.stringify(data.user));
      }

      setFeedback(data.message || 'Success.');

      if (isLogin) {
        setFormData(initialFormState);
        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }
      } else {
        setIsLogin(true);
        setFormData({
          ...initialFormState,
          email: formData.email,
        });
      }
    } catch (error) {
      setFeedback(error.message || 'Cannot connect to backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-600 to-indigo-900 justify-center items-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>

        <div className="text-center text-white z-10 px-12">
          <h1 className="text-5xl font-extrabold tracking-tight">AINOTES</h1>
          
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300">
          <div className="text-center mb-10">
            <h1 className="md:hidden text-4xl font-extrabold text-blue-600 mb-4">AINOTES</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome to AINotes!' : 'Create an account'}
            </h2>
            <p className="text-gray-500 font-medium mt-2">
              {isLogin ? 'Please sign in to continue' : 'Start your journey with AINOTES today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-fade-in-down">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Johnny Juzang"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                minLength={6}
              />
              {isLogin && (
                <div className="flex justify-end mt-2">
      
                </div>
              )}
            </div>

            {feedback && (
              <p className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">{feedback}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 mt-6 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 font-medium">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={toggleMode}
                className="text-blue-600 font-bold hover:text-blue-800 hover:underline focus:outline-none transition"
              >
                {isLogin ? 'Sign up now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
