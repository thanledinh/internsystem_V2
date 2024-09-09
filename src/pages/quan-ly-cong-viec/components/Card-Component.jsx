import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Spin } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const CustomCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-is.amazingtech.vn/api/job/get-all');
        const result = await response.json();
        
        console.log('Fetched Data:', result);

        if (Array.isArray(result)) {
          setData(result); 
        } else if (result.data && Array.isArray(result.data)) {
          setData(result.data); 
        } else {
          console.error('Unexpected data format:', result);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array!</div>;
  }

  return (
    <div style={{width:'100%'}}>
    <Row gutter={[16, 24]} style={{ padding: '20px' }}>
      {data.map((item, index) => (
        <Col key={index} span={8}>
          <Card
            hoverable
            cover={
              <div
                style={{
                  backgroundImage: `url(${item.image || 'https://via.placeholder.com/300x150?text=null'})`, // Placeholder "null" image
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '150px',
                }}
              ></div>
            }
            style={{
              borderRadius: '15px',
              overflow: 'hidden',
              textAlign: 'center',
              position: 'relative',
            }}
            bodyStyle={{
              padding: '10px 0',
              backgroundColor: '#fff',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
              position: 'relative',
              height: '50px', 
            }}
          >
            <Button
              type="text"
              icon={<FileTextOutlined />}
              style={{
                color: '#aaa', 
                fontWeight: '500',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
              }}
            >
              Show Questions
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default CustomCard;
