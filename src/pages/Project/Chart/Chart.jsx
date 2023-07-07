import React from "react";
import { Col, Divider, Row } from "antd";
import MemberChart from "./MemberChart";
import PriorityChart from "./PriorityChart";
import TaskCountChart from "./TaskCountChart";
import TaskStatusChart from "./TaskStatusChart";

const style = {
   background: "white",
   padding: "10px",
   marginLeft: "15px",
   marginBottom: "10px",
   maxWidth: "80vh",
   height: "35vh",
   display: "block",
   border: "2px solid wheat",
   borderRadius: "10px",
};

export default function Chart() {
   return (
      <>
         <Divider orientation="left">Summary of statistical graphs</Divider>
         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row mb-5" span={12}>
               <div style={style}>
                  <TaskStatusChart />
               </div>
            </Col>
            <Col className="gutter-row mb-5" span={12}>
               <div style={style}>
                  <MemberChart />
               </div>
            </Col>
            <Col className="gutter-row mb-5" span={12}>
               <div style={style}>
                  <PriorityChart />
               </div>
            </Col>
            <Col className="gutter-row mb-5" span={12}>
               <div style={style}>
                  <TaskCountChart />
               </div>
            </Col>
         </Row>
      </>
   );
}
