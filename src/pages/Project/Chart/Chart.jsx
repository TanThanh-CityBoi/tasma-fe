import React from 'react'
import TaskChart from './TaskChart';
import { Col, Divider, Row } from 'antd';
import LineChart from './LineChart';
import MemberChart from './MemberChart';
import DeadlineChart from './DeadlineChart';

const style = {
  background: "white",
  padding: "10px",
  marginLeft: "15px",
  marginBottom: "10px",
  maxWidth: "80vh",
  height: "35vh",
  display: "block",
  border: "3px solid wheat",
  borderRadius: "10px"
};

export default function Chart() {

    return (
      <>
        <Divider orientation="left">Summary of statistical graphs</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <TaskChart />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <MemberChart />
            </div>
          </Col>
          {/* <Col className="gutter-row" span={12}>
            <div style={style}>
              <LineChart />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <DeadlineChart />
            </div>
          </Col> */}
        </Row>
      </>
    );
}
