import { View, StyleSheet, FlatList } from "react-native";

import AccountItem from "./AccountItem";
import PieChart from "../charts/PieChart";
import SectionTitle from "../ui/SectionTitle";

const AccountsSection = ({ currAccounts, prevAccounts, totalAccounts, accountsGrowth }) => {
  console.log("prevAccounts", prevAccounts);

  return (
    <View style={styles.container}>
      <SectionTitle title="חשבונות" icon="wallet" />
      <PieChart
        title="Total Accounts"
        total={totalAccounts}
        growth={accountsGrowth}
        data={currAccounts.map((acc) => ({
          label: acc.name,
          value: acc.balance,
        }))}
      />
      <FlatList
        data={currAccounts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <AccountItem
            account={item}
            prevAccount={prevAccounts?.find((acc) => acc.name === item.name) || null}
          />
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
