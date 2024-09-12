import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Row, Col, Radio, Select } from "antd";
import DatePicker from "@components/datepicker-component";
import { formatDateForAPI } from "@utils/dateFormat";

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
      width={1200}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Tên"
              name="firstName"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Họ"
              name="lastName"
              rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Giới tính"
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
              label="Mã số sinh viên"
              name="studentId"
              rules={[{ required: true, message: "Vui lòng nhập mã số sinh viên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Email trường"
              name="schoolEmail"
              rules={[{ required: true, message: "Vui lòng nhập email trường!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Email cá nhân"
              name="personalEmail"
              rules={[{ required: true, message: "Vui lòng nhập email cá nhân!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Số điện thoại khác" name="relativePhone">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="GPA" name="gpa">
              <InputNumber min={0} max={4} step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Level Tiếng Anh" name="englishLevel">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Link Mạng xã hội đang dùng" name="socialNetWorkLink">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Link CV" name="linkCv">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Chuyên ngành" name="major">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Vị trí mong muốn" name="desiredPosition">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Ngày kết thúc"
              name="endDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Mã số của trường" name="schoolId">
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
            <Form.Item label="Mã số kỳ thực tập" name="internshipId">
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
