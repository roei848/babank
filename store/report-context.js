// store/report-context.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import {
  addReport as saveReport,
  getUserReports,
  getReportById,
} from "../api/reportService";

// Create context
const ReportsContext = createContext();

// Custom hook to use the context
export const useReports = () => useContext(ReportsContext);

// Provider
const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load reports when user is logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getUserReports();
        setReports(data);
      } catch (error) {
        console.error("Error loading reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [auth.currentUser]);

  // Add new report
  const addReport = async (report) => {
    try {
      await saveReport(report);
      setReports((prev) => [...prev, report]);
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };

  // Refresh a single report (useful later for details screen)
  const refreshReport = async (reportId) => {
    try {
      const updated = await getReportById(reportId);
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? updated : r))
      );
    } catch (error) {
      console.error("Error refreshing report:", error);
    }
  };

  const value = {
    reports,
    loading,
    addReport,
    refreshReport,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsProvider;
