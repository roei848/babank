import { View, Text, StyleSheet } from "react-native";

const Expense = ({ expense }) => {
  const { name, total, majorExpenses } = expense;

  return (
    <View key={expense.id} style={styles.container}>
      <Text style={styles.expenseHeader}>
        {name} — {total}₪
      </Text>
      {majorExpenses?.length > 0 && (
        <View style={styles.majorExpensesContainer}>
          <Text style={styles.majorExpensesTitle}>Major Expenses:</Text>

          {majorExpenses.map((item) => (
            <Text key={item.id} style={styles.majorExpenseItem}>
              • {item.label}: {item.amount}₪
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  expenseHeader: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  majorExpensesContainer: {
    marginTop: 6,
    paddingLeft: 12,
  },
  majorExpensesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
    marginBottom: 4,
  },
  majorExpenseItem: {
    fontSize: 13,
    color: "#555",
    marginVertical: 1,
  },
});
