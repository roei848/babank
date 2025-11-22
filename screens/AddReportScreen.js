import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from "react-native";

import Report, { LocationEnum } from "../models/Report";
import IncomesSection from "../components/addReportForm/IncomesSection";
import ExpensesSection from "../components/addReportForm/ExpensesSection";
import AccountsSection from "../components/addReportForm/AccountsSection";
import GeneralInfoSection from "../components/addReportForm/GeneralInfoSection";
import { Colors } from "../constants/style";
import { validateForm } from "../utils/validation";
import { useReports } from "../store/report-context";

export default function AddReportScreen({ navigation }) {
  const { addReport } = useReports();

  // ────────── State ──────────
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [invalidFields, setInvalidFields] = useState({
    title: false,
    month: false,
    incomes: [],
    expenses: [],
    accounts: [],
  });

  const [expanded, setExpanded] = useState({
    general: false,
    incomes: false,
    expenses: false,
    accounts: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    // Small delay to let the Collapsible measure its content properly
    InteractionManager.runAfterInteractions(() => {
      setExpanded((prev) => ({ ...prev, general: true }));
    });
  }, []);

  const updateListItem = (list, setList, index, key, value) => {
    const updated = [...list];
    updated[index][key] = value;
    setList(updated);
  };

  const removeListItem = (list, setList, index) => {
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
  };

  // ────────── Add Handlers ──────────
  const handleAddIncome = () =>
    setIncomes([...incomes, { amount: "", description: "" }]);
  const handleAddExpense = () =>
    setExpenses([
      ...expenses,
      { id: Date.now().toString(), name: "", total: "", majorExpenses: [] },
    ]);

  const handleAddAccount = () =>
    setAccounts([
      ...accounts,
      { balance: "", name: "", location: LocationEnum.OTZAR_HAYAL },
    ]);

  const handleAddMajor = (expenseIndex) => {
    const updated = [...expenses];

    updated[expenseIndex] = {
      ...updated[expenseIndex],
      majorExpenses: [
        ...(updated[expenseIndex].majorExpenses || []),
        { id: Date.now().toString(), label: "", amount: "" },
      ],
    };

    setExpenses(updated);
  };

  const handleChangeMajor = (expenseIndex, majorIndex, key, value) => {
    const updated = [...expenses];

    const majorExpensesCopy = [...updated[expenseIndex].majorExpenses];
    const updatedMajor = { ...majorExpensesCopy[majorIndex], [key]: value };
    majorExpensesCopy[majorIndex] = updatedMajor;

    updated[expenseIndex] = {
      ...updated[expenseIndex],
      majorExpenses: majorExpensesCopy,
    };

    setExpenses(updated);
  };

  const handleRemoveMajor = (expenseIndex, majorIndex) => {
    const updated = [...expenses];

    const majorExpensesCopy = updated[expenseIndex].majorExpenses.filter(
      (_, i) => i !== majorIndex
    );

    updated[expenseIndex] = {
      ...updated[expenseIndex],
      majorExpenses: majorExpensesCopy,
    };

    setExpenses(updated);
  };

  // ────────── Save Handler ──────────
  const handleSave = async () => {
    setIsSaving(true);
    const { errors, newInvalid } = validateForm(
      title,
      month,
      incomes,
      expenses,
      accounts
    );

    setInvalidFields(newInvalid);

    if (errors.length > 0) {
      alert(`אנא תקן את הבעיות הבאות:\n\n${errors.join("\n")}`);
      setIsSaving(false);
      return;
    }

    // ---- Save if valid ----
    try {
      const report = new Report(
        new Date(),
        title,
        month,
        incomes,
        expenses,
        accounts
      );
      await addReport(report);
      navigation.navigate("TabNavigator", { screen: "Home" });
      alert("דו\"ח נשמר בהצלחה!");
    } catch (error) {
      alert("שגיאה בשמירת הדו\"ח: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ────────── Render ──────────
  return (
    <ScrollView style={styles.container}>
      <GeneralInfoSection
        expanded={expanded.general}
        onToggle={() => toggle("general")}
        title={title}
        month={month}
        onChangeTitle={setTitle}
        onChangeMonth={setMonth}
        invalidTitle={invalidFields.title}
        invalidMonth={invalidFields.month}
      />

      <IncomesSection
        expanded={expanded.incomes}
        onToggle={() => toggle("incomes")}
        incomes={incomes}
        onAdd={handleAddIncome}
        onChange={(index, key, value) =>
          updateListItem(incomes, setIncomes, index, key, value)
        }
        onRemove={(index) => removeListItem(incomes, setIncomes, index)}
        invalidItems={invalidFields.incomes}
      />

      <ExpensesSection
        expanded={expanded.expenses}
        onToggle={() => toggle("expenses")}
        expenses={expenses}
        onAdd={handleAddExpense}
        onChange={(index, key, value) =>
          updateListItem(expenses, setExpenses, index, key, value)
        }
        onRemove={(index) => removeListItem(expenses, setExpenses, index)}
        onChangeMajor={handleChangeMajor}
        onAddMajor={handleAddMajor}
        onRemoveMajor={handleRemoveMajor}
        invalidItems={invalidFields.expenses}
      />

      <AccountsSection
        expanded={expanded.accounts}
        onToggle={() => toggle("accounts")}
        accounts={accounts}
        onAdd={handleAddAccount}
        onChange={(index, key, value) =>
          updateListItem(accounts, setAccounts, index, key, value)
        }
        onRemove={(index) => removeListItem(accounts, setAccounts, index)}
        invalidItems={invalidFields.accounts}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? "שומר..." : "שמירת דו\"ח"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  saveButton: {
    backgroundColor: Colors.primary500,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
