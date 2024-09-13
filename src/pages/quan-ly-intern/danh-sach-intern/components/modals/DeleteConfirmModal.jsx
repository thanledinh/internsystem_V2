import React from 'react';
import { Modal, Typography } from 'antd';

const { Text } = Typography;

const DeleteConfirmModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title={<Text strong>Xác nhận xóa</Text>} 
      visible={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
    >
      <Text>Bạn có chắc chắn muốn xóa intern này không? Hành động này không thể hoàn tác.</Text>
    </Modal>
  );
};

export default DeleteConfirmModal;
