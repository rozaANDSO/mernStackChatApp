import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Use React Router navigation
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    email,
    gender,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          email,
          gender,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed!");
      }

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData.user));

      navigate("/"); // ✅ Redirect without reloading

      setLoading(false); // ✅ Ensure loading stops after success
    } catch (error) {
      setError(error.message);
      setLoading(false); // ✅ Ensure loading stops after error
    }
  };
  return { signup, loading, error }; // ✅ Now matches SingUp.jsx usage
};

export default useSignup;
