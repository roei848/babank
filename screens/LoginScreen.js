import { useContext, useState } from "react";
import { Alert } from "react-native";
import { login } from "../api/auth";
import { AuthContext } from "../store/auth-context";
import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LandingOverlay";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      setIsAuthenticating(true);

      // Login using Firebase Auth SDK
      const user = await login(email, password);

      // Get the ID token
      const token = await user.getIdToken();

      console.log("Logged in user token:", token);

      // Pass token to your AuthContext
      authCtx.authenticate(token);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login failed", "Please check your email and password.");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
