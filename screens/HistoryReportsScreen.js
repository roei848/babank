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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading reports...</Text>
      </View>
    );
  }

  if (reports.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No reports found yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, index }) => (
          <ReportCard
            currReport={item}
            prevReport={reports[index + 1] || null}
          />
        )}
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
