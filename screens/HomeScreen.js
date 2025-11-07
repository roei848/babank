import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Report from "../models/Report";
import { addReport } from "../api/reportService";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addDummyReportHandler = async () => {
    try {
      setIsLoading(true);

      // Create a dummy report
      const dummyReport = new Report(
        new Date().toISOString(),
        "Dummy Report " + new Date().toLocaleTimeString(), // unique title
        "NOVEMBER",
        [
          { amount: 5000, description: "Salary" },
          { amount: 250, description: "Freelance project" },
        ],
        [
          { amount: 1000, description: "Rent" },
          { amount: 200, description: "Groceries" },
        ],
        [
          { amount: 1500, description: "New Laptop" },
        ],
        [
          { balance: 2200, name: "Savings Account", location: "OTZAR_HAYAL" },
          { balance: 1000, name: "Investments", location: "ANALYST" },
        ]
      );

      await addReport(dummyReport);
      Alert.alert("Success", "Dummy report added to Firestore!");
    } catch (error) {
      console.error("Error adding report:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title={isLoading ? "Adding..." : "Add Dummy Report"}
        onPress={addDummyReportHandler}
        disabled={isLoading}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
