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
      <View style={[styles.inputWrapper, isInvalid && styles.inputWrapperInvalid]}>
        <TextInput
          style={[styles.input, amount && styles.inputWithAmount]}
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
  inputWrapperInvalid: {
    backgroundColor: Colors.error100, // highlight full box
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    color: Colors.primary800,
    textAlignVertical: "center",
  },
  inputWithAmount: {
    paddingRight: 4,
  },
  currencySymbol: {
    fontSize: 16,
    color: Colors.primary800,
    marginLeft: 6,
    lineHeight: 18,
  },
});
