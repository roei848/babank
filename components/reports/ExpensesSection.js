import { View, Text, StyleSheet, FlatList } from "react-native";
import Expense from "./Expense";

const ExpensesSection = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Expense expense={item} />
        )}
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
