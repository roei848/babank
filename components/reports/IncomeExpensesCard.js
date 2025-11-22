import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { Colors } from "../../constants/style";
import { formatNumberWithCommas } from "../../utils/helper";

const IncomeExpensesCard = ({ incomesTotal, expensesTotal }) => {
  return (
    <View style={styles.card}>
      {/* Income */}
      <View style={styles.section}>
        <View style={[styles.iconWrapper, { backgroundColor: Colors.success100 }]}>
          <FontAwesome5 name="piggy-bank" size={26} color={Colors.success500} />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.amount}>₪{formatNumberWithCommas(incomesTotal)}</Text>
          <Text style={styles.label}>הכנסות</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Expenses */}
      <View style={styles.section}>
        <View style={[styles.iconWrapper, { backgroundColor: Colors.error100 }]}>
          <Ionicons name="wallet" size={26} color={Colors.error500} />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.amount}>₪{formatNumberWithCommas(expensesTotal)}</Text>
          <Text style={styles.label}>הוצאות</Text>
        </View>
      </View>
    </View>
  );
};

export default IncomeExpensesCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    marginLeft: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary800,
  },
  label: {
    fontSize: 14,
    color: Colors.primary800,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: Colors.border,
    marginHorizontal: 14,
  },
});
