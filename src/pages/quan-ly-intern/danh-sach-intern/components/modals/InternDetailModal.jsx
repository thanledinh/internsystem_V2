import React from "react";
import { Modal, Row, Col, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const InternDetailModal = ({ visible, onCancel, internData, onEdit }) => {
  if (!internData) return null;


  const boxStyle = {
    border: "1px solid #d9d9d9",
    padding: "3px 12px",
    borderRadius: "4px",
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

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <Modal
      visible={visible}
      title="Intern detail"
      onCancel={onCancel}
      footer={[
        <Button key="edit" type="primary" icon={<EditOutlined />} onClick={onEdit}>
          Chỉnh sửa
        </Button>,
      ]}
      width={1300}
    >
      <Row gutter={16}>
        <Col span={8} style={{ textAlign: "center" }}>
          <div style={imageContainerStyle}>
            {internData.image ? (
              <img
                src={internData.image}
                alt="Intern"
                style={imageStyle}
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <div style={{ marginTop: 20, textAlign: "left" }}>
            <p><b>Nhóm:</b> {internData.group || "N/A"}</p>
            <p><b>Kỳ thực tập:</b> {internData.internshipId || "N/A"}</p>
            <p><b>Ngày bắt đầu:</b> {internData.startDate || "Not available"}</p>
            <p><b>Ngày kết thúc dự kiến:</b> {internData.endDate || "Not available"}</p>
          </div>
        </Col>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={12}>
              <p><b>Họ và tên:</b></p>
              <div style={boxStyle}>{internData.fullName || "N/A"}</div>
            </Col>
            <Col span={12}>
              <p><b>Số điện thoại:</b></p>
              <div style={boxStyle}>{internData.phoneNumber || "N/A"}</div>
            </Col>
            <Col span={12}>
              <p><b>Trường:</b></p>
              <div style={boxStyle}>{internData.school || "N/A"}</div>
            </Col>
            <Col span={12}>
              <p><b>Địa chỉ:</b></p>
              <div style={boxStyle}>{internData.address || "Not available"}</div>
            </Col>
            <Col span={12}>
              <p><b>Link CV:</b></p>
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
              <p><b>Vai trò:</b></p>
              <div style={boxStyle}>{internData.role || "N/A"}</div>
            </Col>
            <Col span={12}>
              <p><b>Dự án:</b></p>
              <div style={boxStyle}>{internData.project || "Not assigned"}</div>
            </Col>
            <Col span={12}>
              <p><b>Mentor:</b></p>
              <div style={boxStyle}>{internData.mentor || "Not assigned"}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default InternDetailModal;
