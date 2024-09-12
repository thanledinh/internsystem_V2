import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComponent from '@components/button-component/table-component';
import { getAllInternships, deleteInternshipById, getinternshipbyid } from '@services/intershipapi';
import './style.css';
import { formatDateWithoutTime } from '@utils/dateFormat';
import CreateInternshipModal from './CreateInternshipModal';
import UpdateInternShip from './UpdateInternShip';

const InternTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);

  const fetchInternshipData = async () => {
    setLoading(true);
    try {
      const fetchedData = await getAllInternships();
      setData(fetchedData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternshipData();
  }, []);

  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một kỳ thực tập để xóa!');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa các kỳ thực tập đã chọn?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await Promise.all(selectedRowKeys.map(id => deleteInternshipById(id)));
          message.success('Xóa kỳ thực tập thành công!');
          fetchInternshipData(); // Refresh data
          setSelectedRowKeys([]); // Reset selected rows
        } catch (error) {
          message.error('Không thể xóa kỳ thực tập. Vui lòng thử lại.');
        }
      },
    });
  };

  const handleEdit = async () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('Vui lòng chọn một kỳ thực tập để sửa!');
      return;
    }
    try {
      const internship = await getinternshipbyid(selectedRowKeys[0]);
      setCurrentInternship(internship);
      setIsUpdateModalVisible(true);
    } catch (error) {
      message.error('Không thể lấy thông tin kỳ thực tập. Vui lòng thử lại.');
    }
  };

  const handleCreate = () => {
    setIsCreateModalVisible(true);
  };

  const handleRefresh = () => {
    fetchInternshipData();
  };

  const handleModalSuccess = () => {
    fetchInternshipData();
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => formatDateWithoutTime(text),
      width: 110,
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => formatDateWithoutTime(text),
      width: 110,
    },
    {
      title: 'Tên Học Kỳ',
      dataIndex: 'name',
      key: 'name',
      width: 90,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 100,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'DateCreated',
      key: 'DateCreated',
      width: 110,
    },
    {
      title: 'HR',
      dataIndex: 'HR',
      key: 'HR',
      width: 100,
    },
    {
      title: 'Số lượng thành viên',
      dataIndex: 'soluongthanhvien',
      key: 'soluongthanhvien',
      width: 100,
    },
    {
      title: 'Trường đã theo học',
      dataIndex: 'truongdatheohoc',
      key: 'truongdatheohoc',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Intership Contract',
      dataIndex: 'contract',
      key: 'contract',
    },
    {
      title: 'Button',
      key: 'button',
      render: () => (
        <div className="report-process">
          <Button type="link" className="view-button">Xem</Button>
          <Button type="link" className="view-button">Tải lên tệp</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="intern-table-container">
      <TableComponent
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: 1000 }}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <div className="table-actions">
        <Button
          className="action-button refresh"
          onClick={handleRefresh}
          icon={<ReloadOutlined />}
          style={{ background: "green", color: "white" }}
        >
          Làm mới
        </Button>
        <Button
          className="action-button create"
          onClick={handleCreate}
          icon={<PlusOutlined />}
        >
          Thêm mới
        </Button>
        <Button
          className="action-button edit"
          onClick={handleEdit}
          icon={<EditOutlined />}
          disabled={selectedRowKeys.length !== 1}
        >
          Cập nhật
        </Button>
        <Button
          className="action-button delete"
          type="default"
          danger
          icon={<DeleteOutlined />}
          loading={loading}
          disabled={selectedRowKeys.length === 0 || loading}
          onClick={handleDelete}
        >
          Xóa
        </Button>
      </div>

      <CreateInternshipModal
        isVisible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSuccess={handleModalSuccess}
      />

      <UpdateInternShip
        visible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        internshipData={currentInternship}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default InternTable;
