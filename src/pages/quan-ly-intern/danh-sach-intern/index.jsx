import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ButtonsComponent from "@components/button-component";
import TableComponent from "@components/table-component";
import { fetchListIntern } from "@redux/features/internSlice";
import { Button, message, Popconfirm, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InternManagement = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { listIntern, totalIntern, status } = useSelector(
    (state) => state.intern
  );

  //fetch list intern
  const getListIntern = async () => {
    await dispatch(fetchListIntern({ pageNumber: 1, pageSize: 10 }));
  };

  useEffect(() => {
    getListIntern();
  }, [dispatch]);
  console.table("intern", listIntern);

  //mở modal để tạo mới
  const handleAdd = () => {
    setIsModalVisible(true);
    setEditData(null);
  };

  // //chọn 1 hàng chỉnh sửa
  const handleEdit = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning("Vui lòng chọn một hàng cần sửa");
      return;
    }
    const editItem = listIntern.find((item) => item.id === selectedRowKeys[0]);
    setIsModalVisible(true);
    setEditData(editItem);
  };

  //Xoá
  const handleDelete = async (id) => {};

  //thêm sửa
  const handleSubmit = async () => {
    try {
      if (editData) {
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  //đóng modal
  const handleCancel = () => {};

  // Reset bảng
  const handleResetTable = () => {};

  const dataSource = listIntern.map((item, index) => ({
    key: item.id,
    firstName: item.firstName,

    stt: index + 1,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
    },
  ];

  const buttons = [
    {
      label: "Làm Mới",
      type: "primary",
      icon: <ReloadOutlined />,
      style: { background: "green", color: "white" },
      onClick: handleResetTable,
    },
    {
      label: "Thêm mới",
      type: "primary",
      icon: <PlusOutlined />,
      onClick: handleAdd,
    },
    {
      label: "Sửa",
      icon: <EditOutlined />,
      onClick: handleEdit,
      disabled: selectedRowKeys.length !== 1,
    },
    {
      render: () => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa không?"
          onConfirm={() => handleDelete(selectedRowKeys[0])}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button
            key="delete"
            type="default"
            danger
            icon={<DeleteOutlined />}
            loading={loading}
            disabled={selectedRowKeys.length !== 1 || loading}
          >
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <Spin spinning={loading}>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </Spin>

      <div
        style={{
          position: "fixed",
          bottom: 50,
          zIndex: 1000,
        }}
      >
        <ButtonsComponent buttons={buttons} />
      </div>
    </div>
  );
};

export default InternManagement;
