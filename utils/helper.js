import dayjs from "dayjs";

export function formatFirestoreDate(inputDate) {
  if (!inputDate) return "";

  // Firestore Timestamp
  if (inputDate.seconds) {
    return dayjs(inputDate.seconds * 1000).format("DD/MM/YYYY");
  }

  // JS Date object or valid string
  return dayjs(inputDate).format("DD/MM/YYYY");
}

export function formatNumberWithCommas(value) {
  if (value === null || value === undefined) return "0";

  const num = Number(value);

  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US");
}


// export function getTotalAccounts(accounts) {
//   return accounts.reduce((sum, account) => sum + account.balance, 0);
// }

// export function getTotalIncome(incomes) {
//   return incomes.reduce((sum, income) => sum + income.amount, 0);
// }

// export function getTotalExpenses(expenses) {
//   return expenses.reduce((sum, expense) => sum + expense.total, 0);
// }