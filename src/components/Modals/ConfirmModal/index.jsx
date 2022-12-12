import { Modal } from "antd";
import React from "react";
import "../styles.scss";
const ConfirmationModal = ({
  handleClose,
  title,
  description,
  deleteHandler,
  selectedData,
}) => {
  const handleDeleteData = () => {
    deleteHandler(selectedData?.id);
    handleClose();
  };

  return (
    <Modal
      visible={true}
      title={<span>{title}</span>}
      centered
      onCancel={handleClose}
      footer={null}
      className="modal"
    >
      <div className="modal-wrapper">
        <div className="modal-body">
          <div className="modal-confirmation">{description}</div>
        </div>
        <div className="modal-footer">
          <button className="close" onClick={handleClose}>
            Close
          </button>
          <button className="submit" onClick={handleDeleteData}>
            Yes, confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
