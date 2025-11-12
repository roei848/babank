// components/report/AccountsSection.js
import { View, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

import Input from "../ui/Input";
import SelectInput from "../ui/SelectInput";
import SectionHeader from "./SectionHeader";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";
import { Colors } from "../../constants/style";
import { LocationEnum, LocationTitleMap } from "../../models/Report";

export default function AccountsSection({
  expanded,
  onToggle,
  accounts,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <>
      <SectionHeader title="Accounts" expanded={expanded} onPress={onToggle} />
      <Collapsible collapsed={!expanded}>
        <View style={styles.sectionContent}>
          {accounts.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Input
                label="Account Name"
                value={item.name}
                onUpdateValue={(val) => onChange(index, "name", val)}
              />
              <Input
                label="Balance"
                value={item.balance}
                keyboardType="numeric"
                onUpdateValue={(val) => onChange(index, "balance", val)}
              />
              <SelectInput
                label="Location"
                value={item.location}
                onValueChange={(val) => onChange(index, "location", val)}
                items={Object.values(LocationEnum).map((loc) => ({
                  label: LocationTitleMap[loc],
                  value: loc,
                }))}
              />
              <RemoveButton onPress={() => onRemove(index)} />
            </View>
          ))}
          <AddButton onPress={onAdd} label="Add Account" />
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
    marginBottom: 12,
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
});
