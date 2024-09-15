import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SendOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button, message, Spin, Checkbox, Pagination, Input, Row, Col } from "antd";
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
import InternDetailModal from "./components/modals/InternDetailModal";

const InternManagement = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { listIntern, listInternship, listSchool, totalIntern, status } =
    useSelector((state) => state.intern);

  // Fetch list of interns with pagination
  const getListIntern = async (pageNumber = currentPage, pageSize = pageSize) => {
    try {
      setLoading(true);
      await dispatch(fetchListIntern({ pageNumber, pageSize })).unwrap();
    } catch (error) {
      message.error("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListIntern(currentPage, pageSize);
  }, [dispatch, currentPage, pageSize]);

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

  const handleDeleteClick = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn một hàng cần xóa");
      return;
    }
    setIsDeleteModalVisible(true);
  };

  // Delete 1 or multiple rows
  const handleDelete = async () => {
    try {
      setLoading(true);
      const deletePromises = selectedRowKeys.map((id) => dispatch(deleteIntern(id)).unwrap());
      await Promise.all(deletePromises);
      message.success("Xóa thành công");
      const newTotal = totalIntern - selectedRowKeys.length;
      const newPage = Math.ceil(newTotal / pageSize);
      setCurrentPage(newPage > 0 ? newPage : 1);
      setSelectedRowKeys([]);
      getListIntern(newPage > 0 ? newPage : 1, pageSize);
    } catch (error) {
      message.error("Xóa thất bại");
    } finally {
      setLoading(false);
      setIsDeleteModalVisible(false);
    }
  };

  // Add or edit row
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editData) {
        await dispatch(updateIntern({ id: editData.id, data: values })).unwrap();
        message.success("Cập nhật thành công");
      } else {
        await dispatch(addIntern(values)).unwrap();
        message.success("Thêm mới thành công");
      }

      getListIntern(currentPage, pageSize);
      setIsModalVisible(false);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Thao tác thất bại");
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

  const handleSelectAll = (e) => {
    const allKeys = listIntern.map((item) => item.id);
    if (e.target.checked) {
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
    setIsSelectAll(e.target.checked);
  };

  const handlePageChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
    setSelectedRowKeys([]);
    getListIntern(page, newPageSize);
  };

  const renderFilters = () => (
    <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
      <Row gutter={16}>
        <Col span={4}><Input placeholder="Enter Intern's Full Name" /></Col>
        <Col span={4}><Input placeholder="Enter Intern's Phone Number" /></Col>
        <Col span={4}><Input placeholder="Enter Intern's Email" /></Col>
        <Col span={4}><Input placeholder="Enter Intern's School" /></Col>
        <Col span={5}><Button type="primary" style={{ width: '100%' }}>Clean Filters</Button></Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={4}><Input placeholder="Enter Intern's Major" /></Col>
        <Col span={4}><Input placeholder="Enter Intern's Position" /></Col>
        <Col span={4}><Input placeholder="Enter Intern's Mentor" /></Col>
        <Col span={4}><Input placeholder="Enter Intern's Project" /></Col>
        <Col span={5}><Button type="primary" style={{ width: '100%' }}>Search</Button></Col>
      </Row>
    </div>
  );

  const dataSource = listIntern.map((item, index) => ({
    id: item.id,
    key: item.id,
    group: item.group,
    fullName: `${item.lastName} ${item.firstName}`,
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
    stt: (currentPage - 1) * pageSize + index + 1, // Adjust STT based on pagination
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
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">Link</a>,
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
      icon: <SendOutlined />,
      style: { background: "#6A4CE6", color: "white" },
      onClick: () => console.log("Send email clicked"),
    },
    {
      label: "Xuất Excel",
      type: "default",
      icon: <DownloadOutlined />,
      style: { background: "#00C16E", color: "white" },
      onClick: () => console.log("Export Excel clicked"),
    },
    {
      label: "Sửa",
      type: "default",
      icon: <EditOutlined />,
      style:
        selectedRowKeys.length !== 1
          ? { background: "#FF8C00", color: "white", opacity: 0.45, pointerEvents: "none" }
          : { background: "#FF8C00", color: "white" },
      onClick: handleEdit,
    },
    {
      label: "Xóa",
      type: "default",
      icon: <DeleteOutlined />,
      style:
        selectedRowKeys.length === 0
          ? { background: "#FF3E30", color: "white", opacity: 0.4, pointerEvents: "none" }
          : { background: "#FF3E30", color: "white" },
      onClick: handleDeleteClick,
    },
    {
      label: "Thêm Intern",
      type: "primary",
      icon: <PlusOutlined />,
      style: { background: "#007BFF", color: "white" },
      onClick: handleAdd,
    },
  ];

  return (
    <div>
      <Spin spinning={loading}>
        {renderFilters()}

        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
          <Checkbox checked={isSelectAll} onChange={handleSelectAll}>
            Chọn tất cả
          </Checkbox>
        </div>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          rowKey="id"
          scroll={{ x: 1500 }}
          pagination={false}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalIntern}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={["10", "20", "50"]}
            showTotal={(total) => `Tổng ${total} bản ghi`}
          />
          <ButtonsComponent buttons={buttons} />
        </div>
      </Spin>

      <InternForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        editData={editData}
        listInternship={listInternship}
        listSchool={listSchool}
        confirmLoading={loading}
      />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
        selectedCount={selectedRowKeys.length}
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
