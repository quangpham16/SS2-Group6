import { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Calling Sign In API...");
    } else {
      console.log("Calling Sign Up API...");
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-600 to-indigo-900 justify-center items-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="text-center text-white z-10 px-12">
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300">
          
          <div className="text-center mb-10">
            <h1 className="md:hidden text-4xl font-extrabold text-blue-600 mb-4">AINOTES</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome to AINotes! ' : 'Create an account '}
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
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

        
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              {isLogin && (
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-800 transition">Forgot password?</a>
                </div>
              )}
            </div>


            <button 
              type="submit" 
              className="w-full bg-gray-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 mt-6"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>


          <div className="mt-8 text-center">
            <p className="text-gray-600 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
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