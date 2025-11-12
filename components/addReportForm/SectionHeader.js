import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/style";

export default function SectionHeader({ title, expanded, onPress }) {
  return (
    <TouchableOpacity style={styles.header} onPress={onPress}>
      <Text style={styles.headerText}>{title}</Text>
      <Ionicons
        name={expanded ? "chevron-up" : "chevron-down"}
        size={20}
        color={Colors.primary800}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginVertical: 6,
    elevation: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary800,
  },
});
