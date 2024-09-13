import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import endPoints from "../../../routers/router";

const { Title } = Typography;

const ListQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const name = new URLSearchParams(window.location.search).get("name");

  return (
    <>
      <Space>
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate(endPoints.QUANLYCONGVIEC)}
          style={{ marginBottom: 16 }}
        />
        <Title level={2}>Bộ câu hỏi của công việc: {name}</Title>
      </Space>
    </>
  );
};

export default ListQuestion;
