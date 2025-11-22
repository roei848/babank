import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/style";
import { formatNumberWithCommas } from "../../utils/helper";

const Expense = ({ expense }) => {
  const { name, total, majorExpenses } = expense;

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.total}>{formatNumberWithCommas(total)} ₪</Text>
      </View>

      {/* Major expenses breakdown */}
      {majorExpenses?.length > 0 && (
        <View style={styles.majorContainer}>
          <Text style={styles.majorTitle}>הוצאות גדולות:</Text>

          {majorExpenses.map((item) => (
            <View key={item.id} style={styles.majorItemRow}>
              <Text style={styles.bullet}>•</Text>

              <Text style={styles.majorItemText}>
                {item.label}: {formatNumberWithCommas(item.amount)} ₪
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary800,
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.error500, // Expenses → red by default
  },

  majorContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  majorTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary800,
    marginBottom: 6,
    alignSelf: "flex-start",
  },

  majorItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  bullet: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary800,
    marginHorizontal: 6,
  },

  majorItemText: {
    fontSize: 14,
    color: Colors.primary800,
  },
});
