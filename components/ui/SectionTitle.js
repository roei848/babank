import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/style";

const SectionTitle = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={20}
        color={Colors.primary800}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary300,
  },

  icon: {
    marginHorizontal: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary800,
  },
});
