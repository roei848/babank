import { View, Text, StyleSheet } from "react-native";
import Title from "../components/ui/Title";
import ExpensesSection from "../components/reports/ExpensesSection";
import IncomesSection from "../components/reports/IncomesSection";
import AccountsSection from "../components/reports/AccountsSection";

const ReportDetailsScreen = ({ route }) => {
  const { report } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>{report.title}</Title>
        <Text style={styles.subtitle}>Month: {report.month}</Text>
        <Text style={styles.subtitle}>Date: {new Date(report.date).toLocaleDateString()}</Text>
      </View>
      <ExpensesSection expenses={report.expenses} majorExpenses={report.majorExpenses} />
      <IncomesSection incomes={report.incomes} />
      <AccountsSection accounts={report.accounts} />
    </View>
  );
};

export default ReportDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
});
