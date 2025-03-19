import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Ensure you import navigate if using it

const useLogin = () => {
  const { setAuthUser } = useAuthContext(); // ✅ Now inside the hook
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Ensure you import useNavigate

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await res.json();
      setAuthUser(username); // ✅ Update auth state inside React
      setLoading(false);
      navigate("/"); // ✅ Redirect after login
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
