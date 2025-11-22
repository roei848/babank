import { View, StyleSheet, FlatList } from "react-native";

import Expense from "./Expense";
import SectionTitle from "../ui/SectionTitle";

const ExpensesSection = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="הוצאות" icon="trending-down" />
      <FlatList
        data={expenses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Expense expense={item} />
        )}
        scrollEnabled={false}
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
