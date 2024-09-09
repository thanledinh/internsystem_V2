import React from "react";
import TabComponent from "./components/Tab-Component";
import CustomCard from "./components/Card-Component";
import ActionButtons from "./components/Button-Component";

const JobManagement = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "84vh" }}>
      {/* Tab Component */}
      {/* Main Content: Cards */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        <TabComponent />
        <CustomCard />
      </div>

      {/* Action Buttons */}
      <div style={{ flexShrink: 0 }}>
        <ActionButtons />
      </div>
    </div>
  );
};

export default JobManagement;
