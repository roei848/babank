import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/style";

export default function AddButton({ onPress, label = "Add Item" }) {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={20} color={Colors.accent800} />
      <Text style={styles.addBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addBtnText: {
    marginLeft: 6,
    color: Colors.accent800,
    fontWeight: "600",
    fontSize: 15,
  },
});
