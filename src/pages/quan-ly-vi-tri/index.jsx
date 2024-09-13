import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, message, Select } from "antd";
import TableComponent from "@components/button-component/table-component";
import ButtonsComponent from "@components/button-component";

const mockPositions = [
  {
    id: 1,
    internId: "INT001",
    fullName: "John Doe",
    phoneNumber: "123-456-7890",
    school: "FPT University",
    email: "johndoe@example.com",
    cvLink: "http://example.com/cv-johndoe",
    technology: ".NET",
    role: "fresher"
  },
  {
    id: 2,
    internId: "INT002",
    fullName: "Jane Smith",
    phoneNumber: "098-765-4321",
    school: "FPT University",
    email: "janesmith@example.com",
    cvLink: "http://example.com/cv-janesmith",
    technology: ".NET",
    role: "intern"
  }
];

const fetchAllPositions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPositions), 1000);
  });
};

const createPosition = async (positionData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...positionData, id: mockPositions.length + 1 });
    }, 500);
  });
};

const updatePosition = async (id, positionData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, ...positionData });
    }, 500);
  });
};

const deletePosition = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};

const PositionManagement = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [form] = Form.useForm();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const loadPositions = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllPositions();
        setPositions(result);
      } catch (error) {
        message.error("Không thể tải danh sách vị trí.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPositions();
  }, []);

  const handleAdd = () => {
    setEditingPosition(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedRow) {
      const position = selectedRow;
      setEditingPosition(position);
      form.setFieldsValue({
        internId: position.internId,
        fullName: position.fullName,
        phoneNumber: position.phoneNumber,
        school: position.school,
        email: position.email,
        cvLink: position.cvLink,
        technology: position.technology,
        role: position.role,
      });
      setIsModalVisible(true);
    }
  };

  const handleDelete = async () => {
    if (selectedRow) {
      try {
        await deletePosition(selectedRow.id);
        message.success("Vị trí đã được xóa thành công!");
        setPositions(positions.filter((position) => position.id !== selectedRow.id));
        setSelectedRow(null);
      } catch (error) {
        message.error("Không thể xóa vị trí.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingPosition) {
        await updatePosition(editingPosition.id, values);
        message.success("Vị trí đã được cập nhật thành công!");
        setPositions(positions.map((pos) =>
          pos.id === editingPosition.id ? { ...pos, ...values } : pos
        ));
      } else {
        const newPosition = await createPosition(values);
        message.success("Vị trí đã được tạo thành công!");
        setPositions([...positions, newPosition]);
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Không thể gửi thông tin vị trí.");
    }
  };

  const columns = [
    { title: "Mã Intern", dataIndex: "internId", key: "internId" },
    { title: "Họ và Tên", dataIndex: "fullName", key: "fullName" },
    { title: "Số Điện Thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Trường", dataIndex: "school", key: "school" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "CV", dataIndex: "cvLink", key: "cvLink" },
    { title: "Công Nghệ", dataIndex: "technology", key: "technology" },
    { title: "Vai Trò", dataIndex: "role", key: "role" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <Button type="primary" onClick={handleAdd}>
          Add Position
        </Button>
        <div>
          <Button type="default" onClick={handleEdit}>
            Edit
          </Button>
          <Button danger onClick={handleDelete} style={{ marginLeft: "8px" }}>
            Delete
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <Table
          dataSource={positions}
          loading={isLoading}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => setSelectedRow(record),
          })}
        />
      </div>
      <Modal
        title={editingPosition ? "Chỉnh Sửa Vị Trí" : "Thêm Vị Trí"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="internId"
            label="Mã Intern"
            rules={[{ required: true, message: "Vui lòng nhập mã intern" }]}
          >
            <Input placeholder="Nhập mã intern" />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Họ và Tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số Điện Thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="school"
            label="Trường"
          >
            <Input placeholder="Nhập trường" value="FPT University" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="cvLink"
            label="CV"
            rules={[{ required: true, message: "Vui lòng nhập liên kết CV" }]}
          >
            <Input placeholder="Nhập liên kết CV" />
          </Form.Item>
          <Form.Item
            name="technology"
            label="Công Nghệ"
            rules={[{ required: true, message: "Vui lòng nhập công nghệ" }]}
          >
            <Input placeholder="Nhập công nghệ" value=".NET" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai Trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value="fresher">Fresher</Select.Option>
              <Select.Option value="intern">Intern</Select.Option>
              <Select.Option value="middle">Middle</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PositionManagement;







// import React, { useEffect, useState } from "react";
// import { Button, Table, Modal, Form, Input, message, Space } from "antd";
// import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllPositions,
//   createPosition,
//   updatePosition,
//   deletePosition,
// } from "./position"; 

// const PositionManagement = () => {
//   const [positions, setPositions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingPosition, setEditingPosition] = useState(null);
//   const [form] = Form.useForm();

//   // Fetch all positions 
//   useEffect(() => {
//     const loadPositions = async () => {
//       setIsLoading(true);
//       try {
//         const result = await fetchAllPositions();
//         setPositions(result);
//       } catch (error) {
//         message.error("Failed to load positions.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPositions();
//   }, []);

//   // Add position handler
//   const handleAdd = () => {
//     setEditingPosition(null);
//     form.resetFields();
//     setIsModalVisible(true);
//   };

//   // Edit position handler
//   const handleEdit = (position) => {
//     setEditingPosition(position);
//     form.setFieldsValue({
//       name: position.name,
//     });
//     setIsModalVisible(true);
//   };

//   // Delete position handler
//   const handleDelete = async (id) => {
//     try {
//       await deletePosition(id);
//       message.success("Position deleted successfully!");
//       setPositions(positions.filter((position) => position.id !== id));
//     } catch (error) {
//       message.error("Failed to delete position.");
//     }
//   };

//   // Cancel modal handler
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

//   // Submit form handler (for both create and update)
//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       if (editingPosition) {
//         await updatePosition(editingPosition.id, values);
//         message.success("Position updated successfully!");
//       } else {
//         await createPosition(values);
//         message.success("Position created successfully!");
//       }
//       const result = await fetchAllPositions();
//       setPositions(result); // Refresh positions after create/update
//       setIsModalVisible(false);
//     } catch (error) {
//       message.error("Failed to submit position.");
//     }
//   };

//   // Table columns for the position list
//   const columns = [
//     { title: "Position Name", dataIndex: "name", key: "name" },
//     {
//       title: "Actions",
//       render: (text, record) => (
//         <>
//           <Button onClick={() => handleEdit(record)}>Edit</Button>
//           <Button danger onClick={() => handleDelete(record.id)}>
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
//         Add Position
//       </Button>
//       <Table
//         dataSource={positions}
//         loading={isLoading}
//         columns={columns}
//         rowKey="id"
//       />
//       <Modal
//         title={editingPosition ? "Edit Position" : "Add Position"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         onOk={handleSubmit}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Position Name"
//             rules={[{ required: true, message: "Please enter a position name" }]}
//           >
//             <Input placeholder="Enter position name" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default PositionManagement;
