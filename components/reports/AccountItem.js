import { View, Text, StyleSheet } from "react-native";
import { LocationTitleMap } from "../../models/Report";

const AccountItem = ({ account }) => {
  console.log("account", account);

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{account.name}</Text>
        <Text style={styles.location}>({LocationTitleMap[account.location]})</Text>
      </View>
      <Text style={styles.balance}>{account.balance} ₪</Text>
    </View>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    color: "#333",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {},
  location: {},
  balance: {},
});
