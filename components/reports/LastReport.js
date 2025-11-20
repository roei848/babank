import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Title from "../ui/Title";
import PieChart from "../charts/PieChart";
import FlatButton from "../ui/FlatButton";
import IncomeExpensesCard from "./IncomeExpensesCard";
import { formatFirestoreDate } from "../../utils/helper";

const LastReport = ({ currReport, prevReport }) => {
  const navigation = useNavigation();
  const accountsGrowth = currReport && prevReport ? currReport.totalAccounts - prevReport.totalAccounts : 0;

  const handleToFullReportLink = () => {
    navigation.navigate("ReportDetails", { currReport: currReport, prevReport: prevReport });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Title>{currReport.title}</Title>
        <Text style={styles.subtitle}>Month: {currReport.month}</Text>
        <Text style={styles.subtitle}>
          Date: {formatFirestoreDate(currReport.date)}
        </Text>
      </View>
      <PieChart
        title="Total amount"
        total={currReport.totalAccounts}
        growth={accountsGrowth}
        data={currReport.accounts.map((acc) => ({
          label: acc.name,
          value: acc.balance,
        }))}
      />
      <IncomeExpensesCard
        incomesTotal={currReport.totalIncome}
        expensesTotal={currReport.totalExpenses}
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
