import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { addReport } from "../api/reportService";
import Button from "../components/ui/Button";

export default function AddJsonReportScreen() {
  const [jsonText, setJsonText] = useState("");

  const handleSave = async () => {
    try {
      const reportData = JSON.parse(jsonText);

      if (!reportData.title && reportData.month) {
        reportData.title = `${reportData.month} המגניב`;
      }

      await addReport(reportData);

      Alert.alert("Success", "Report added successfully!");
      setJsonText("");
    } catch (err) {
      Alert.alert("Error", "Invalid JSON format");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Paste JSON here..."
        value={jsonText}
        onChangeText={setJsonText}
      />

      <Button onPress={handleSave}>Save Report</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    textAlignVertical: "top",
  },
});
