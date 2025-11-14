// Enums converted to plain JS objects
export const MonthEnum = {
  JANUARY: "JANUARY",
  FEBRUARY: "FEBRUARY",
  MARCH: "MARCH",
  APRIL: "APRIL",
  MAY: "MAY",
  JUNE: "JUNE",
  JULY: "JULY",
  AUGUST: "AUGUST",
  SEPTEMBER: "SEPTEMBER",
  OCTOBER: "OCTOBER",
  NOVEMBER: "NOVEMBER",
  DECEMBER: "DECEMBER",
};

export const LocationEnum = {
  OTZAR_HAYAL: "OTZAR_HAYAL",
  ANALYST: "ANALYST",
  MEITAV: "MEITAV",
  CLAL: "CLAL",
};

export const LocationTitleMap = {
  [LocationEnum.OTZAR_HAYAL]: "Otzar Hayal",
  [LocationEnum.ANALYST]: "Analyst Brokerage",
  [LocationEnum.MEITAV]: "Meitav Fund",
  [LocationEnum.CLAL]: "Clal Insurance",
};

// -------------------------
// Supporting classes
// -------------------------

export class Income {
  constructor(description, amount) {
    this.description = description;
    this.amount = amount;
  }
}

// Represents a major purchase inside a credit card
export class MajorExpense {
  constructor(label, amount) {
    this.label = label;
    this.amount = amount;
  }
}

// Represents a credit card expense
export class Expense {
  constructor(name, total, majorExpenses = []) {
    this.name = name; // e.g. "Visa"
    this.total = total; // monthly total amount
    this.majorExpenses = majorExpenses; // array of MajorExpense
  }

  addMajorExpense(label, amount) {
    this.majorExpenses.push(new MajorExpense(label, amount));
  }
}

export class Account {
  constructor(balance, name, location) {
    this.balance = balance;
    this.name = name;
    this.location = location;
  }
}

// -------------------------
// Main Report class
// -------------------------

class Report {
  constructor(date, title, month, incomes = [], expenses = [], accounts = []) {
    this.date = date;
    this.title = title;
    this.month = month;

    this.incomes = incomes;
    this.expenses = expenses;
    this.accounts = accounts;
  }

  // -------------------------
  // Utility methods
  // -------------------------

  addIncome(description, amount) {
    this.incomes.push(new Income(description, amount));
  }

  // Creates a expense entry
  addExpense(name, total) {
    this.expenses.push(new Expense(name, total));
  }

  // Adds a major purchase into a specific credit card
  addMajorExpenseToExpense(expenseName, label, amount) {
    const expense = this.expenses.find((c) => c.name === expenseName);
    if (!expense) throw new Error(`Expense '${expenseName}' not found`);
    expense.addMajorExpense(label, amount);
  }

  addAccount(balance, name, location) {
    this.accounts.push(new Account(balance, name, location));
  }

  // Computed totals
  get totalIncome() {
    return this.incomes.reduce((sum, i) => sum + i.amount, 0);
  }

  get totalExpenses() {
    return this.expenses.reduce((sum, c) => sum + c.total, 0);
  }

  get netResult() {
    return this.totalIncome - this.totalExpenses;
  }

  summary() {
    return {
      title: this.title,
      month: this.month,
      totalIncome: this.totalIncome,
      totalExpenses: this.totalExpenses,
      netResult: this.netResult,
      accounts: this.accounts.map((a) => ({
        name: a.name,
        balance: a.balance,
      })),
    };
  }
}

export default Report;
