import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';

const EditInternModal = ({ visible, onCancel, onSubmit, editData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        lastName: editData.lastName,
        firstName: editData.firstName,
        email: editData.email,
        phoneNumber: editData.phoneNumber,
        dob: editData.dob ? moment(editData.dob) : null,
        school: editData.school,
        position: editData.position,
        group: editData.group,
        role: editData.role,
        project: editData.project,
        mentor: editData.mentor,
        status: editData.status,
        reportProcess: editData.reportProcess,
      });
    } else {
      form.resetFields();
    }
  }, [editData]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Chỉnh sửa Intern"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Họ"
          name="lastName"
          rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="firstName"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="dob">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item 
          label="Trường học" 
          name="school" 
          rules={[{ required: true, message: 'Vui lòng nhập tên trường học!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Nhóm" name="group">
          <Input />
        </Form.Item>
        <Form.Item label="Vị trí mong muốn" name="position">
          <Input />
        </Form.Item>
        <Form.Item label="Vai trò" name="role">
          <Input />
        </Form.Item>
        <Form.Item label="Dự án" name="project">
          <Input />
        </Form.Item>
        <Form.Item label="Người hướng dẫn" name="mentor">
          <Input />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Input />
        </Form.Item>
        <Form.Item label="Tiến trình báo cáo" name="reportProcess">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditInternModal;
