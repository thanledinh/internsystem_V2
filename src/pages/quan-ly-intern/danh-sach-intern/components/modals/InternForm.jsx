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
    // nhớ cái này là khi đóng modal sẽ clear form
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
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[
                { required: true, message: "Please select your birthday!" },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Radio.Group>
                <Radio value={true}>Male</Radio>
                <Radio value={false}>Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Student ID"
              name="studentId"
              rules={[
                { required: true, message: "Please input your student ID!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="School Email"
              name="schoolEmail"
              rules={[
                { required: true, message: "Please input your school email!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              rules={[
                {
                  required: true,
                  message: "Please input your personal email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Relative Phone" name="relativePhone">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="GPA" name="gpa">
              <InputNumber
                min={0}
                max={4}
                step={0.1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="English Level" name="englishLevel">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Social Network Link" name="socialNetWorkLink">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Link CV" name="linkCv">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Major" name="major">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Desired Position" name="desiredPosition">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[
                { required: true, message: "Please select the start date!" },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[
                { required: true, message: "Please select the end date!" },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="School ID" name="schoolId">
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
            <Form.Item label="Internship ID" name="internshipId">
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
