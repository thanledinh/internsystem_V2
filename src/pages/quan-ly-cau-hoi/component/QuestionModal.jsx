import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";

const { Option } = Select;

const QuestionModal = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  questionRanks,
  positions,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Chỉ cập nhật giá trị khi `initialValues` thay đổi
    if (initialValues) {
      form.setFieldsValue({
        content: initialValues.questionName,
        questionRank: initialValues.questionRank,
        positionId: initialValues.positionId,
      });
    }
  }, [initialValues, form]);

  return (
    <Modal
      title={initialValues ? "Sửa Câu Hỏi" : "Thêm Câu Hỏi"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          name="content"
          label="Câu hỏi"
          rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="questionRank"
          label="Độ khó"
          rules={[{ required: true, message: "Vui lòng chọn độ khó!" }]}
        >
          <Select placeholder="Chọn độ khó">
            {questionRanks?.map((item) => (
              <Option key={item.value} value={item.rank}>
                {item.rank}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="positionId"
          label="Vị trí"
          rules={[{ required: true, message: "Vui lòng chọn vị trí!" }]}
        >
          <Select placeholder="Chọn vị trí">
            {positions?.map((position) => (
              <Option key={position.id} value={position.id}>
                {position.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {initialValues ? "Cập nhật" : "Thêm"}
            </Button>
            <Button onClick={onCancel}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
