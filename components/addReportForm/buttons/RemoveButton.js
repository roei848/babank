import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/style";

export default function RemoveButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.removeBtn} onPress={onPress}>
      <Ionicons name="trash-outline" size={22} color={Colors.error500} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  removeBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 4,
  },
});
