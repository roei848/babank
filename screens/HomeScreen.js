import React from "react";
import { View, Text, StyleSheet } from "react-native";

import LastReport from "../components/reports/LastReport";
import LoadingOverlay from "../components/ui/LandingOverlay";
import { Colors } from "../constants/style";
import { useReports } from "../store/report-context";

const HomeScreen = () => {
  const { reports, loading } = useReports();
  const current = reports && reports.length > 0 ? reports[0] : null;
  const previous = reports && reports.length > 1 ? reports[1] : null;

  const accountsGrowth = current && previous ? current.totalAccounts - previous.totalAccounts : 0;

  if (loading) {
    return <LoadingOverlay message="Loading last report..." />;
  }

  return (
    <View style={styles.container}>
      {current ? (
        <LastReport report={current} accountsGrowth={accountsGrowth} />
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
