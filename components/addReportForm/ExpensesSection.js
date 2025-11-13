// components/report/ExpensesSection.js
import { View, StyleSheet } from "react-native";
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
  invalidItems,
}) {
  return (
    <>
      <SectionHeader title="Expenses" expanded={expanded} onPress={onToggle} />
      <Collapsible collapsed={!expanded}>
        <View style={styles.sectionContent}>
          {expenses.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Input
                label="Description"
                value={item.description}
                onUpdateValue={(val) => onChange(index, "description", val)}
                style={styles.description}
                isInvalid={invalidItems[index]?.description || false}
              />
              <Input
                amount
                label="Amount"
                keyboardType="numeric"
                value={item.amount}
                onUpdateValue={(val) => onChange(index, "amount", val)}
                style={styles.amount}
                isInvalid={invalidItems[index]?.amount || false}
              />
              <RemoveButton onPress={() => onRemove(index)} />
            </View>
          ))}

          <AddButton onPress={onAdd} label="Add Expense" />
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
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },
  description: {
    flex: 6,
  },
  amount: {
    flex: 4,
  },
});
