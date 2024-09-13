import { RedoOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import React from "react";

const TableComponent = ({
  rowKey,
  dataSource,
  columns,
  selectedRowKeys,
  setSelectedRowKeys,
  pagination,
  loading,
  selectionType = "radio",
}) => {
  const handleUncheckAll = () => {
    setSelectedRowKeys([]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      console.log(
        `selectedRowKeys: ${newSelectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    type: selectionType, // Use the selectionType prop here
    columnTitle: () => (
      <Tooltip title="Bỏ chọn tất cả">
        <RedoOutlined
          className="icon-reset-rad-btn"
          onClick={handleUncheckAll}
        />
      </Tooltip>
    ),
  };

  const handleRowClick = (record) => {
    const selectedKey = record[rowKey];
    if (selectionType === "radio") {
      setSelectedRowKeys([selectedKey]);
    } else {
      const newSelectedKeys = selectedRowKeys.includes(selectedKey)
        ? selectedRowKeys.filter((key) => key !== selectedKey)
        : [...selectedRowKeys, selectedKey];
      setSelectedRowKeys(newSelectedKeys);
    }
  };

  return (
    <Table
      size="small"
      scroll={{ y: "calc(100vh - 420px)", x: "calc(100vw - 100px)" }}
      bordered
      rowKey={rowKey}
      loading={loading}
      pagination={pagination}
      rowSelection={rowSelection}
      dataSource={dataSource}
      columns={columns}
      className="custom-scroll-table"
      tableLayout="fixed"
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
    />
  );
};

export default TableComponent;