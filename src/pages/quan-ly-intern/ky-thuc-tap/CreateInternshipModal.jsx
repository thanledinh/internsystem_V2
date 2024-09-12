import React from 'react';
import { Modal, Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment'; // Import moment
import { postAllInternships } from '@services/intershipapi';

const { RangePicker } = DatePicker;

const CreateInternshipModal = ({ isVisible, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  // Set moment locale to Vietnamese
  moment.locale('vi');

  const handleCreateInternship = async (values) => {
    const { name, description, dateRange } = values;
    const [startDate, endDate] = dateRange;
  
    const currentDate = new Date();
    
    // Kiểm tra ngày bắt đầu và ngày kết thúc
    if (startDate < currentDate || endDate < currentDate) {
      message.error('Ngày không được ở trong quá khứ!');
      return;
    }
  
    if (startDate > endDate) {
      message.error('Ngày kết thúc phải sau ngày bắt đầu!');
      return;
    }
  
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
  
    try {
      await postAllInternships({
        name,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      });
      message.success('Tạo kỳ thực tập thành công!');
      onSuccess();
      onClose();
      form.resetFields();
    } catch (error) {
      console.error('Lỗi khi tạo kỳ thực tập:', error);
      message.error('Không thể tạo kỳ thực tập. Vui lòng thử lại.');
    }
  };

  return (
    <Modal
      title="Tạo Kỳ Thực Tập Mới"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateInternship}
      >
        <Form.Item
          name="name"
          label="Tên Học Kỳ (bắt buộc)"
          rules={[{ required: true, message: 'Vui lòng nhập tên học kỳ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dateRange"
          label="Ngày"
          rules={[{ type: 'array', required: true, message: 'Vui lòng chọn ngày!' }]}
        >
          <RangePicker
            showTime
            format="DD-MM-YYYY"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button style={{ backgroundColor: '#075e6d', borderColor: '#075e6d' }} type="primary" htmlType="submit">
            Tạo Kỳ thực tập
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateInternshipModal;