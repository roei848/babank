import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Report from "../models/Report";
import { addReport } from "../api/reportService";
import { getLastReportFromUser } from "../api/reportService";
import LastReport from "../components/reports/LastReport";
import LoadingOverlay from "../components/ui/LandingOverlay";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastReport, setLastReport] = useState(null);

  useEffect(() => {
    console.log("fetching last report");
    setIsLoading(true);
    const fetchLastReport = async () => {
      const report = await getLastReportFromUser();
      console.log("report", report);
      setLastReport(report);
      setIsLoading(false);
    };
    fetchLastReport();
  }, []);

  // const addDummyReportHandler = async () => {
  //   try {
  //     setIsLoading(true);

  //     // Create a dummy report
  //     const dummyReport = new Report(
  //       new Date().toISOString(),
  //       "Dummy Report " + new Date().toLocaleTimeString(), // unique title
  //       "NOVEMBER",
  //       [
  //         { amount: 5000, description: "Salary" },
  //         { amount: 250, description: "Freelance project" },
  //       ],
  //       [
  //         { amount: 1000, description: "Rent" },
  //         { amount: 200, description: "Groceries" },
  //       ],
  //       [
  //         { amount: 1500, description: "New Laptop" },
  //       ],
  //       [
  //         { balance: 2200, name: "Savings Account", location: "OTZAR_HAYAL" },
  //         { balance: 1000, name: "Investments", location: "ANALYST" },
  //       ]
  //     );

  //     await addReport(dummyReport);
  //     Alert.alert("Success", "Dummy report added to Firestore!");
  //   } catch (error) {
  //     console.error("Error adding report:", error);
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingOverlay message="Loading last report..." />
      ) : lastReport ? (
        <LastReport report={lastReport} />
      ) : (
        <Text>No last report found</Text>
      )}
      {/* <Button
        title={isLoading ? "Adding..." : "Add Dummy Report"}
        onPress={addDummyReportHandler}
        disabled={isLoading}
      /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
