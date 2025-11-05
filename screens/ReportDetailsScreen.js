import { View, Text, StyleSheet } from "react-native";

const ReportDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Report Details Screen</Text>
    </View>
  );
};

export default ReportDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});