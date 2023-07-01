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
        <Col span={6}>
          <SideBar />
        </Col>
        <Col span={18}>
          {selectedRoom ? (
            <ChatWindow />
          ) : (
            <Alert
              message="Please select a chat room"
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
