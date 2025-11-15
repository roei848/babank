import { View, Text, StyleSheet, ScrollView } from "react-native";

import Title from "../ui/Title";
import PieChart from "../charts/PieChart";
import IncomesSection from "./IncomesSection";
import ExpensesSection from "./ExpensesSection";
import AccountsSection from "./AccountsSection";
import { formatFirestoreDate } from "../../utils/helper";

const LastReport = ({ report }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Title>{report.title}</Title>
        <Text style={styles.subtitle}>Month: {report.month}</Text>
        <Text style={styles.subtitle}>
          Date: {formatFirestoreDate(report.date)}
        </Text>
      </View>
      <PieChart
        title="Total amount"
        total={report.accounts.reduce((s, a) => s + a.balance, 0)}
        data={report.accounts.map((acc) => ({
          label: acc.name,
          value: acc.balance,
        }))}
      />
      <ExpensesSection expenses={report.expenses} />
      <IncomesSection incomes={report.incomes} />
      <AccountsSection accounts={report.accounts} />
    </ScrollView>
  );
};

export default LastReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 16,
    paddingTop: 48,
    gap: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "start",
  },
});
