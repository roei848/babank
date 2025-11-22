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
  textAlign = "right",
  amount = false,
}) {
  const sanitizedValue =
    value === null || value === undefined ? "" : String(value);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          isInvalid && styles.inputWrapperInvalid
        ]}
      >
        <TextInput
          style={[styles.input, amount && styles.inputWithAmount]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={(text) => {
            if (amount) {
              const cleaned = text.replace(/[^0-9]/g, "");
              onUpdateValue(cleaned === "" ? "" : Number(cleaned));
            } else {
              onUpdateValue(text);
            }
          }}
          value={sanitizedValue}
          textAlign={textAlign}
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
    marginBottom: 14,
  },

  label: {
    color: Colors.primary800,
    fontSize: 15,
    marginBottom: 4,
  },

  labelInvalid: {
    color: Colors.error500,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 46,
  },

  inputWrapperInvalid: {
    borderColor: Colors.error500,
    backgroundColor: Colors.error100,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.primary800,
  },

  inputWithAmount: {
    paddingRight: 4,
  },

  currencySymbol: {
    fontSize: 16,
    color: Colors.primary800,
    marginLeft: 6,
  },
});
