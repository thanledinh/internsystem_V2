import React from "react";
import TabComponent from "./components/Tab-Component";
import CustomCard from "./components/Card-Component";
import ActionButtons from "./components/Button-Component";

const JobManagement = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Job Management</h2>

      {/* Tab Component */}
      <div
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgb a(0, 0, 0, 0.1)',
          padding: '20px',
          backgroundColor: '#fff',
          marginBottom: '20px',
        }}
      >
        <TabComponent />
      </div>

      {/* Main Content: Buttons and Cards together in one box */}
      <div
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        {/* Action Buttons and Custom Card inside the same box */}
        <CustomCard />
        <ActionButtons />
      </div>
    </div>
  );
};

export default JobManagement;
