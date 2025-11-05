// reportService.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import db from "./firebaseConfig.js";
import Report from "../models/Report.js";
/**
 * Save a new report to Firestore
 * @param {string} userId - ID of the user
 * @param {Report} report - Report instance
 * @returns {Promise<string>} Firestore document ID
 */
export async function saveReport(userId, report) {
  try {
    const reportsRef = collection(db, "users", userId, "reports");
    const docRef = await addDoc(reportsRef, {
      date: report.date,
      title: report.title,
      month: report.month,
      incomes: report.incomes,
      expenses: report.expenses,
      majorExpenses: report.majorExpenses,
      accounts: report.accounts,
    });
    console.log("Report saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving report:", error);
    throw error;
  }
}

/**
 * Fetch all reports for a given user
 * @param {string} userId - ID of the user
 * @returns {Promise<Report[]>}
 */
export async function getAllReports(userId) {
  try {
    const reportsRef = collection(db, "users", userId, "reports");
    const snapshot = await getDocs(reportsRef);
    const reports = snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Report(
        data.date.toDate ? data.date.toDate() : data.date,
        data.title,
        data.month,
        data.incomes,
        data.expenses,
        data.majorExpenses,
        data.accounts
      );
    });
    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}

/**
 * Fetch reports by month
 * @param {string} userId - ID of the user
 * @param {string} month - MonthEnum value
 * @returns {Promise<object[]>}
 */
export async function getReportsByMonth(userId, month) {
  try {
    const reportsRef = collection(db, "users", userId, "reports");
    const q = query(reportsRef, where("month", "==", month));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching reports by month:", error);
    throw error;
  }
}

/**
 * Fetch a single report by ID
 * @param {string} userId - ID of the user
 * @param {string} reportId - Firestore document ID
 * @returns {Promise<object|null>}
 */
export async function getReportById(userId, reportId) {
  try {
    const docRef = doc(db, "users", userId, "reports", reportId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log("No report found with that ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw error;
  }
}

/**
 * Update an existing report
 * @param {string} userId - ID of the user
 * @param {string} reportId - Firestore document ID
 * @param {object} updatedFields - Partial fields to update
 */
export async function updateReport(userId, reportId, updatedFields) {
  try {
    const reportRef = doc(db, "users", userId, "reports", reportId);
    await updateDoc(reportRef, updatedFields);
    console.log("Report updated successfully!");
  } catch (error) {
    console.error("Error updating report:", error);
    throw error;
  }
}

/**
 * Delete a report by ID
 * @param {string} userId - ID of the user
 * @param {string} reportId - Firestore document ID
 */
export async function deleteReport(userId, reportId) {
  try {
    const reportRef = doc(db, "users", userId, "reports", reportId);
    await deleteDoc(reportRef);
    console.log("Report deleted successfully!");
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
}
