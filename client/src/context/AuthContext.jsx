import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(); // ✅ Create context

export const useAuthContext = () => {
  return useContext(AuthContext); // ✅ Use context inside a hook
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(localStorage.getItem("chat-user") || null);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", authUser);
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
