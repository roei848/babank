import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/style";
import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { useNavigation } from "@react-navigation/native";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    navigation.replace(isLogin ? "Signup" : "Login");
  }

  function submitHandler(credentials) {
    const { email, confirmEmail, password, confirmPassword } = credentials;

    const emailValid = email.includes("@");
    const passwordValid = password.length > 6;
    const emailMatch = email === confirmEmail;
    const passMatch = password === confirmPassword;

    if (
      !emailValid ||
      !passwordValid ||
      (!isLogin && (!emailMatch || !passMatch))
    ) {
      setCredentialsInvalid({
        email: !emailValid,
        confirmEmail: !emailValid || !emailMatch,
        password: !passwordValid,
        confirmPassword: !passwordValid || !passMatch,
      });
      return;
    }

    onAuthenticate(credentials);
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{isLogin ? "כניסה" : "יצירת חשבון"}</Text>

        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />

        <FlatButton onPress={switchAuthModeHandler} textStyle={styles.switchButton}>
          {isLogin ? "עדיין אין לך חשבון? הירשם" : "כבר יש לך חשבון? התחבר"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 16,
    borderColor: Colors.border,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.primary800,
  },

  switchButton: {
    marginTop: 12,
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
    writingDirection: "rtl",
  },
});
