import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/style";
import { formatNumberWithCommas } from "../../utils/helper";

const Income = ({ income }) => {
  return (
    <View style={styles.container}>
      {/* Right side → description */}
      <Text style={styles.description}>{income.description}</Text>

      {/* Left side → amount */}
      <Text style={styles.amount}>
        {formatNumberWithCommas(income.amount)} ₪
      </Text>
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 6,
  },

  description: {
    fontSize: 15,
    color: Colors.primary800,
    fontWeight: "600",
    maxWidth: "70%",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.accent800, // mint tone to match style
  },
});
