import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import IncomesSection from "../components/reports/IncomesSection";
import ExpensesSection from "../components/reports/ExpensesSection";
import AccountsSection from "../components/reports/AccountsSection";
import { formatFirestoreDate } from "../utils/helper";

const ReportDetailsScreen = ({ route, navigation }) => {
  const { currReport, prevReport } = route.params;
  const accountsGrowth = currReport && prevReport ? currReport.totalAccounts - prevReport.totalAccounts : currReport.totalAccounts;

  useLayoutEffect(() => {
    if (currReport?.title) {
      navigation.setOptions({
        title: currReport.title, 
      });
    }
  }, [navigation, currReport]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.subtitle}>{currReport.month}</Text>
        <Text style={styles.subtitle}>
          {formatFirestoreDate(currReport.date)}
        </Text>
      </View>
      <AccountsSection currAccounts={currReport.accounts} prevAccounts={prevReport?.accounts || null} totalAccounts={currReport.totalAccounts} accountsGrowth={accountsGrowth} />
      <IncomesSection incomes={currReport.incomes} />
      <ExpensesSection expenses={currReport.expenses} />
    </ScrollView>
  );
};

export default ReportDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
});
