import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import { UpdateInternshipById } from '@services/intershipapi';
import moment from 'moment';

const { TextArea } = Input;

const UpdateInternShip = ({ visible, onClose, internshipData, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (internshipData) {
      form.setFieldsValue({
        name: internshipData.name,
        description: internshipData.description,
        startDate: moment(internshipData.startDate),
        endDate: moment(internshipData.endDate),
      });
    }
  }, [internshipData, form]);

  const handleUpdate = async () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      try {
        const updatedInternship = {
          ...values,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
        };
        await UpdateInternshipById(internshipData.id, updatedInternship);
        message.success('Cập nhật kỳ thực tập thành công!');
        onSuccess();
        onClose();
      } catch (error) {
        message.error('Không thể cập nhật kỳ thực tập. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật kỳ thực tập"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên Học Kỳ"
          rules={[{ required: true, message: 'Vui lòng nhập tên học kỳ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Ngày Bắt Đầu"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Ngày Kết Thúc"
          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateInternShip;