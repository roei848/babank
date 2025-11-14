import { View, Text, StyleSheet } from "react-native";

const Income = ({ income }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{income.description}</Text>
      <Text style={styles.amount}>{income.amount} ₪</Text>
    </View>
  );
};

export default Income;

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
