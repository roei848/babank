import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../constants/style";
import { Ionicons } from "@expo/vector-icons";

const SelectInput = ({ label, items, value, onValueChange, style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectContainer}>
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
          placeholder={{ label: "Select...", value: null }}
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
    marginBottom: 4,
    fontWeight: "500",
  },
  selectContainer: {
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    height: 40,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    color: Colors.primary800,
  },
  iconContainer: {
    top: 14,
    right: 10,
  },
});
