import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useReports } from "../store/report-context";
import LastReport from "../components/reports/LastReport";
import LoadingOverlay from "../components/ui/LandingOverlay";
import { Colors } from "../constants/style";

const HomeScreen = () => {
  const { reports, loading } = useReports();
  const lastReport = reports?.length > 0 ? reports[0] : null;

  if (loading) {
    return <LoadingOverlay message="Loading last report..." />;
  }

  return (
    <View style={styles.container}>
      {lastReport ? (
        <LastReport report={lastReport} />
      ) : (
        <Text style={styles.noReportText}>No reports found yet</Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#fff",
    padding: 16,
  },
  noReportText: {
    fontSize: 16,
    color: Colors.primary800,
    textAlign: "center",
    marginTop: 40,
  },
});
