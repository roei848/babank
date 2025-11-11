import { View, Text, StyleSheet, FlatList } from "react-native";
import Outcome from "./Outcome";

const IncomesSection = ({ incomes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incomes</Text>
      <FlatList
        data={incomes}
        keyExtractor={(item) => item.description}
        renderItem={({ item }) => <Outcome outcome={item} />}
      />
    </View>
  );
};

export default IncomesSection;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
});
