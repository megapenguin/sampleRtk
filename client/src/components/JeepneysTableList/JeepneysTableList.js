import React, { Suspense, useEffect, useState} from "react";
import { Table, Tag, Space, Input, Row, Col, Button, Divider } from "antd";
import axios from "axios";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import JeepneysInfoModal from "./JeepneysInfoModal";
import AddJeepneyModal from "./AddJeepneyModal";

function JeepneysTableList() {
  const [jeepneys, setJeepneys] = useState([]);
  const { Search } = Input;
  const [dataFromModal, setDataFromModal] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/jeepneys/search_all_jeepneys")
      .then((res) => {
        console.log(res);

        let data = res.data;
        setJeepneys(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    axios
      .post("/api/v1/jeepneys/search_jeepneys", { value: value })
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        setJeepneys(data);
        console.log("success");
      });

    console.log(value);
  };


  const modalClosed = () => {
    console.log("Passed data from modal", dataFromModal);
    axios
    .get("/api/v1/jeepneys/search_all_jeepneys")
    .then((res) => {
      console.log(res);
      let data = res.data;
      setJeepneys(data);
    })
  };

  return (
    
    <div>
      <Row justify="space-between">
        <Col span={4}>
          <Space direction="vertical">
            <Search
              placeholder="Search Jeepney"
              onSearch={onSearch}
              allowClear={true}
              enterButton
            />
          </Space>
        </Col>
        <Col span={4}>
            <AddJeepneyModal
                  info={""}
                  passedData={setDataFromModal}
                  afterClosing={modalClosed}
                />
        </Col>
      </Row>
      <Divider orientation="center">List of Jeepneys</Divider>
      <Row>
        <Table dataSource={jeepneys} scroll={{ x: 1000, y: 500 }} sticky>
          {/* <ColumnGroup title="Id" dataIndex="id" key="id"></ColumnGroup> */}
          {/* <ColumnGroup title="Name" key="name"> */}
            <Column title="Driver ID" dataIndex="driverId" key="driverId"></Column>
          {/* </ColumnGroup> */}
          <ColumnGroup
            title="Plate Number"
            dataIndex="plateNumber"
            key="plateNumber"
          ></ColumnGroup>
          <ColumnGroup
            title="Jeep Capacity"
            dataIndex="jeepCapacity"
            key="jeepCapacity"
          ></ColumnGroup>
          <ColumnGroup
            title="Actions"
            key="actions"
            fixed="right"
            render={(value) => (
              <Space>
                <JeepneysInfoModal
                  info={value}
                  passedData={setDataFromModal}
                  afterClosing={modalClosed}
                />
              </Space>
            )}
          ></ColumnGroup>
        </Table>
      </Row>
      
    </div>
  );
}

export default JeepneysTableList;
