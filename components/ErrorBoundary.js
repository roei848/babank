import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.log("🔥 ERROR BOUNDARY TRIGGERED:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("🔥 React Error Boundary Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🚨 Something went wrong</Text>

          <Text style={styles.errorLabel}>Error details:</Text>

          <Text style={styles.errorText}>{String(this.state.error)}</Text>

          <Text style={styles.hint}>
            (Check your terminal logs for more info)
          </Text>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#b00020",
    marginBottom: 20,
  },
  errorLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#d00000",
    marginBottom: 20,
  },
  hint: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
});
