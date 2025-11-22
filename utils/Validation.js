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
    errors.push("• כותרת דו\"ח היא שדה חובה.");
    newInvalid.title = true;
  }
  if (!month.trim()) {
    errors.push("• חודש דו\"ח היא שדה חובה.");
    newInvalid.month = true;
  }

  // ---- Minimum required sections ----
  if (incomes.length === 0) errors.push("• אנא הוסיפו לפחות הכנסה אחת.");
  if (expenses.length === 0) errors.push("• אנא הוסיפו לפחות הוצאה אחת.");
  if (accounts.length === 0) errors.push("• אנא הוסיפו לפחות חשבון אחד.");

  // ---- Incomes ----
  incomes.forEach((inc, i) => {
    const invalid = { amount: false, description: false };
    if (!inc.description.trim()) {
      errors.push(`• הכנסה #${i + 1} חסרת תיאור.`);
      invalid.description = true;
    }
    if (!inc.amount || isNaN(inc.amount) || Number(inc.amount) <= 0) {
      errors.push(`• הכנסה #${i + 1} יש סכום שגוי.`);
      invalid.amount = true;
    }
    newInvalid.incomes[i] = invalid;
  });

  // ---- Expenses ----
  expenses.forEach((exp, i) => {
    const invalid = { name: false, total: false, majorExpenses: [] };

    if (!exp.name.trim()) {
      errors.push(`• הוצאה #${i + 1} חסרת שם שיטת תשלום.`);
      invalid.name = true;
    }

    if (!exp.total || isNaN(exp.total) || Number(exp.total) <= 0) {
      errors.push(`• הוצאה #${i + 1} יש סכום כולל שגוי.`);
      invalid.total = true;
    }

    // Validate major expenses inside this expense
    exp.majorExpenses.forEach((major, j) => {
      const invalidMajor = { label: false, amount: false };

      if (!major?.label?.trim()) {
        errors.push(
          `• הוצאה עיקרית #${j + 1} בתוך הוצאה #${
            i + 1
          } is missing a label.`
        );
        invalidMajor.label = true;
      }

      if (!major?.amount || isNaN(major.amount) || Number(major.amount) <= 0) {
        errors.push(
          `• הוצאה עיקרית #${j + 1} בתוך הוצאה #${
            i + 1
          } יש סכום שגוי.`
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
      errors.push(`• חשבון #${i + 1} חסר שם.`);
      invalid.name = true;
    }
    if (!acc.balance || isNaN(acc.balance)) {
      errors.push(`• חשבון #${i + 1} יש יתרה שגויה.`);
      invalid.balance = true;
    }
    if (!acc.location) {
      errors.push(`• חשבון #${i + 1} חסר מיקום.`);
      invalid.location = true;
    }
    newInvalid.accounts[i] = invalid;
  });

  return { errors, newInvalid };
};
