import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

function DriversInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [drivers, setDrivers] = useState([]);

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
      .delete("/api/v1/drivers/delete_driver", {
        params: {
          id,
        },
      })
      .then((res) => {
        let driversCopy = [...drivers];
        driversCopy = driversCopy.filter((driver) => driver.id !== id);
        setDrivers(driversCopy);
        console.log(driversCopy);
        Modal.success({
          content: 'Driver has been Removed',
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
        title="Driver Information"
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
          <h3>ID:</h3>
          {props.info.id}
        </p>
        <p>
          <h3>Name:</h3>
          {props.info.firstName} {props.info.middleName} {props.info.lastName}
        </p>
        <p>
          <h3>Contact Number:</h3>
          {props.info.contactNumber}
        </p>
        <p>
          <h3>Address: </h3>
          {props.info.address}
        </p>
        <p>
          <h3>Email Address: </h3>
          {props.info.email}
        </p>
      </Modal>
    </div>
  );
}

export default DriversInfoModal;
