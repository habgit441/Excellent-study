"use client";
import { useState, useEffect } from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Check, X, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const classLevels = [
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SSS 1",
  "SSS 2",
  "SSS 3",
  "O Level",
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
];

const careerFields = {
  "Computer Science": ["Programming", "AI", "Cybersecurity"],
  Engineering: ["Electrical", "Mechanical", "Civil"],
  Accounting: ["Auditing", "Taxation"],
  "Business Management": ["Marketing", "Finance"],
};

export default function ComprehensiveSignup() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    classLevel: "",
    careerField: "",
    subjects: [],
    profileImage: null,
    password: "",
    confirmPassword: "",
    otp: "",
    email: "",
    username: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [profilePreview, setProfilePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [otpExpired, setOtpExpired] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  useEffect(() => {
    const pw = form.password;
    setPasswordValidation({
      length: pw.length >= 6 && pw.length <= 15,
      uppercase: /[A-Z]/.test(pw),
      lowercase: /[a-z]/.test(pw),
      number: /\d/.test(pw),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    });
  }, [form.password]);

  useEffect(() => {
    let interval;
    if (step === 5 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((p) => {
          if (p <= 1) setOtpExpired(true);
          return p - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect to dashboard
      }, 2000); // 2-second delay before redirect
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubjectChange = (subject) => {
    const updated = form.subjects.includes(subject)
      ? form.subjects.filter((s) => s !== subject)
      : [...form.subjects, subject];
    setForm({ ...form, subjects: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setForm({ ...form, profileImage: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const generateOtp = () => {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    setOtpTimer(30);
    setOtpExpired(false);
    alert(`Your OTP is: ${code}`);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return form.firstName && form.lastName;
      case 2:
        return !!form.classLevel;
      case 3:
        return !!form.careerField && form.subjects.length > 0;
      case 4:
        return (
          Object.values(passwordValidation).every(Boolean) &&
          form.password === form.confirmPassword
        );
      case 5:
        return form.otp === generatedOtp && !otpExpired;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step === 4) generateOtp();
    setStep((prev) => prev + 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        getAuth(),
        form.email,
        form.password
      );
      setStep(6);
    } catch (err) {
      alert("Signup error");
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        getAuth(),
        loginForm.email,
        loginForm.password
      );
      alert("Logged in");
      setIsModalOpen(false);
    } catch (err) {
      alert("Login error");
    }
  };

  const ValidationIcon = ({ ok }) => (
    <span className="inline-flex items-center gap-1">
      {ok ? (
        <Check className="text-green-500 w-4 h-4" />
      ) : (
        <X className="text-red-500 w-4 h-4" />
      )}
    </span>
  );

  return (
    <div className="relative">
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-4 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <RiGraduationCapFill size={36} className="text-green-600" />
          Schooly
        </div>
        <ul className="hidden md:flex gap-6 text-sm text-gray-700 font-semibold">
          <li className="hover:text-green-600 cursor-pointer">About us</li>
          <li className="hover:text-green-600 cursor-pointer">Contact Us</li>
          <li className="hover:text-green-600 cursor-pointer">Services</li>
          <li className="hover:text-green-600 cursor-pointer">FAQ</li>
        </ul>
        <button
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          Join Now
        </button>
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
        {menuOpen && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-lg flex flex-col items-start p-6 md:hidden z-40">
            <ul className="flex flex-col gap-6 w-full text-base text-gray-800 font-medium">
              <li className="hover:text-green-600 cursor-pointer">About us</li>
              <li className="hover:text-green-600 cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-green-600 cursor-pointer">Services</li>
              <li className="hover:text-green-600 cursor-pointer">FAQ</li>
            </ul>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setMenuOpen(false);
              }}
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-semibold"
            >
              Join Now
            </button>
          </div>
        )}
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl flex overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-700 text-2xl z-50"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className="w-1/2 bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center">
              <Image
                src="/images/sophie.svg"
                alt="Signup Illustration"
                width={350}
                height={350}
                className="object-cover w-full h-full rounded-l-xl"
              />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h2>
              <div className="text-sm text-gray-500 text-center mb-4">
                {isLogin ? "" : `Step ${step} of 6`}
              </div>
              {!isLogin ? (
                <form onSubmit={handleSignup} className="space-y-4">
                  {step === 1 && (
                    <div className="space-y-4">
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                        required
                      />
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                        required
                      />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {classLevels.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setForm({ ...form, classLevel: lvl })}
                          className={`p-2 rounded-md border ${
                            form.classLevel === lvl
                              ? "bg-green-500 text-white"
                              : "bg-white"
                          } hover:bg-green-100 transition-colors text-sm`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <select
                        name="careerField"
                        value={form.careerField}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                      >
                        <option value="">Select Career Field</option>
                        {Object.keys(careerFields).map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      {form.careerField && (
                        <div className="grid grid-cols-2 gap-2">
                          {careerFields[form.careerField].map((s) => (
                            <label
                              key={s}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={form.subjects.includes(s)}
                                onChange={() => handleSubjectChange(s)}
                                className="h-4 w-4 accent-green-500"
                              />
                              <span>{s}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {step === 4 && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {profilePreview && (
                          <div className="mt-2">
                            <img
                              src={profilePreview}
                              alt="Profile preview"
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <ValidationIcon ok={passwordValidation.length} />
                          6–15 chars
                        </div>
                        <div>
                          <ValidationIcon ok={passwordValidation.uppercase} />
                          Uppercase
                        </div>
                        <div>
                          <ValidationIcon ok={passwordValidation.lowercase} />
                          Lowercase
                        </div>
                        <div>
                          <ValidationIcon ok={passwordValidation.number} />
                          Number
                        </div>
                        <div>
                          <ValidationIcon ok={passwordValidation.symbol} />
                          Symbol
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 5 && (
                    <div className="space-y-4">
                      <input
                        name="otp"
                        value={form.otp}
                        onChange={handleChange}
                        maxLength={4}
                        placeholder="Enter OTP"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500 text-center"
                      />
                      <div className="text-center">
                        {otpExpired ? (
                          <button
                            type="button"
                            onClick={generateOtp}
                            className="text-green-500 hover:underline"
                          >
                            Resend OTP
                          </button>
                        ) : (
                          <span className="text-gray-500">
                            Expires in: {otpTimer}s
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {step === 6 && (
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="text-green-500 w-10 h-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-green-600">
                        Success
                      </h3>
                      <p className="text-gray-500">
                        Account created successfully
                      </p>
                    </div>
                  )}
                  {/* login */}
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Back
                    </button>
                    {step < 6 && (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateStep()}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <input
                    name="email"
                    value={loginForm.email}
                    placeholder="Email"
                    onChange={handleLoginChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                    required
                  />
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      placeholder="Password"
                      onChange={handleLoginChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-green-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
                  >
                    Sign In
                  </button>
                  <div className="flex justify-center gap-4 mt-3">
                    <button className="p-2">
                      <FcGoogle size={24} />
                    </button>
                    <button className="p-2">
                      <FaFacebookF size={24} className="text-green-600" />
                    </button>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-4 text-center">
                {isLogin ? "Don't have an account?" : "Already have one?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setStep(1);
                  }}
                  className="text-green-600 font-semibold ml-1 hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

