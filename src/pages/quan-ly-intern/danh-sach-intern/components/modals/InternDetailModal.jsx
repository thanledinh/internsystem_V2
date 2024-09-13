import React from "react";
import { Modal, Row, Col, Button, Image, Typography } from "antd"; 
import { EditOutlined } from "@ant-design/icons";

const { Text, Title, Paragraph } = Typography;

const InternDetailModal = ({ visible, onCancel, internData, onEdit }) => {
  if (!internData) return null;

  const boxStyle = {
    border: "1px solid #d9d9d9",
    padding: "2px 12px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    marginBottom: "16px",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
  };

  const imageContainerStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "none",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
    overflow: "hidden",
  };

  return (
    <Modal
      visible={visible}
      title={<Title level={4}>Intern Detail</Title>}
      onCancel={onCancel}
      footer={[
        <Button key="edit" type="primary" icon={<EditOutlined />} onClick={onEdit}>
          Chỉnh sửa
        </Button>,
      ]}
      width={1500}
    >
      <Row gutter={[32, 16]}>
        <Col span={8} style={{ textAlign: "center" }}>
          <div style={imageContainerStyle}>
            {internData.image ? (
              <Image
                width={150} 
                height={150}
                src={internData.image}
                alt="Intern"
                preview={false} 
              />
            ) : (
              <Text>No Image</Text>
            )}
          </div>
          <div style={{ marginTop: 20, textAlign: "left" }}>
            <Paragraph>
              <Text strong>Nhóm:</Text> {internData.group || "N/A"}
            </Paragraph>
            <Paragraph>
              <Text strong>Kỳ thực tập:</Text> {internData.internshipId || "N/A"}
            </Paragraph>
            <Paragraph>
              <Text strong>Ngày bắt đầu:</Text> {internData.startDate || "Not available"}
            </Paragraph>
            <Paragraph>
              <Text strong>Ngày kết thúc dự kiến:</Text> {internData.endDate || "Not available"}
            </Paragraph>
          </div>
        </Col>
        <Col span={16}>
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Paragraph>
                <Text strong>Họ và tên:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.fullName || "N/A"}</div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Số điện thoại:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.phoneNumber || "N/A"}</div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Trường:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.school || "N/A"}</div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Địa chỉ:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.address || "Not available"}</div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Link CV:</Text>
              </Paragraph>
              <div style={boxStyle}>
                {internData.cv ? (
                  <a href={internData.cv} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Vai trò:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.role || "N/A"}</div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Dự án:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.project || "Not assigned"}</div>
            </Col>
            <Col span={12}>
              <Paragraph>
                <Text strong>Mentor:</Text>
              </Paragraph>
              <div style={boxStyle}>{internData.mentor || "Not assigned"}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default InternDetailModal;
