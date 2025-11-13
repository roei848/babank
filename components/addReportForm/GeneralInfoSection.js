// components/report/GeneralInfoSection.js
import { View, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import Input from "../ui/Input";
import SelectInput from "../ui/SelectInput";
import SectionHeader from "./SectionHeader";
import { Colors } from "../../constants/style";
import { MonthEnum } from "../../models/Report";

export default function GeneralInfoSection({
  expanded,
  onToggle,
  title,
  month,
  onChangeTitle,
  onChangeMonth,
  invalidTitle,
  invalidMonth,
}) {
  return (
    <>
      <SectionHeader
        title="General Info"
        expanded={expanded}
        onPress={onToggle}
      />
      <Collapsible collapsed={!expanded}>
        <View style={styles.sectionContent}>
          <Input
            style={styles.input}
            label="Title"
            value={title}
            onUpdateValue={onChangeTitle}
            isInvalid={invalidTitle}
          />
          <SelectInput
            style={styles.selectInput}
            label="Month"
            value={month}
            onValueChange={onChangeMonth}
            isInvalid={invalidMonth}
            items={Object.values(MonthEnum).map((m) => ({
              label: m.charAt(0) + m.slice(1).toLowerCase(),
              value: m,
            }))}
          />
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
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  input: {
    flex: 2,
  },
  selectInput: {
    flex: 1,
  },
});
