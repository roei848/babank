import { View, StyleSheet, FlatList } from "react-native";
import AccountItem from "./AccountItem";
import SectionTitle from "../ui/SectionTitle";

const AccountsSection = ({ currAccounts, prevAccounts }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="חשבונות" icon="wallet" />
      <FlatList
        data={currAccounts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <AccountItem account={item} prevAccount={prevAccounts.find((acc) => acc.name === item.name)} />
        )}
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
