import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useReports } from "../store/report-context";
import ReportCard from "../components/reports/ReportCard";

const HistoryReportsScreen = () => {
  const { reports, loading } = useReports();

  // Sort reports by date (newest first)
  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading reports...</Text>
      </View>
    );
  }

  if (sortedReports.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No reports found yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedReports}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => <ReportCard report={item} />}
        contentContainerStyle={{ padding: 16 }} 
      />
    </View>
  );
};

export default HistoryReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#555",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
});
