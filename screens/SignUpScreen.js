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
      setIsAuthenticating(true);

      // Create user in Firebase Auth (SDK)
      const user = await createUser(credentials.email, credentials.password);

      // Get token from the user object
      const token = await user.getIdToken();

      // Save token in your AuthContext (if you still use it for navigation)
      authCtx.authenticate(token);

    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("אימות נכשל", "אנא ודאו את הפרטים שלך או נסו שנית מאוחר יותר.");
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="יצירת משתמש..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
