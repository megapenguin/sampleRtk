import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";


function AddBarangayModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [barangays, setBarangays] = useState([]);
  
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
          .post("/api/v1/barangays/add_barangay", values)
          .then((res) => {
            let barangaysCopy = [...barangays];
    
            barangaysCopy = [...barangaysCopy, res.data];
            console.log(barangaysCopy);
           setBarangays(barangaysCopy);
           Modal.success({
            content: 'Successfully Added New Barangay',
          });
          })
          .catch((error) => console.log(error));
      
  };


  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: 'Failure to Add New Barangay',
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
        Add Barangay
      </Button>
     
      <Modal
        title="Add Barangay:"
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
          label="Barangay Name"
          name="barangayName"
          rules={[{ required: true, message: "Please input the Barangay's Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input Barangay's Location!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Barangay Description"
          name="barangayDescription"
          rules={[{ required: true, message: "Please input the Barangay's Description!" }]}
        >
          <Input />
        </Form.Item>

        </Form>
      </Modal>
      
    </div>
  );
}

export default AddBarangayModal;
