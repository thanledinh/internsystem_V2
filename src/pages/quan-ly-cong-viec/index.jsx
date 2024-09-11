import React from "react";
import TabComponent from "./components/Tab-Component";
import CustomCard from "./components/Card-Component";
import ActionButtons from "./components/Button-Component";
import CustomPagination from "./components/Pagination-Component";

const JobManagement = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "84vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        <TabComponent />
        <CustomCard />
      </div>
      <div style={{ flexShrink: 0 }}>
        <ActionButtons />
      </div>
    </div>
  );
};

export default JobManagement;
