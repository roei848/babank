// store/auth-context.js
import { createContext, useState, useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const userIsAuthenticated = !!token;

  function authenticate(token) {
    setToken(token);
  }

  function logout() {
    signOut(auth);
    setToken(null);
  }

  // ✅ Automatically detect login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const newToken = await user.getIdToken();
        setToken(newToken);
      } else {
        setToken(null);
      }
    });

    return unsubscribe; // cleanup on unmount
  }, []);

  const value = {
    token,
    isAuthenticated: userIsAuthenticated,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
