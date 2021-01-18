import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

function BarangaysInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [barangays, setBarangays] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);

    console.log(props.info);
  };

  const handleOk = () => {
    props.passedData(props.info);
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
    axios
    .delete("/api/v1/barangays/delete_barangay", {
      params: {
        id,
      },
    })
    .then((res) => {
      let barangaysCopy = [...barangays];

      barangaysCopy = barangaysCopy.filter((barangay) => barangay.id !== id);
     setBarangays(barangaysCopy);
      console.log(barangaysCopy);
      Modal.success({
        content: 'Barangay has been Removed',
      });
    })
    .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setIfCanceled(true);
    setIsModalVisible(false);
  };
  const handleClose = () => {
    if (ifCanceled) {
    } else {
      props.afterClosing();
    }
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        View
      </Button>
      <Modal
        title="Barangay Information"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}
        footer={[
          <Button loading={confirmLoading} onClick={() => handleDelete(props.info.id)} danger>
              Remove
            </Button>
          ]}
      >
        <p>
          <h3>Bargangay ID:</h3>
          {props.info.id}
        </p>
        <p>
          <h3>Barangay Name:</h3>
          {props.info.barangayName}
        </p>
        <p>
          <h3>Location:</h3>
          {props.info.location}
        </p>
        <p>
          <h3>Barangay Description: </h3>
          {props.info.barangayDescription}
        </p>
      </Modal>
    </div>
  );
}

export default BarangaysInfoModal;
