import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import Report from "../models/Report";
import { auth, db } from "../api/firebaseConfig";
import { addReport as saveReport } from "../api/reportService";

// Create context
const ReportsContext = createContext();

// Custom hook
export const useReports = () => useContext(ReportsContext);

// Provider
const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    // ✅ Create query to user's reports collection, ordered by date
    const reportsRef = collection(db, "users", user.uid, "reports");
    const q = query(reportsRef, orderBy("createdAt", "desc"));

    // ✅ Subscribe to Firestore changes
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reportsData = snapshot.docs.map((doc) =>
          Report.fromFirestore({ id: doc.id, ...doc.data() })
        );        
        setReports(reportsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to reports:", error);
        setLoading(false);
      }
    );

    // ✅ Cleanup when component unmounts or user logs out
    return () => unsubscribe();
  }, [auth.currentUser]);

  // Add new report
  const addReport = async (report) => {
    try {
      await saveReport(report);
    } catch (error) {
      console.error("Error adding report:", error);
      throw error;
    }
  };

  const value = {
    reports,
    loading,
    addReport,
  };

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
};

export default ReportsProvider;
