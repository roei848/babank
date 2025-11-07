// reportService.js
import { collection, doc, addDoc, getDocs, getDoc, Timestamp } from "firebase/firestore";
import Report from "../models/Report";
import { db, auth } from "./firebaseConfig";

/**
 * Save a new report for the logged-in user
 * @param {Report} report - instance of Report class
 */
export async function addReport(report) {
  console.log("auth", auth);
  const user = auth.currentUser;
  console.log("user", user);
  if (!user) throw new Error("User not authenticated");

  const reportsRef = collection(db, "users", user.uid, "reports");
  console.log("reportsRef", reportsRef);
  await addDoc(reportsRef, {
    date: report.date,
    title: report.title,
    month: report.month,
    incomes: report.incomes,
    expenses: report.expenses,
    majorExpenses: report.majorExpenses,
    accounts: report.accounts,
    createdAt: Timestamp.now(),
  });
}

/**
 * Fetch all reports for the current user
 * @returns {Promise<Report[]>}
 */
export async function getUserReports() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const reportsRef = collection(db, "users", user.uid, "reports");
  const snapshot = await getDocs(reportsRef);

  const reports = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    // reconstruct a Report instance
    return new Report(
      data.date,
      data.title,
      data.month,
      data.incomes,
      data.expenses,
      data.majorExpenses,
      data.accounts
    );
  });

  return reports;
}

/**
 * Fetch a specific report by ID for the current user
 * @param {string} reportId
 * @returns {Promise<Report>}
 */
export async function getReportById(reportId) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const reportRef = doc(db, "users", user.uid, "reports", reportId);
  const snapshot = await getDoc(reportRef);

  if (!snapshot.exists()) {
    throw new Error("Report not found");
  }

  const data = snapshot.data();
  return new Report(
    data.date,
    data.title,
    data.month,
    data.incomes,
    data.expenses,
    data.majorExpenses,
    data.accounts
  );
}
