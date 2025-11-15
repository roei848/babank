import { View, Text, StyleSheet, FlatList } from "react-native";
import AccountItem from "./AccountItem";

const AccountsSection = ({ accounts }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <AccountItem account={item} />}
        scrollEnabled={false}
      />
    </View>
  );
};

export default AccountsSection;

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
