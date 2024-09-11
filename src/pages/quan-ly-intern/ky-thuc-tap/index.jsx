import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import './style.css';  // Import file SCSS
import { formatDateWithoutTime } from '@utils/dateFormat';
import { getAllInternships } from '@services/intershipapi';

const InternTable = () => {
  const [data, setData] = useState([]);  // State to hold intern data
  const [loading, setLoading] = useState(true);  // State to manage loading status
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);  // State to hold selected rows

  // Function to fetch data from the API
  const fetchInternshipData = async () => {
    setLoading(true);
    try {
      const fetchedData = await getAllInternships();
      setData(fetchedData);  
    } catch (error) {
      console.error('Error fetching API data:', error);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchInternshipData();  
  }, []);

  // Handle delete action
  const handleDelete = () => {
    console.log('Deleting rows:', selectedRowKeys);
  };

  // Handle edit action
  const handleEdit = () => {
    console.log('Editing rows:', selectedRowKeys);
    // Example: Show form to edit selected rows
  };

  const handleCreate = () => {
    console.log('Creating new intern');
    // Example: Show form to create a new intern
  };

  // Handle refresh action
  const handleRefresh = () => {
    fetchInternshipData();  // Fetch data again to refresh
  };

  const columns = [
    {
      title: 'Select',
      key: 'select',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => {
            const { checked } = e.target;
            setSelectedRowKeys(prev => 
              checked ? [...prev, record.id] : prev.filter(id => id !== record.id)
            );
          }}
        />
      ),
    },
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1,  // Display row number
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => formatDateWithoutTime(text),  
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => formatDateWithoutTime(text),  
    },
    {
      title: 'Tên Học Kỳ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Button',
      key: 'button',
      render: () => (
        <div className="report-process">
          <Button type="link" className="view-button">View</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="intern-table-container">
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}  
        pagination={false}  
        rowKey="id"  
        scroll={{ x: 1000 }}  
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
      <div className="table-actions">
        <Button className="action-button refresh" onClick={handleRefresh}>Làm mới</Button>
        <Button className="action-button create" onClick={handleCreate}>Tạo Intern</Button>
        <Button className="action-button delete" onClick={handleDelete}>Xoá</Button>
        <Button className="action-button edit" onClick={handleEdit}>Sửa</Button>
      </div>
    </div>
  );
};

export default InternTable;