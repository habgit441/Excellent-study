'use client';

import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

const classes = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3', 'O Level', '100 Level', '200 Level', '300 Level', '400 Level', '500 Level'];

const professions = {
  'Computer Science': ['Programming', 'Data Structures', 'AI', 'DBMS'],
  'Engineering': ['Mechanical', 'Electrical', 'Civil', 'Computer Engineering'],
  'Accounting': ['Financial Accounting', 'Auditing', 'Taxation'],
  'Business Management': ['Marketing', 'Finance', 'HR'],
  'Law': ['Contract Law', 'Criminal Law', 'Constitutional Law'],
  'Medicine': ['Surgery', 'Anatomy', 'Physiology'],
  'Psychology': ['Developmental', 'Cognitive', 'Social'],
  'Architecture': ['Design', 'Construction', 'Structural Systems'],
  'Political Science': ['Public Policy', 'IR', 'Comparative Politics'],
  'Mass Communication': ['Journalism', 'PR', 'Broadcasting'],
  'Pharmacy': ['Pharmacology', 'Medicinal Chemistry'],
  'Nursing': ['Nursing Science'],
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    classLevel: '',
    profession: '',
    focusSubjects: [] as string[],
    profile: null as File | null,
  });

  useEffect(() => {
    const generatedUsername = `${form.firstName.trim().toLowerCase()}${form.lastName.trim().toLowerCase()}`;
    setForm((prev) => ({ ...prev, userName: generatedUsername }));
  }, [form.firstName, form.lastName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, profile: e.target.files[0] });
    }
  };

  const handleFocusSubjectToggle = (subject: string) => {
    const updated = form.focusSubjects.includes(subject)
      ? form.focusSubjects.filter((s) => s !== subject)
      : [...form.focusSubjects, subject];
    setForm({ ...form, focusSubjects: updated });
  };

  const handleSubmit = () => {
    console.log('Submitted:', form);
    alert(`Submitted Successfully! Username: ${form.userName}`);
  };

  const validatePassword = (password: string) => {
    return /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^a-zA-Z0-9]/.test(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden bg-white">
        <div className={`w-full md:w-1/2 p-8 transition duration-700 ${isLogin ? 'order-2' : 'order-1'}`}>
          {isLogin ? (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
              <input name="email" type="text" placeholder="Username or Email" className="w-full border p-3 rounded mb-4" />
              <input name="password" type="password" placeholder="Password" className="w-full border p-3 rounded mb-4" />
              <button className="w-full bg-blue-600 text-white py-3 rounded mb-4">Login</button>
              <div className="flex items-center gap-3 justify-center">
                <FcGoogle className="text-2xl cursor-pointer" />
                <FaFacebookF className="text-2xl text-blue-700 cursor-pointer" />
              </div>
              <p className="mt-4 text-center text-sm">
                Don’t have an account?{' '}
                <button className="text-blue-600 underline" onClick={() => setIsLogin(false)}>
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
              {step === 1 && (
                <>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full border p-3 rounded mb-3" />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border p-3 rounded mb-3" />
                  <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border p-3 rounded mb-3" />
                  <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full border p-3 rounded mb-3" />
                  <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type="password" className="w-full border p-3 rounded mb-3" />
                  <p className="text-sm text-gray-500 mb-2">
                    <strong>Password must include:</strong> 1 uppercase, 1 lowercase & 1 symbol
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    <strong>Username Preview:</strong> <span className="text-blue-600">{form.userName || ''}</span>
                  </p>
                  <button onClick={() => setStep(2)} className="w-full bg-green-600 text-white py-3 rounded">
                    Continue
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <select name="classLevel" value={form.classLevel} onChange={handleChange} className="w-full border p-3 rounded mb-3">
                    <option value="">-- Select Class Level --</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => setStep(3)} className="w-full bg-green-600 text-white py-3 rounded">
                    Continue
                  </button>
                </>
              )}
              {step === 3 && (
                <>
                  <select name="profession" value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value, focusSubjects: [] })} className="w-full border p-3 rounded mb-3">
                    <option value="">-- Select Career Path --</option>
                    {Object.keys(professions).map((prof) => (
                      <option key={prof} value={prof}>
                        {prof}
                      </option>
                    ))}
                  </select>
                  {form.profession && (
                    <div className="mb-3">
                      <label className="block font-medium mb-1">Focus Subjects:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {professions[form.profession].map((subject) => (
                          <label key={subject} className="flex items-center">
                            <input type="checkbox" checked={form.focusSubjects.includes(subject)} onChange={() => handleFocusSubjectToggle(subject)} />
                            <span className="ml-2">{subject}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <button onClick={() => setStep(4)} className="w-full bg-green-600 text-white py-3 rounded">
                    Continue
                  </button>
                </>
              )}
              {step === 4 && (
                <>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full border p-3 rounded mb-3" />
                  {form.profile && <img src={URL.createObjectURL(form.profile)} alt="Profile Preview" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover" />}
                  <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded">
                    Submit
                  </button>
                </>
              )}
              <p className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <button className="text-blue-600 underline" onClick={() => setIsLogin(true)}>
                  Login
                </button>
              </p>
            </div>
          )}
        </div>

        <div className={`hidden md:block md:w-1/2 bg-gradient-to-br ${isLogin ? 'from-green-100 to-green-300' : 'from-blue-100 to-blue-300'} p-10 transition duration-700 flex items-center justify-center`}>
          <img
            src={isLogin ? '/login-illustration.svg' : '/signup-illustration.svg'}
            alt="illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
