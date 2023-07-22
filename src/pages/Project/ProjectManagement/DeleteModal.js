import { DeleteOutlined } from "@ant-design/icons";
import { useState } from 'react';
import {  Modal, Button  } from  'antd';

const DeleteModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    props.handleClick()
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
        <Button
          className="ml-1"
          size="small"
          style={{
            fontWeight: "bold",
            fontSize: 15,
            border: "none",
          }}
          onClick={showModal}
        >
          <DeleteOutlined style={{ fontSize: 18 }} />
        </Button>
      <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} zIndex={1000}>
        <p className='mb-5'>{props.description}</p>
        <div className='d-flex justify-content-end'>
                <button onClick={handleOk} style={{background: "#FFF", border: "solid 1px #6675df", background: "#6675df", color: "#fff", borderRadius: "5px"}} className='mr-2 py-1 px-3'>Confirm</button>
                <button onClick={handleCancel} style={{background: "#FFF", border: "solid 1px #fafbfc"}} className='mr-2 py-2 px-4'>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;