import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Row, Col, Radio, Select, Typography } from "antd";
import DatePicker from "@components/datepicker-component";
import { formatDateForAPI } from "@utils/dateFormat";

const { Text, Paragraph } = Typography;

const InternForm = ({
  visible,
  onCancel,
  onSubmit,
  editData,
  confirmLoading,
  listSchool,
  listInternship,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (editData) {
        form.setFieldsValue(editData);
      }
    }
  }, [visible, editData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        birthday: formatDateForAPI(values.birthday),
        startDate: formatDateForAPI(values.startDate),
        endDate: formatDateForAPI(values.endDate),
        gender: Boolean(values.gender),
      };
      await onSubmit(formattedValues);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={visible}
      title={editData ? "Cập nhật Intern" : "Thêm mới Intern"}
      onCancel={handleCancel}
      okText={editData ? "Cập nhật" : "Tạo"}
      onOk={handleOk}
      cancelText="Huỷ"
      confirmLoading={confirmLoading}
      width={1500}  
    >
      <Form form={form} layout="vertical">
        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Tên</Text>}
              name="firstName"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Họ</Text>}
              name="lastName"
              rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Ngày sinh</Text>}
              name="birthday"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Giới tính</Text>}
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Radio.Group>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Mã số sinh viên</Text>}
              name="studentId"
              rules={[{ required: true, message: "Vui lòng nhập mã số sinh viên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Email trường</Text>}
              name="schoolEmail"
              rules={[{ required: true, message: "Vui lòng nhập email trường!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Email cá nhân</Text>}
              name="personalEmail"
              rules={[{ required: true, message: "Vui lòng nhập email cá nhân!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Số điện thoại</Text>}
              name="phoneNumber"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={<Text strong>Số điện thoại khác</Text>} name="relativePhone">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item label={<Text strong>Địa chỉ</Text>} name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={<Text strong>GPA</Text>} name="gpa">
              <InputNumber min={0} max={4} step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={<Text strong>Level Tiếng Anh</Text>} name="englishLevel">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item label={<Text strong>Link Mạng xã hội đang dùng</Text>} name="socialNetWorkLink">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={<Text strong>Link CV</Text>} name="linkCv">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={<Text strong>Chuyên ngành</Text>} name="major">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item label={<Text strong>Vị trí mong muốn</Text>} name="desiredPosition">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Ngày bắt đầu</Text>}
              name="startDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={<Text strong>Ngày kết thúc</Text>}
              name="endDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <Form.Item label={<Text strong>Mã số của trường</Text>} name="schoolId">
              <Select placeholder="Chọn trường">
                {listSchool.map((school) => (
                  <Select.Option key={school.id} value={school.id}>
                    {school.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={<Text strong>Mã số kỳ thực tập</Text>} name="internshipId">
              <Select placeholder="Chọn kỳ thực tập">
                {listInternship.map((internship) => (
                  <Select.Option key={internship.id} value={internship.id}>
                    {internship.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default InternForm;
