'use client';
import { useState, useEffect } from 'react';
import { Check, X, Upload, User, GraduationCap, Briefcase, Camera } from 'lucide-react';

const classLevels = [
  'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3', 
  'O Level', '100 Level', '200 Level', '300 Level', '400 Level', '500 Level'
];

const careerFields = {
  'Computer Science': [
    'Programming',
    'Data Structures & Algorithms',
    'Computer Architecture',
    'Database Management',
    'Artificial Intelligence',
    'Software Engineering',
    'Cybersecurity'
  ],
  'Engineering': [
    'Chemical Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Computer Engineering',
    'Petroleum Engineering'
  ],
  'Accounting': [
    'Financial Accounting',
    'Managerial Accounting',
    'Auditing',
    'Taxation',
    'Cost Accounting'
  ],
  'Business Management': [
    'Finance',
    'Economics',
    'Marketing',
    'Human Resources',
    'Operations Management',
    'Strategic Management'
  ],
  'Law': [
    'Contract Law',
    'Tort Law',
    'Criminal Law',
    'Constitutional Law',
    'Property Law',
    'Corporate Law'
  ],
  'Medicine & Surgery': [
    'Anatomy',
    'Physiology',
    'Biochemistry',
    'Clinical Medicine',
    'Surgery',
    'Pathology'
  ],
  'Psychology': [
    'Research Methods',
    'Social Psychology',
    'Developmental Psychology',
    'Cognitive Psychology',
    'Clinical Psychology'
  ],
  'Architecture': [
    'Architectural Design',
    'History & Theory of Architecture',
    'Building Construction',
    'Environmental Studies',
    'Structural Systems'
  ],
  'Political Science': [
    'Comparative Politics',
    'International Relations',
    'Political Theory',
    'Public Administration',
    'Public Policy'
  ],
  'Mass Communication': [
    'Journalism',
    'Public Relations',
    'Advertising',
    'Broadcasting',
    'Digital Media'
  ],
  'Pharmacy': [
    'Organic Chemistry',
    'Medicinal Chemistry',
    'Pharmacology',
    'Pharmaceutics',
    'Clinical Pharmacy'
  ],
  'Nursing': [
    'Fundamentals of Nursing',
    'Medical-Surgical Nursing',
    'Pediatric Nursing',
    'Community Health Nursing',
    'Psychiatric Nursing'
  ]
};

export default function ComprehensiveSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    classLevel: '',
    careerField: '',
    subjects: [],
    profileImage: null,
    password: '',
    confirmPassword: '',
    otp: ''
  });
  
  const [profilePreview, setProfilePreview] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  });
  const [otpTimer, setOtpTimer] = useState(30);
  const [otpExpired, setOtpExpired] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Password validation
  useEffect(() => {
    const password = form.password;
    setPasswordValidation({
      length: password.length >= 6 && password.length <= 15,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [form.password]);

  // OTP Timer
  useEffect(() => {
    let interval;
    if (step === 5 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev === 1) {
            setOtpExpired(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempt:', loginForm);
    alert('Login successful! (This is a demo)');
    setShowLoginModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profileImage: file });
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubjectChange = (subject) => {
    const updatedSubjects = form.subjects.includes(subject)
      ? form.subjects.filter(s => s !== subject)
      : [...form.subjects, subject];
    setForm({ ...form, subjects: updatedSubjects });
  };

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    setOtpTimer(30);
    setOtpExpired(false);
    // Simulate sending OTP
    alert(`Your OTP is: ${otp} (This is a demo)`);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return form.firstName.trim() && form.lastName.trim();
      case 2:
        return form.classLevel;
      case 3:
        return form.careerField && form.subjects.length > 0;
      case 4:
        const allPasswordValid = Object.values(passwordValidation).every(v => v);
        return allPasswordValid && form.password === form.confirmPassword;
      case 5:
        return form.otp === generatedOtp && !otpExpired;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step === 4) {
        generateOtp();
      }
      setStep(step + 1);
    }
  };

  const ValidationIcon = ({ isValid }) => (
    isValid ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 px-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                <p className="text-gray-600">Let's start with your basic details</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name (Optional)</label>
                <input
                  type="text"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your middle name"
                />
              </div>
            </div>
          )}

          {/* Step 2: Class Level */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Academic Level</h2>
                <p className="text-gray-600">Select your current class level</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {classLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setForm({ ...form, classLevel: level })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      form.classLevel === level
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Career Field and Subjects */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Career Path</h2>
                <p className="text-gray-600">Choose your field and focus subjects</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Career Field</label>
                <select
                  name="careerField"
                  value={form.careerField}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a career field</option>
                  {Object.keys(careerFields).map((field) => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              {form.careerField && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Focus Subjects (Choose at least one)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {careerFields[form.careerField].map((subject) => (
                      <label key={subject} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.subjects.includes(subject)}
                          onChange={() => handleSubjectChange(subject)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Profile Image and Password */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Camera className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Profile & Security</h2>
                <p className="text-gray-600">Upload your photo and set a secure password</p>
              </div>

              {/* Profile Image Upload */}
              <div className="text-center">
                <div className="mb-4">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100" />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Upload Profile Picture
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Password Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <ValidationIcon isValid={passwordValidation.length} />
                      <span className="text-sm text-gray-600">6-15 characters long</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ValidationIcon isValid={passwordValidation.uppercase} />
                      <span className="text-sm text-gray-600">At least one uppercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ValidationIcon isValid={passwordValidation.lowercase} />
                      <span className="text-sm text-gray-600">At least one lowercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ValidationIcon isValid={passwordValidation.number} />
                      <span className="text-sm text-gray-600">At least one number</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ValidationIcon isValid={passwordValidation.symbol} />
                      <span className="text-sm text-gray-600">At least one symbol (!@#$%^&*)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ValidationIcon isValid={form.password === form.confirmPassword && form.confirmPassword !== ''} />
                      <span className="text-sm text-gray-600">Passwords match</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: OTP Verification */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xl font-bold">#</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Verify Your Account</h2>
                <p className="text-gray-600">Enter the 4-digit code we sent to your phone</p>
              </div>

              <div className="text-center">
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleInputChange}
                  maxLength="4"
                  className="text-center text-2xl font-bold w-32 border-2 border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0000"
                />
                
                <div className="mt-4">
                  {otpExpired ? (
                    <button
                      onClick={generateOtp}
                      className="text-blue-600 hover:underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p className="text-gray-600">
                      OTP expires in: <span className="font-bold text-red-600">{otpTimer}s</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Account Created Successfully!</h2>
              <p className="text-gray-600">Welcome to your career journey. You can now start exploring your subjects.</p>
              <button 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setShowLoginModal(true)}
              >
                Get Started
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 6 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={!validateStep()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 5 ? 'Verify & Complete' : 'Next'}
              </button>
            </div>
          )}
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="md:w-1/2 bg-gradient-to-br from-green-400 to-green-600 p-8 flex items-center justify-center relative">
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="text-center text-white">
                    <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                        alt="Student with books"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Continue Your Journey</h3>
                    <p className="text-green-100">Access your personalized learning experience</p>
                  </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="md:w-1/2 p-8">
                  <div className="max-w-sm mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h2>
                    <p className="text-gray-600 text-center mb-8">Sign in to continue your learning</p>
                    
                    <div className="space-y-4">
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginInputChange}
                          placeholder="Email"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <input
                          type="password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginInputChange}
                          placeholder="Password"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <button
                        onClick={handleLogin}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Sign In
                      </button>

                      <div className="text-center mt-6">
                        <p className="text-gray-600">
                          Don't have an account?{' '}
                          <button
                            onClick={() => {
                              setShowLoginModal(false);
                              setStep(1);
                            }}
                            className="text-green-600 hover:underline font-medium"
                          >
                            Create one
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
