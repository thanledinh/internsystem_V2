import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const TabComponent = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        centered
        type="line"
        tabBarStyle={{
          borderRadius: "20px",
          backgroundColor: "#fff",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
        tabBarGutter={30}
        moreIcon={null}
      >
        <TabPane
          tab={
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#888",
              }}
            >
              Tất cả
            </span>
          }
          key="1"
        />
        <TabPane
          tab={
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#888",
              }}
            >
              Back-End
            </span>
          }
          key="2"
        />
        <TabPane
          tab={
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#888",
              }}
            >
              Front-End
            </span>
          }
          key="3"
        />
        <TabPane
          tab={
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#888",
              }}
            >
              Business Analyst
            </span>
          }
          key="4"
        />
        <TabPane
          tab={
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#888",
              }}
            >
              Marketing
            </span>
          }
          key="5"
        />
        <TabPane
          tab={
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#888",
              }}
            >
              Design
            </span>
          }
          key="6"
        />
      </Tabs>
    </div>
  );
};

export default TabComponent;
