import React, { useContext } from 'react'
import {Row, Col, Alert} from 'antd'
import SideBar from './SideBar'
import ChatWindow from './ChatWindow'
import { ChatContext } from '../context/chatContext'

export default function ChatRoom() {
  const {selectedRoom, setSelectedRoom} = useContext(ChatContext);
  return (
    <div>
      <Row>
        <Col span={8}>
          <SideBar />
        </Col>
        <Col span={16}>
          {selectedRoom ? (
            <ChatWindow />
          ) : (
            <Alert
              message="Hãy chọn phòng"
              type="info"
              showIcon
              style={{ margin: 5 }}
              closable
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
