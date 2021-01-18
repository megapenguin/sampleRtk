import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";


function AddDriverModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [drivers, setDrivers] = useState([]);
  
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
      .post("/api/v1/drivers/add_driver", values)
      .then((res) => {
        let driversCopy = [...drivers];
        driversCopy = [...driversCopy, res.data];
        console.log(driversCopy);
        setDrivers(driversCopy);
        Modal.success({
          content: 'Successfully Added New Driver',
        });
      })
      .catch((error) => console.log(error));
      
  };


  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: 'Failure to Add New Driver',
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
        Add Driver
      </Button>
     
      <Modal
        title="Add Driver:"
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your Firstname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Middle Name"
          name="middleName"
          rules={[
            { required: true, message: "Please input your Middlename!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your Lastname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your Address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules= {[{ required: true, message: "Please input your Contact Number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Generate Password"
          name="generatePassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>
        </Form>
      </Modal>
      
    </div>
  );
}

export default AddDriverModal;
