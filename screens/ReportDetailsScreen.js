import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesSection from "../components/reports/ExpensesSection";
import IncomesSection from "../components/reports/IncomesSection";
import AccountsSection from "../components/reports/AccountsSection";
import { formatFirestoreDate } from "../utils/helper";
import PieChart from "../components/charts/PieChart";

const ReportDetailsScreen = ({ route, navigation }) => {
  const { currReport, prevReport } = route.params;
  const accountsGrowth = currReport && prevReport ? currReport.totalAccounts - prevReport.totalAccounts : 0;

  console.log("currReport", currReport);
  console.log("prevReport", prevReport);

  useLayoutEffect(() => {
    if (currReport?.title) {
      navigation.setOptions({
        title: currReport.title, 
      });
    }
  }, [navigation, currReport]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Month: {currReport.month}</Text>
        <Text style={styles.subtitle}>
          Date: {formatFirestoreDate(currReport.date)}
        </Text>
      </View>
      <PieChart
        title="Total Accounts"
        total={currReport.totalAccounts}
        growth={accountsGrowth}
        data={currReport.accounts.map((acc) => ({ label: acc.name, value: acc.balance }))}
      />
      <AccountsSection currAccounts={currReport.accounts} prevAccounts={prevReport.accounts} />
      <ExpensesSection expenses={currReport.expenses} />
      <IncomesSection incomes={currReport.incomes} />
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
