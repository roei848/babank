import { View, Text, StyleSheet, FlatList } from "react-native";
import Outcome from "./Outcome";

const ExpensesSection = ({ expenses, majorExpenses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.description}
        renderItem={({ item }) => <Outcome outcome={item} />}
      />
      <Text style={styles.majorExpensesTitle}>* Major Expenses</Text>
      <FlatList
        data={majorExpenses}
        keyExtractor={(item) => item.description}
        renderItem={({ item }) => <Outcome outcome={item} />}
      />
    </View>
  );
};

export default ExpensesSection;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  majorExpensesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    fontStyle: "italic",
    marginTop: 16,
  },
});
