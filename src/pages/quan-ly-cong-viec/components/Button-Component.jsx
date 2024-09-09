import React from 'react';
import { Button, Row, Col } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const ActionButtons = () => {
  return (
    <div style={{width:'100%'}}>
    <Row gutter={[16, 0]} style={{ padding: '20px' }}>
      <Col>
        <Button
          type="primary"
          icon={<EyeOutlined />}
          style={{ backgroundColor: '#28a745', borderColor: '#28a745', marginRight: '10px' }}
        >
          Import Excel
        </Button>
      </Col>

      <Col>
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ backgroundColor: '#f0ad4e', borderColor: '#f0ad4e', marginRight: '10px' }} 
        >
          Edit
        </Button>
      </Col>

      <Col>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', marginRight: '10px' }} 
        >
          Delete
        </Button>
      </Col>

      <Col>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#007bff', borderColor: '#007bff' }} 
        >
          Add New Technology
        </Button>
      </Col>
    </Row>
    </div>
  );
};

export default ActionButtons;
