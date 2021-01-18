import React, { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

function JeepneysInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [jeepneys, setJeepneys] = useState([]);

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
      .delete("/api/v1/jeepneys/delete_jeep", {
        params: {
          id,
        },
      })
      .then((res) => {
        let jeepneysCopy = [...jeepneys];

        jeepneysCopy = jeepneysCopy.filter((jeepney) => jeepney.id !== id);
        setJeepneys(jeepneysCopy);

        console.log(jeepneysCopy);
        Modal.success({
          content: 'Jeepney has been Removed',
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
        title="Jeepney Information"
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
          <h3>Driver ID:</h3>
          {props.info.driverId}
        </p>
        <p>
          <h3>Plate Number:</h3>
          {props.info.plateNumber}
        </p>
        <p>
          <h3>Jeep Capacity:</h3>
          {props.info.jeepCapacity}
        </p>
      </Modal>
    </div>
  );
}

export default JeepneysInfoModal;
