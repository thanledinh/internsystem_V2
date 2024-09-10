import React from 'react';
import { Modal } from 'antd';

const DeleteConfirmModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
    >
      <p>Bạn có chắc chắn muốn xóa intern này không? Hành động này không thể hoàn tác.</p>
    </Modal>
  );
};

export default DeleteConfirmModal;
