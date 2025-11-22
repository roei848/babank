import { View, StyleSheet, FlatList } from "react-native";
import Income from "./Income";
import SectionTitle from "../ui/SectionTitle";

const IncomesSection = ({ incomes }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="הכנסות" icon="trending-up" />
      <FlatList
        data={incomes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Income income={item} />}
        scrollEnabled={false}
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
