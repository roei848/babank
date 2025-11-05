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
  
  // Supporting classes
  class Outcome {
    constructor(amount, description) {
      this.amount = amount;
      this.description = description;
    }
  }
  
  class Account {
    constructor(balance, name, location) {
      this.balance = balance;
      this.name = name;
      this.location = location;
    }
  }
  
  // Main Report class
  class Report {
    constructor(date, title, month, incomes = [], expenses = [], majorExpenses = [], accounts = []) {
      this.date = date;
      this.title = title;
      this.month = month;
      this.incomes = incomes;
      this.expenses = expenses;
      this.majorExpenses = majorExpenses;
      this.accounts = accounts;
    }
  
    // --- Utility methods ---
    addIncome(amount, description) {
      this.incomes.push(new Outcome(amount, description));
    }
  
    addExpense(amount, description) {
      this.expenses.push(new Outcome(amount, description));
    }
  
    addMajorExpense(amount, description) {
      this.majorExpenses.push(new Outcome(amount, description));
    }
  
    addAccount(balance, name, location) {
      this.accounts.push(new Account(balance, name, location));
    }
  
    get totalIncome() {
      return this.incomes.reduce((sum, i) => sum + i.amount, 0);
    }
  
    get totalExpenses() {
      return this.expenses.reduce((sum, e) => sum + e.amount, 0);
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
        accounts: this.accounts.map(a => ({ name: a.name, balance: a.balance })),
      };
    }
  }
  
  export default Report;
  