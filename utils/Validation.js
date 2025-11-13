export const validateForm = (
  title,
  month,
  incomes,
  expenses,
  majorExpenses,
  accounts
) => {
  const errors = [];
  const newInvalid = {
    title: false,
    month: false,
    incomes: [],
    expenses: [],
    majorExpenses: [],
    accounts: [],
  };

  // ---- General ----
  if (!title.trim()) {
    errors.push("• Title is required.");
    newInvalid.title = true;
  }
  if (!month.trim()) {
    errors.push("• Month is required.");
    newInvalid.month = true;
  }

  // ---- Minimum required sections ----
  if (incomes.length === 0) errors.push("• Please add at least one income.");
  if (expenses.length === 0) errors.push("• Please add at least one expense.");
  if (accounts.length === 0) errors.push("• Please add at least one account.");

  // ---- Incomes ----
  incomes.forEach((inc, i) => {
    const invalid = { amount: false, description: false };
    if (!inc.description.trim()) {
      errors.push(`• Income #${i + 1} is missing a description.`);
      invalid.description = true;
    }
    if (!inc.amount || isNaN(inc.amount) || Number(inc.amount) <= 0) {
      errors.push(`• Income #${i + 1} has invalid amount.`);
      invalid.amount = true;
    }
    newInvalid.incomes[i] = invalid;
  });

  // ---- Expenses ----
  expenses.forEach((exp, i) => {
    const invalid = { amount: false, description: false };
    if (!exp.description.trim()) {
      errors.push(`• Expense #${i + 1} is missing a description.`);
      invalid.description = true;
    }
    if (!exp.amount || isNaN(exp.amount) || Number(exp.amount) <= 0) {
      errors.push(`• Expense #${i + 1} has invalid amount.`);
      invalid.amount = true;
    }
    newInvalid.expenses[i] = invalid;
  });

  // ---- Major Expenses ----
  majorExpenses.forEach((exp, i) => {
    const invalid = { amount: false, description: false };
    if (!exp.description.trim()) {
      errors.push(`• Major Expense #${i + 1} is missing a description.`);
      invalid.description = true;
    }
    if (!exp.amount || isNaN(exp.amount) || Number(exp.amount) <= 0) {
      errors.push(`• Major Expense #${i + 1} has invalid amount.`);
      invalid.amount = true;
    }
    newInvalid.majorExpenses[i] = invalid;
  });

  // ---- Accounts ----
  accounts.forEach((acc, i) => {
    const invalid = { name: false, balance: false, location: false };
    if (!acc.name.trim()) {
      errors.push(`• Account #${i + 1} is missing a name.`);
      invalid.name = true;
    }
    if (!acc.balance || isNaN(acc.balance)) {
      errors.push(`• Account #${i + 1} has invalid balance.`);
      invalid.balance = true;
    }
    if (!acc.location) {
      errors.push(`• Account #${i + 1} is missing a location.`);
      invalid.location = true;
    }
    newInvalid.accounts[i] = invalid;
  });

  return { errors, newInvalid };
};
