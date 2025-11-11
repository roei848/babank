import { View, Text, StyleSheet } from "react-native";
import Title from "../ui/Title";
import ExpensesSection from "./ExpensesSection";
import IncomesSection from "./IncomesSection";
import AccountsSection from "./AccountsSection";

const LastReport = ({ report }) => {
  console.log("report", report);
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

export default LastReport;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "flex-start",
      padding: 16,
      paddingTop: 48,
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
  