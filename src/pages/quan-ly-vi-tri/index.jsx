import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd";
import {
  fetchAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "./position"; 

const PositionManagement = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [form] = Form.useForm();

  // Fetch all positions 
  useEffect(() => {
    const loadPositions = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllPositions();
        setPositions(result);
      } catch (error) {
        message.error("Failed to load positions.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPositions();
  }, []);

  // Add position handler
  const handleAdd = () => {
    setEditingPosition(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Edit position handler
  const handleEdit = (position) => {
    setEditingPosition(position);
    form.setFieldsValue({
      name: position.name,
    });
    setIsModalVisible(true);
  };

  // Delete position handler
  const handleDelete = async (id) => {
    try {
      await deletePosition(id);
      message.success("Position deleted successfully!");
      setPositions(positions.filter((position) => position.id !== id));
    } catch (error) {
      message.error("Failed to delete position.");
    }
  };

  // Cancel modal handler
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Submit form handler (for both create and update)
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingPosition) {
        await updatePosition(editingPosition.id, values);
        message.success("Position updated successfully!");
      } else {
        await createPosition(values);
        message.success("Position created successfully!");
      }
      const result = await fetchAllPositions();
      setPositions(result); // Refresh positions after create/update
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to submit position.");
    }
  };

  // Table columns for the position list
  const columns = [
    { title: "Position Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Position
      </Button>
      <Table
        dataSource={positions}
        loading={isLoading}
        columns={columns}
        rowKey="id"
      />
      <Modal
        title={editingPosition ? "Edit Position" : "Add Position"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Position Name"
            rules={[{ required: true, message: "Please enter a position name" }]}
          >
            <Input placeholder="Enter position name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PositionManagement;
