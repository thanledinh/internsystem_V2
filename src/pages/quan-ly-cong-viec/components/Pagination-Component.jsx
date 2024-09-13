import React from "react";
import { Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CustomPagination = () => {
  const onChange = (page, pageSize) => {
    console.log("Current page:", page);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f8fa",
        padding: "10px 20px",
        borderRadius: "12px",
      }}
    >
      <Pagination
        total={56}
        defaultCurrent={1}
        pageSize={5}
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            return (
              <div
                style={{
                  backgroundColor: "#f7f8fa",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  padding: "5px",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
              >
                <LeftOutlined style={{ color: "#555" }} />
              </div>
            );
          }
          if (type === "next") {
            return (
              <div
                style={{
                  backgroundColor: "#f7f8fa",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  padding: "5px",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
              >
                <RightOutlined style={{ color: "#555" }} />
              </div>
            );
          }
          return originalElement;
        }}
        onChange={onChange}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default CustomPagination;
