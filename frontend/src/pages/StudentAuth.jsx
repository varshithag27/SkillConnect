import { useState } from 'react';
import { GraduationCap, Calendar, User, Shield, BookOpen, Award } from 'lucide-react';

const StudentAuth = () => {
  const [usn, setUsn] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const handleSubmit = () => {
    setError('');
    
    if (!usn.trim()) {
      setError('Please enter your USN');
      return;
    }
    
    if (!dob) {
      setError('Please select your date of birth');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      alert(`Login successful!\nUSN: ${usn}\nDOB: ${dob}`);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-violet-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-fuchsia-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-pink-400 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid md:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left Sidebar */}
          <div className="md:col-span-2 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">EduPortal</h1>
                    <p className="text-sm text-purple-100">Student Management</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Welcome to Your Academic Journey
                  </h2>
                  <p className="text-purple-100 text-sm sm:text-base">
                    Sign in to access your personalized dashboard and stay connected with your academic progress
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Explore Company Resources</p>
                    <p className="text-xs text-purple-100">View Internship/Job Details</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Track Applications</p>
                    <p className="text-xs text-purple-100">Apply for Jobs & Internships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="md:col-span-3 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
                <p className="text-slate-600">Please enter your credentials to continue</p>
              </div>

              <div className="space-y-5">
                {/* USN Input */}
                <div>
                  <label htmlFor="usn" className="block text-sm font-semibold text-slate-700 mb-2">
                    University Seat Number
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'usn' ? 'scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`h-5 w-5 transition-colors ${focusedField === 'usn' ? 'text-violet-600' : 'text-slate-400'}`} />
                    </div>
                    <input
                      type="text"
                      id="usn"
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setFocusedField('usn')}
                      onBlur={() => setFocusedField('')}
                      placeholder="1AB20CS001"
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Date of Birth Input */}
                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'dob' ? 'scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className={`h-5 w-5 transition-colors ${focusedField === 'dob' ? 'text-violet-600' : 'text-slate-400'}`} />
                    </div>
                    <input
                      type="date"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setFocusedField('dob')}
                      onBlur={() => setFocusedField('')}
                      max={new Date().toISOString().split('T')[0]}
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-violet-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-pulse">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">!</span>
                    </div>
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      <span>Sign In Securely</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-center text-xs text-slate-500">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAuth
