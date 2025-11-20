import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReportCard = ({ currReport, prevReport }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ReportDetails", { currReport: currReport, prevReport: prevReport });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.reportCard, pressed && styles.pressed]}
      onPress={handlePress}
    >
      <Text style={styles.title}>{currReport.title}</Text>
      <Text style={styles.subtitle}>
        Month: {currReport.month} | Date:{" "}
        {new Date(currReport.date).toLocaleDateString()}
      </Text>
      <Text style={styles.net}>
        Net Result:{" "}
        {currReport.netResult ?? currReport.totalIncome - currReport.totalExpenses} ₪
      </Text>
    </Pressable>
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
  pressed: {
    opacity: 0.7,
  },
});
