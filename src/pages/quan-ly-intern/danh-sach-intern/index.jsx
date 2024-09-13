import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, message, Spin, Checkbox, Modal } from "antd";
import ButtonsComponent from "@components/button-component";
import TableComponent from "@components/table-component";
import {
  fetchListIntern,
  addIntern,
  updateIntern,
  deleteIntern,
  fetchListInternship,
  fetchListSchool,
} from "@redux/features/internSlice";
import { formatDateDisplay } from "@utils/dateFormat.js";
import DeleteConfirmModal from "./components/modals/DeleteConfirmModal";
import InternForm from "./components/modals/InternForm";
import InternDetailModal from "./components/modals/InternDetailModal"; // NEW

const InternManagement = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Control delete modal
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [viewData, setViewData] = useState(null); // NEW
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); // NEW

  const { listIntern, listInternship, listSchool, totalIntern, status } =
    useSelector((state) => state.intern);

  // Fetch list of interns
  const getListIntern = async () => {
    await dispatch(fetchListIntern({ pageNumber: 1, pageSize: 10 }));
  };

  useEffect(() => {
    getListIntern();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListInternship());
    dispatch(fetchListSchool());
  }, [dispatch]);

  // Add row
  const handleAdd = () => {
    setIsModalVisible(true);
    setEditData(null);
  };

  // Editable when click 1 row
  const handleEdit = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning("Vui lòng chọn một hàng cần sửa");
      return;
    }
    const editItem = listIntern.find((item) => item.id === selectedRowKeys[0]);
    setIsModalVisible(true);
    setEditData(editItem);
  };

  // Trigger delete modal instead of Popconfirm
  const handleDeleteClick = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn một hàng cần xóa");
      return;
    }
    setIsDeleteModalVisible(true);
  };

  // Delete 1 row
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await dispatch(deleteIntern(id)).unwrap();
      getListIntern();
      setSelectedRowKeys([]);
      message.success("Xóa thành công");
    } catch (error) {
    } finally {
      setLoading(false);
      setIsDeleteModalVisible(false); // Close delete modal after deletion
    }
  };

  // Add or edit row
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editData) {
        await dispatch(
          updateIntern({ id: editData.id, data: values })
        ).unwrap();
        message.success("Cập nhật thành công");
      } else {
        await dispatch(addIntern(values)).unwrap();
        message.success("Thêm mới thành công");
      }

      getListIntern();
      setIsModalVisible(false);
      setSelectedRowKeys([]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleView = (intern) => {
    setViewData(intern);
    setIsViewModalVisible(true);
  };

  const handleEditFromDetail = () => {
    setIsViewModalVisible(false);
    setIsModalVisible(true);
    setEditData(viewData);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewData(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowKeys([]);
  };

  const handleResetTable = () => {
    setSelectedRowKeys([]);
    setIsSelectAll(false);
    getListIntern();
  };

  const handleSelectAll = (e) => {
    const allKeys = listIntern.map((item) => item.id);
    if (e.target.checked) {
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
    setIsSelectAll(e.target.checked);
  };

  const dataSource = listIntern.map((item, index) => ({
    id: item.id,
    key: item.id,
    group: item.group,
    fullName: item.lastName + " " + item.firstName,
    dob: formatDateDisplay(item.birthday),
    phoneNumber: item.phoneNumber,
    position: item.desiredPosition,
    school: item.school?.name,
    email: item.personalEmail,
    cv: item.linkCv,
    comments: "",
    role: item.role,
    project: "",
    mentor: "",
    status: item.status,
    reportProcess: "",
    stt: index + 1,
  }));

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 80, ellipsis: true, align: "center" },
    { title: "Nhóm", dataIndex: "group", key: "group", width: 120, ellipsis: true, align: "center" },
    { title: "Họ và tên", dataIndex: "fullName", key: "fullName", width: 200, ellipsis: true, align: "center" },
    { title: "Ngày sinh", dataIndex: "dob", key: "dob", width: 120, ellipsis: true, align: "center" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber", width: 150, ellipsis: true, align: "center" },
    { title: "Vị trí", dataIndex: "position", key: "position", width: 150, ellipsis: true, align: "center" },
    { title: "Trường", dataIndex: "school", key: "school", width: 200, ellipsis: true, align: "center" },
    { title: "Email", dataIndex: "email", key: "email", width: 200, ellipsis: true, align: "center" },
    {
      title: "CV",
      dataIndex: "cv",
      key: "cv",
      width: 100,
      ellipsis: true,
      align: "center",
      render: (text) => <a href={text}>Link</a>,
    },
    { title: "Đánh giá", dataIndex: "comments", key: "comments", width: 180, ellipsis: true, align: "center" },
    { title: "Vai trò", dataIndex: "role", key: "role", width: 150, ellipsis: true, align: "center" },
    { title: "Dự án", dataIndex: "project", key: "project", width: 150, ellipsis: true, align: "center" },
    { title: "Mentor", dataIndex: "mentor", key: "mentor", width: 150, ellipsis: true, align: "center" },
    { title: "Trạng thái", dataIndex: "status", key: "status", width: 150, ellipsis: true, align: "center" },
    {
      title: "Xem",
      key: "view",
      fixed: "right",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Button onClick={() => handleView(record)} type="default" icon={<EyeOutlined />}>
          Xem
        </Button>
      ),
    },
  ];

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const buttons = [
    {
      label: "Gửi email",
      type: "default",
      style: { background: "#6A4CE6", color: "white", borderRadius: "8px", padding: "0 20px" },
      onClick: () => console.log("Send email clicked"),
    },
    {
      label: "Xuất Excel",
      type: "default",
      style: { background: "#00C16E", color: "white", borderRadius: "8px", padding: "0 20px" },
      onClick: () => console.log("Export Excel clicked"),
    },
    {
      label: "Sửa",
      type: "default",
      icon: <EditOutlined />,
      style: selectedRowKeys.length !== 1
        ? { background: "#FF8C00", color: "white", borderRadius: "8px", padding: "0 20px", opacity: 0.5, pointerEvents: "none" } 
        : { background: "#FF8C00", color: "white", borderRadius: "8px", padding: "0 20px" },
      onClick: handleEdit,
    },
    {
      label: "Xóa",
      type: "default",
      icon: <DeleteOutlined />,
      style: selectedRowKeys.length === 0
        ? { background: "#FF3E30", color: "white", borderRadius: "8px", padding: "0 20px", opacity: 0.5, pointerEvents: "none" } 
        : { background: "#FF3E30", color: "white", borderRadius: "8px", padding: "0 20px" },
      onClick: handleDeleteClick,
    },
    {
      label: "Thêm mới Intern",
      type: "primary",
      icon: <PlusOutlined />,
      style: { background: "#007BFF", color: "white", borderRadius: "8px", padding: "0 20px" },
      onClick: handleAdd,
    },
  ];

  return (
    <div>
      <Spin spinning={loading}>
        <div style={{ marginBottom: 16 }}>
          <Checkbox checked={isSelectAll} onChange={handleSelectAll}>
            Chọn tất cả
          </Checkbox>
        </div>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          rowKey="id"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          selectionType="checkbox"
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

      <InternForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        editData={editData}
        listInternship={listInternship}
        listSchool={listSchool}
        confirmLoading={loading}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={() => handleDelete(selectedRowKeys[0])}
      />

      <InternDetailModal
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        internData={viewData}
        onEdit={handleEditFromDetail}
      />
    </div>
  );
};

export default InternManagement;
