import { View, Text, StyleSheet } from "react-native";
import { formatNumberWithCommas } from "../../utils/helper";
import { Colors } from "../../constants/style";

const AccountItem = ({ account, prevAccount }) => {
  const growth = prevAccount ? account.balance - prevAccount.balance : 0;

  const growthText =
    growth > 0
      ? `▲ ${formatNumberWithCommas(growth)} ₪`
      : growth < 0
        ? `▼ ${formatNumberWithCommas(Math.abs(growth))} ₪`
        : "0";

  const growthColor = growth > 0 ? Colors.success500 : growth < 0 ? Colors.error500 : Colors.gray;

  return (
    <View style={styles.container}>
      {/* RIGHT SIDE — name + location */}
      <View style={styles.infoSection}>
        <Text style={styles.name}>{account.name}</Text>
        <Text style={styles.location}>({account.location})</Text>
      </View>

      {/* LEFT SIDE — balance + growth under it */}
      <View style={styles.balanceSection}>
        <Text style={styles.balance}>
          {formatNumberWithCommas(account.balance)} ₪
        </Text>

        <Text style={[styles.growth, { color: growthColor }]}>
          {growthText}
        </Text>
      </View>
    </View>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 6,
  },

  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary800,
  },

  location: {
    fontSize: 14,
    color: Colors.gray,
  },

  balanceSection: {
    alignItems: "flex-start",
  },

  balance: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary800,
  },

  growth: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: "600",
  },
});
