// components/report/ExpensesSection.js
import { View, Text, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

import Input from "../ui/Input";
import SectionHeader from "./SectionHeader";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";
import { Colors } from "../../constants/style";

export default function ExpensesSection({
  expanded,
  onToggle,
  expenses,
  onAdd,
  onChange,
  onRemove,
  onChangeMajor,
  onAddMajor,
  onRemoveMajor,
  invalidItems,
}) {
  return (
    <>
      <SectionHeader title="הוצאות" expanded={expanded} onPress={onToggle} />
      <Collapsible collapsed={!expanded}>
        <View style={styles.sectionContent}>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseBlock}>
              
              {/* Payment Method Row */}
              <View style={styles.itemRow}>
                <Input
                  label="שיטת תשלום"
                  value={expense.name}
                  onUpdateValue={(val) => onChange(index, "name", val)}
                  style={styles.paymentMethod}
                  isInvalid={invalidItems[index]?.name || false}
                />

                <Input
                  amount
                  label="סכום כולל"
                  keyboardType="numeric"
                  value={expense.total}
                  onUpdateValue={(val) => onChange(index, "total", val)}
                  style={styles.amount}
                  isInvalid={invalidItems[index]?.total || false}
                />

                <RemoveButton onPress={() => onRemove(index)} />
              </View>

              {/* Major Expenses List */}
              <Text style={styles.majorTitle}>הוצאות עיקריות</Text>

              {expense.majorExpenses?.map((me, meIndex) => (
                <View key={meIndex} style={styles.majorRow}>
                  <Input
                    label="תיאור"
                    value={me.label}
                    onUpdateValue={(val) =>
                      onChangeMajor(index, meIndex, "label", val)
                    }
                    style={styles.majorLabel}
                    isInvalid={
                      invalidItems[index]?.majorExpenses?.[meIndex]?.label ||
                      false
                    }
                  />

                  <Input
                    amount
                    label="סכום"
                    keyboardType="numeric"
                    value={me.amount}
                    onUpdateValue={(val) =>
                      onChangeMajor(index, meIndex, "amount", val)
                    }
                    style={styles.majorAmount}
                    isInvalid={
                      invalidItems[index]?.majorExpenses?.[meIndex]?.amount ||
                      false
                    }
                  />

                  <RemoveButton
                    onPress={() => onRemoveMajor(index, meIndex)}
                  />
                </View>
              ))}

              {/* Add Major Expense Button */}
              <AddButton
                onPress={() => onAddMajor(index)}
                label="הוספת הוצאה עיקרית"
              />
            </View>
          ))}

          {/* Add Expense */}
          <AddButton onPress={onAdd} label="הוספת הוצאה" />
        </View>
      </Collapsible>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContent: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  expenseBlock: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray300,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },

  paymentMethod: {
    flex: 6,
  },

  amount: {
    flex: 4,
  },

  majorTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  majorRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
    gap: 12,
  },

  majorLabel: {
    flex: 6,
  },

  majorAmount: {
    flex: 4,
  },
});
