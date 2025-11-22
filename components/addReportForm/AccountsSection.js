import { View, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

import Input from "../ui/Input";
import SelectInput from "../ui/SelectInput";
import SectionHeader from "./SectionHeader";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";
import { Colors } from "../../constants/style";
import { LocationEnum } from "../../models/Report";

export default function AccountsSection({
  expanded,
  onToggle,
  accounts,
  onAdd,
  onChange,
  onRemove,
  invalidItems,
}) {
  return (
    <>
      <SectionHeader title="חשבונות" expanded={expanded} onPress={onToggle} />
      <Collapsible collapsed={!expanded}>
        <View style={styles.sectionContent}>
          {accounts.map((item, index) => (
            <View key={index} style={styles.accountBlock}>
              {/* Row 1 — Name + Balance */}
              <View style={styles.row}>
                <Input
                  label="שם חשבון"
                  value={item.name}
                  onUpdateValue={(val) => onChange(index, "name", val)}
                  style={styles.nameInput}
                  isInvalid={invalidItems[index]?.name || false}
                />
                <Input
                  label="יתרה"
                  amount
                  keyboardType="numeric"
                  value={item.balance}
                  onUpdateValue={(val) => onChange(index, "balance", val)}
                  style={styles.balanceInput}
                  isInvalid={invalidItems[index]?.balance || false}
                />
              </View>

              {/* Row 2 — Location + Remove */}
              <View style={styles.row}>
                <SelectInput
                  label="מיקום"
                  value={item.location}
                  onValueChange={(val) => onChange(index, "location", val)}
                  items={Object.values(LocationEnum).map((loc) => ({
                    label: loc,
                    value: loc,
                  }))}
                  style={styles.locationInput}
                  isInvalid={invalidItems[index]?.location || false}
                />
                <RemoveButton onPress={() => onRemove(index)} />
              </View>
            </View>
          ))}

          <AddButton onPress={onAdd} label="הוספת חשבון" />
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
  accountBlock: {
    marginBottom: 16,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  nameInput: {
    flex: 6,
  },
  balanceInput: {
    flex: 4,
  },
  locationInput: {
    flex: 1,
  },
});
