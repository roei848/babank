// components/report/MajorExpensesSection.js
import { View, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

import Input from "../ui/Input";
import SectionHeader from "./SectionHeader";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";
import { Colors } from "../../constants/style";

export default function MajorExpensesSection({
  expanded,
  onToggle,
  majorExpenses,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <>
      <SectionHeader
        title="Major Expenses"
        expanded={expanded}
        onPress={onToggle}
      />
      <Collapsible collapsed={!expanded}>
        <View style={styles.sectionContent}>
          {majorExpenses.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Input
                label="Description"
                value={item.description}
                onUpdateValue={(val) => onChange(index, "description", val)}
                style={styles.description}
              />
              <Input
                amount
                label={`Amount`}
                keyboardType="numeric"
                value={item.amount}
                onUpdateValue={(val) => onChange(index, "amount", val)}
                style={styles.amount}
              />
              <RemoveButton onPress={() => onRemove(index)} />
            </View>
          ))}

          <AddButton onPress={onAdd} label="Add Major Expense" />
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
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addBtnText: {
    marginLeft: 6,
    color: Colors.accent800,
    fontWeight: "600",
  },
  removeBtn: {
    alignSelf: "flex-end",
    marginTop: 4,
  },
  description: {
    flex: 6,
  },
  amount: {
    flex: 4,
  },
});
