import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/auth/AuthContent.js";
import LoadingOverlay from "../components/ui/LandingOverlay.js";
import { createUser } from "../api/auth.js";
import { AuthContext } from "../store/auth-context.js";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const signupHandler = async (credentials) => {
    try {
      console.log("credentials", credentials);
      setIsAuthenticating(true);
      const res = await createUser(credentials.email, credentials.password);
      const token = res.idToken;
      console.log("token", token);
      authCtx.authenticate(token);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Authentication failed", "Please check your credentials.");
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
