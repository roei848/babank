import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../constants/style";
import { Ionicons } from "@expo/vector-icons";

const SelectInput = ({ label, items, value, onValueChange, style, isInvalid = false }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>{label}</Text>
      <View style={[styles.selectContainer, isInvalid && styles.selectContainerInvalid]}>
        <RNPickerSelect
          onValueChange={onValueChange}
          value={value}
          items={items}
          style={{
            inputIOS: styles.input,
            inputAndroid: styles.input,
            iconContainer: styles.iconContainer,
            placeholder: { color: "#999" },
          }}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: "בחירה...", value: null }}
          Icon={() => (
            <Ionicons name="chevron-down" size={18} color={Colors.primary800} />
          )}
        />
      </View>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 4,
  },
  label: {
    color: Colors.primary800,
    fontSize: 15,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  selectContainer: {
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 46,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 16,
    color: Colors.primary800,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  inputContainer: {
    gap: 4,
    marginBottom: 14,
  },
  selectContainerInvalid: {
    backgroundColor: Colors.error100,
  },
});
