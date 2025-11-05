import { View, Text, StyleSheet } from "react-native";

const HistoryReportsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>History Reports Screen</Text>
    </View>
  );
};

export default HistoryReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});