import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAllReports,
  saveReport,
  updateReport,
  deleteReport
} from "../api/reportService.js";

// Create context
const ReportsContext = createContext();

// Custom hook to use context
export const useReports = () => useContext(ReportsContext);

// Provider component
const ReportsProvider = ({ userId, children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all reports initially
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const data = await getAllReports(userId);
        setReports(data);
      } catch (err) {
        console.error("Error loading reports:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // Add new report
  const addReport = async (report) => {
    const id = await saveReport(userId, report);
    setReports((prev) => [...prev, { ...report, id }]);
  };

  // Update existing report
  const editReport = async (id, updatedFields) => {
    await updateReport(userId, id, updatedFields);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedFields } : r))
    );
  };

  // Delete report
  const removeReport = async (id) => {
    await deleteReport(userId, id);
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const value = {
    reports,
    loading,
    addReport,
    editReport,
    removeReport,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsProvider;