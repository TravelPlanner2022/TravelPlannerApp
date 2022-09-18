
import React, { Component, useRef, useCallback, useState } from "react";
//import SelectAttractions from './SelectAttractions';
import { Row, Col, Button, Select, Form, Input, Carousel } from "antd";

import {
  LeftCircleFilled,
  RightCircleFilled,
  HeartTwoTone,
  UnorderedListOutlined,
  CalendarOutlined,

} from "@ant-design/icons";
import SetDateRange from "./SetDateRange";
import SelectAttractions from "./SelectAttractions";
import webpImg from "../assets/images/left-bottom-bg.webp";
import "../index.css";
import Map from './Map';
const { Option } = Select;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daysGap: 0,
      twoToneColor: "#fff",
    };
    this.carouselEle = React.createRef();
  }
  handleLeft = () => {
    console.log(this.carouselEle);
    this.carouselEle.current.prev();
  };
  handleRight = () => {
    console.log(this.carouselEle);
    this.carouselEle.current.next();
  };
  passDaysdiff = (days) => {
    //SetDaysGap(days);
    this.setState({
      daysGap: days,
    });
    console.log(this.state.daysGap, "hello");
  };

  dateChange = (value) => {
    console.log(value);
  };

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  render() {
    // mock data
    const list = [
      {
        id: 1,
        name: "1.Tower of London",
        pingfen: "66.008",
        detail: "Historic $ites·12312312312312312123123123123",
        city: "City of London",
        money: "Tickets from $65.79",
        mark: "0",
        imgList: [
          {
            img: webpImg,
          },
          {
            img: webpImg,
          },
        ],
      },
      {
        id: 2,
        name: "1.Tower of London",
        pingfen: "66.008",
        detail: "Historic $ites·12312312312312312123123123123",
        city: "City of London",
        money: "Tickets from $65.79",
        imgList: [
          {
            img: webpImg,
          },
          {
            img: webpImg,
          },
        ],
      },
      {
        id: 3,
        name: "1.Tower of London",
        pingfen: "66.008",
        detail: "Historic $ites·12312312312312312123123123123",
        city: "City of London",
        money: "Tickets from $65.79",
        imgList: [
          {
            img: webpImg,
          },
        ],
      },
      {
        id: 4,
        name: "1.Tower of  London",
        pingfen: "66.008",
        detail: "Historic $ites·12312312312312312123123123123",
        city: "City of London",
        money: "Tickets from $65.79",
        imgList: [
          {
            img: webpImg,
          },
        ],
      },
    ];
    return (
      <>
        <Row className="container">
          <Col span={8} className="left-side">
            <Col span={24}>
              <><Form style={{ paddingTop: '3px' }}>
                  <SetDateRange setDateGap={this.passDaysdiff}/>
                  <Form.Item label={<b>Tag Attractions</b>}>
                    <SelectAttractions/>
                  </Form.Item>
                  <Form.Item>
                  <Button type="primary">Submit</Button>
                  </Form.Item>
                </Form></>
              <Col span={24} style={{ textAlign: "left" }}>
                <b>resutls are displayed         </b>
                  <Button shape="round" style={{ marginLeft: "16px" }}>
                    <UnorderedListOutlined />
                    <Select
                      bordered={false}
                      defaultValue="list"
                      style={{ marginTop: "-10px" }}
                    >
                      <Option value="list1">list1</Option>
                      <Option value="list2">list2</Option>
                    </Select>
                  </Button>
                
              </Col>
              {list.map((listItem) => {
                return (
                  <div
                    key={listItem.id}
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: "16px",
                      borderBottom: "1px solid #f7f7f7",
                      marginTop: "16px",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <HeartTwoTone
                        twoToneColor={listItem.mark ? "red" : "#fff"}
                        style={{
                          display: "block",
                          fontSize: "30px",
                          cursor: "pointer",
                          textAlign: "right",
                          paddingRight: "16px",
                          position: "absolute",
                          top: "16px",
                          width: "200px",
                          zIndex: "99999",
                        }}
                      />
                    </div>
                    <Carousel
                      style={{ width: "200px", height: "200px" }}
                      // autoplay
                      arrows
                      prevArrow={<LeftCircleFilled />}
                      nextArrow={<RightCircleFilled />}
                    >
                      {listItem.imgList.map((imgList, index) => {
                        return (
                          <div key={index} style={{ position: "relative" }}>
                            <img
                              key={index}
                              style={{ width: "200px", height: "200px" }}
                              src={imgList.img}
                              alt="图片已失效"
                            ></img>
                          </div>
                        );
                      })}
                    </Carousel>
                    <div
                      style={{ marginLeft: "16px", textAlign: "left" }}
                      key={listItem.id}
                    >
                      <h3>{listItem.name}</h3>
                      <div className="text-color-1">66.008</div>
                      <div
                        className="text-color-1"
                        style={{
                          width: "200px",
                          overflow: "hidden",
                          wordWrap: "break-word",
                        }}
                      >
                        description
                      </div>
                      <div className="text-color-2">City of London</div>
                      <div className="text-color-3">Tickets from $65.79</div>
                    </div>
                  </div>
                );
              })}
            </Col>
          </Col>
          <Col span={16} className="right-side">
                    <Map />
                </Col>
        </Row>
      </>
    );
  }
}

export default Main;

