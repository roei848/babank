import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "../ui/Input";
import Button from "../ui/Button";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const { email: emailInvalid, confirmEmail, password: passInvalid, confirmPassword } =
    credentialsInvalid;

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  function updateInputHandler(field, value) {
    if (field === "email") setEnteredEmail(value);
    if (field === "confirmEmail") setEnteredConfirmEmail(value);
    if (field === "password") setEnteredPassword(value);
    if (field === "confirmPassword") setEnteredConfirmPassword(value);
  }

  function submit() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <Input
        label="דוא״ל"
        value={enteredEmail}
        isInvalid={emailInvalid}
        onUpdateValue={(v) => updateInputHandler("email", v)}
        keyboardType="email-address"
      />

      {!isLogin && (
        <Input
          label="אימות דוא״ל"
          value={enteredConfirmEmail}
          isInvalid={confirmEmail}
          onUpdateValue={(v) => updateInputHandler("confirmEmail", v)}
          keyboardType="email-address"
        />
      )}

      <Input
        label="סיסמה"
        secure
        value={enteredPassword}
        isInvalid={passInvalid}
        onUpdateValue={(v) => updateInputHandler("password", v)}
      />

      {!isLogin && (
        <Input
          label="אימות סיסמה"
          secure
          value={enteredConfirmPassword}
          isInvalid={confirmPassword}
          onUpdateValue={(v) => updateInputHandler("confirmPassword", v)}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button onPress={submit}>{isLogin ? "כניסה" : "הירשם"}</Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
