import React, { useState } from "react";
import GenderChatbox from "./GenderChatbox";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, loading } = useSignup(); // ✅ This must match the hook return

  const CheckBoxChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(input); // ✅ Ensure 'signup' is used correctly
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center">
          Signup <span className="text-blue-500">ChatApp</span>
        </h1>
        {/* ✅ Attach handleSubmit to form */}
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-base label-text gap-3">
                <span className="text-green-500">*</span>
                Full Name
              </span>
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={input.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-base label-text gap-3">
                <span className="text-green-500">*</span>
                Username
              </span>
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-base label-text gap-3">
                <span className="text-green-500">*</span>
                Email
              </span>
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-base label-text gap-3">
                <span className="text-green-500">*</span>
                Password
              </span>
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-base label-text gap-3">
                <span className="text-green-500">*</span>
                Confirm Password
              </span>
            </label>
            <input
              className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <GenderChatbox
            onCheckboxChange={CheckBoxChange}
            selectedGender={input.gender}
          />

          <div className="flex items-center justify-between">
            {/* ✅ Remove onClick and rely on form submission */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Sign Up
            </button>
            <a
              href="/login"
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
