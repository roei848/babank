import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/style.js";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  style,
  amount = false,
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            isInvalid && styles.inputInvalid,
            amount && styles.inputWithAmount,
          ]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
        />
        {amount && <Text style={styles.currencySymbol}>₪</Text>}
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 4,
  },
  label: {
    color: Colors.primary800,
    marginBottom: 4,
    fontWeight: "500",
  },
  labelInvalid: {
    color: Colors.error500,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    paddingHorizontal: 6,
    height: 40,
  },
  input: {
    flex: 1,
    paddingVertical: 0, // ✅ makes text vertically centered
    fontSize: 16,
    color: Colors.primary800,
    textAlignVertical: "center", // ✅ Android fix
  },
  inputWithAmount: {
    paddingRight: 4, // space before currency sign
  },
  currencySymbol: {
    fontSize: 16,
    color: Colors.primary800,
    marginLeft: 6,
    lineHeight: 18, // ✅ balances vertical centering
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
