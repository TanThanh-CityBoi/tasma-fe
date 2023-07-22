
import { useState } from 'react';
import {  Button, Modal  } from  'antd';
import { GoSignOut } from "react-icons/go";


const ConfirmModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    props.handleSubmit()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
        <span
            className="ml-2"
            style={{
              padding: 6,
              borderRadius: "3px",
              paddingBottom: 8,
              cursor: "pointer",
            }}
            onClick={showModal}
        >
            <GoSignOut style={{ fontSize: 18 }} />
        </span>
      <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <p className='mb-5'>{props.description}</p>
        <div className='d-flex justify-content-end'>
                <button onClick={handleOk} style={{background: "#FFF", border: "solid 1px #6675df", background: "#6675df", color: "#fff", borderRadius: "5px"}} className='mr-2 py-1 px-3'>Confirm</button>
                <button onClick={handleCancel} style={{background: "#FFF", border: "solid 1px #fafbfc"}} className='mr-2 py-2 px-4'>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;