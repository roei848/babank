import React from "react";
import { View, Text, StyleSheet } from "react-native";

const  ReportCard = ({ report }) => {
  return (
    <View style={styles.reportCard}>
      <Text style={styles.title}>{report.title}</Text>
      <Text style={styles.subtitle}>
        Month: {report.month} | Date: {new Date(report.date).toLocaleDateString()}
      </Text>
      <Text style={styles.net}>
        Net Result: {report.netResult ?? report.totalIncome - report.totalExpenses} ₪
      </Text>
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginVertical: 4,
  },
  net: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 6,
  },
});
