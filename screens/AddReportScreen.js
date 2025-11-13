import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  InteractionManager,
} from "react-native";
import { Colors } from "../constants/style";

import GeneralInfoSection from "../components/addReportForm/GeneralInfoSection";
import IncomesSection from "../components/addReportForm/IncomesSection";
import ExpensesSection from "../components/addReportForm/ExpensesSection";
import MajorExpensesSection from "../components/addReportForm/MajorExpensesSection";
import AccountsSection from "../components/addReportForm/AccountsSection";
import { validateForm } from "../utils/Validation";

import { addReport } from "../api/reportService";
import Report, { LocationEnum } from "../models/Report";

// Enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AddReportScreen() {
  // ────────── State ──────────
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [majorExpenses, setMajorExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [invalidFields, setInvalidFields] = useState({
    title: false,
    month: false,
    incomes: [],
    expenses: [],
    majorExpenses: [],
    accounts: [],
  });

  const [expanded, setExpanded] = useState({
    general: false,
    incomes: false,
    expenses: false,
    majorExpenses: false,
    accounts: false,
  });

  const toggle = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
    setExpenses([...expenses, { amount: "", description: "" }]);
  const handleAddMajorExpense = () =>
    setMajorExpenses([...majorExpenses, { amount: "", description: "" }]);
  const handleAddAccount = () =>
    setAccounts([
      ...accounts,
      { balance: "", name: "", location: LocationEnum.OTZAR_HAYAL },
    ]);

  // ────────── Save Handler ──────────
  const handleSave = async () => {
    const { errors, newInvalid } =  validateForm(
      title,
      month,
      incomes,
      expenses,
      majorExpenses,
      accounts
    );

    console.log(errors, newInvalid);

    setInvalidFields(newInvalid);

    if (errors.length > 0) {
      alert(`Please fix the following issues:\n\n${errors.join("\n")}`);
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
        majorExpenses,
        accounts
      );
      await addReport(report);
      alert("Report saved successfully!");
    } catch (error) {
      alert("Error saving report: " + error.message);
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
        invalidItems={invalidFields.expenses}
      />

      <MajorExpensesSection
        expanded={expanded.majorExpenses}
        onToggle={() => toggle("majorExpenses")}
        majorExpenses={majorExpenses}
        onAdd={handleAddMajorExpense}
        onChange={(index, key, value) =>
          updateListItem(majorExpenses, setMajorExpenses, index, key, value)
        }
        onRemove={(index) =>
          removeListItem(majorExpenses, setMajorExpenses, index)
        }
        invalidItems={invalidFields.majorExpenses}
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Report</Text>
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
