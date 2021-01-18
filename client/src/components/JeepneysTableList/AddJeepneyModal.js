import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";


function AddJeepneyModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [jeepneys, setJeepneys] = useState([]);
  
  const showModal = () => {
    setIsModalVisible(true);
    console.log(props.info);
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

  const onFinish = (values) => {
    console.log(values);
    props.passedData(props.info);
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
    axios
    .post("/api/v1/jeepneys/add_jeep", values)
    .then((res) => {
      let jeepneysCopy = [...jeepneys];

      jeepneysCopy = [...jeepneysCopy, res.data];
      console.log(jeepneysCopy);
      setJeepneys(jeepneysCopy);
      Modal.success({
        content: 'Successfully Added New Jeepney',
      });
    })
    .catch((error) => console.log(error));
        
     
      
  };


  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: 'Failure to Add New Jeepney',
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Jeepney
      </Button>
     
      <Modal
        title="Add Jeepney:"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button form="myForm" key="submit" htmlType="submit" type="primary" loading={confirmLoading} onClick={onFinish}>
          Add
        </Button>
          ]}
      >
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            id="myForm"
        >
     
         
     <Form.Item
          label="Driver ID"
          name="driverId"
          rules={[{ required: true, message: "Please input the Driver's ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Plate Number"
          name="plateNumber"
          rules={[{ required: true, message: "Please input the Plate Number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Jeep Capacity"
          name="jeepCapacity"
          rules={[{ required: true, message: "Please input the Jeep Capacity!" }]}
        >
          <Input />
        </Form.Item>

        </Form>
      </Modal>
      
    </div>
  );
}

export default AddJeepneyModal;
