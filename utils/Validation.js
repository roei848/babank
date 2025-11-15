export const validateForm = (title, month, incomes, expenses, accounts) => {
  const errors = [];
  const newInvalid = {
    title: false,
    month: false,
    incomes: [],
    expenses: [],
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
    const invalid = { name: false, total: false, majorExpenses: [] };

    if (!exp.name.trim()) {
      errors.push(`• Expense #${i + 1} is missing a payment method name.`);
      invalid.name = true;
    }

    if (!exp.total || isNaN(exp.total) || Number(exp.total) <= 0) {
      errors.push(`• Expense #${i + 1} has an invalid total amount.`);
      invalid.total = true;
    }

    // Validate major expenses inside this expense
    exp.majorExpenses.forEach((major, j) => {
      const invalidMajor = { label: false, amount: false };

      if (!major?.label?.trim()) {
        errors.push(
          `• Major Expense #${j + 1} inside Expense #${
            i + 1
          } is missing a label.`
        );
        invalidMajor.label = true;
      }

      if (!major?.amount || isNaN(major.amount) || Number(major.amount) <= 0) {
        errors.push(
          `• Major Expense #${j + 1} inside Expense #${
            i + 1
          } has an invalid amount.`
        );
        invalidMajor.amount = true;
      }

      invalid.majorExpenses[j] = invalidMajor;
    });

    newInvalid.expenses[i] = invalid;
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
