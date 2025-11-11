import { View, Text, StyleSheet } from "react-native";

const Outcome = ({ outcome }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{outcome.description}</Text>
      <Text style={styles.amount}>{outcome.amount} ₪</Text>
    </View>
  );
};

export default Outcome;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    color: "#333",
  },
  description: {},
  amount: {},
});
