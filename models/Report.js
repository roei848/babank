// Enums converted to plain JS objects
export const MonthEnum = {
  JANUARY: "ינואר",
  FEBRUARY: "פברואר",
  MARCH: "מרץ",
  APRIL: "אפריל",
  MAY: "מאי",
  JUNE: "יוני",
  JULY: "יולי",
  AUGUST: "אוגוסט",
  SEPTEMBER: "ספטמבר",
  OCTOBER: "אוקטובר",
  NOVEMBER: "נובמבר",
  DECEMBER: "דצמבר",
};


export const LocationEnum = {
  OTZAR_HAYAL: "אוצר החייל",
  ANALYST: "אנליסט",
  MEITAV: "מיטב דש",
  CLAL: "כלל ביטוח",
  PHOENIX: "הפניקס",
  ALTSHULER: "אלטשולר שחם",
  OTHER: "אחר",
};

export const AccountNameEnum = {
  CHECKING_ACCOUNT: "עו״ש",
  MONEY_MARKET_FUND: "קרן כספית",
  BANK_GUARANTEE: "ערבות בנקאית",
  PROVIDENT_FUND: "קופת גמל",
  EDUCATION_FUND: "קרן השתלמות",
  INVESTMENTS: "השקעות",
  PENSION: "פנסיה",
  FIXED_DEPOSIT: "פיקדון",
  FOREIGN_CURRENCY: "חשבון מט״ח",
  OTHER: "אחר",
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

  get totalAccounts() {
    return this.accounts.reduce((sum, a) => sum + a.balance, 0);
  }

  get netResult() {
    return this.totalIncome - this.totalExpenses;
  }

  static fromFirestore(data) {
    const incomes = Array.isArray(data.incomes)
      ? data.incomes.map((i) => new Income(i.description, i.amount))
      : [];

    const expenses = Array.isArray(data.expenses)
      ? data.expenses.map((e) => {
          const majorExpenses = Array.isArray(e.majorExpenses)
            ? e.majorExpenses.map((m) => new MajorExpense(m.label, m.amount))
            : [];
          return new Expense(e.name, e.total, majorExpenses);
        })
      : [];

    const accounts = Array.isArray(data.accounts)
      ? data.accounts.map((a) => new Account(a.balance, a.name, a.location))
      : [];

      const report = new Report(
        data.date,
        data.title,
        data.month,
        incomes,
        expenses,
        accounts
      );
    
      // Attach Firestore document ID
      report.id = data.id || null;
    
      return report;
  }

  summary() {
    return {
      title: this.title,
      month: this.month,
      totalIncome: this.totalIncome,
      totalExpenses: this.totalExpenses,
      totalAccounts: this.totalAccounts,
      netResult: this.netResult,
      accounts: this.accounts.map((a) => ({
        name: a.name,
        balance: a.balance,
      })),
    };
  }
}

export default Report;
