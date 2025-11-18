import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Title from "../ui/Title";
import PieChart from "../charts/PieChart";
import FlatButton from "../ui/FlatButton";
import IncomeExpensesCard from "./IncomeExpensesCard";
import { formatFirestoreDate } from "../../utils/helper";

const LastReport = ({ report, accountsGrowth }) => {
  const navigation = useNavigation();

  const handleToFullReportLink = () => {
    navigation.navigate("ReportDetails", { report: report });
  };

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
        total={report.totalAccounts}
        growth={accountsGrowth}
        data={report.accounts.map((acc) => ({
          label: acc.name,
          value: acc.balance,
        }))}
      />
      <IncomeExpensesCard
        incomesTotal={report.totalIncome}
        expensesTotal={report.totalExpenses}
      />
      <FlatButton
        textStyle={styles.linkButton}
        onPress={handleToFullReportLink}
      >
        To Full Report
      </FlatButton>
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
    textAlign: "center",
  },
  linkButton: {
    textDecorationLine: "underline",
  },
});
