import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Typography, Button, Row, Col } from 'antd';
import styled from 'styled-components';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
// import { AppContext } from '../../Context/AppProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { UserContext } from '../context/userContext';
import { ChatContext } from '../context/chatContext';
import confirm from 'antd/lib/modal/confirm';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { selectedRoom, setSelectedRoom } = useContext(ChatContext);


  useEffect(() => {

    // Lấy danh sách phòng chat từ Firebase Firestore
    const fetchRooms = async () => {
      const userId = currentUser ? currentUser.userEmail : null;
      if (userId) {
        const roomsRef = firebase.database().ref('rooms');
        const userRoomsRef = roomsRef.orderByChild(`user_ids/${userId}`).equalTo(true);
        userRoomsRef.on('value', (snapshot) => {
          const roomsData = snapshot.val();
          if (roomsData) {
            const roomsArray = Object.keys(roomsData).map((roomId) => ({
              id: roomId,
              ...roomsData[roomId],
            }));
            // Lưu danh sách phòng vào state hoặc context
            setRooms(roomsArray);
          } else {
            // Không có phòng nào chứa Id của người dùng hiện tại
            setRooms([]);
          }
        });
      } else {
        // Người dùng chưa đăng nhập
        setRooms([]);
      }
    };
    // Gọi hàm fetchRooms để lấy danh sách phòng ban đầu
    fetchRooms();

    // Hủy lắng nghe khi component unmount
    return () => {
      const db = firebase.database();
      const roomsRef = db.ref('rooms');
      roomsRef.off();
    };
  }, [])

  const handleFetchRooms = async () => {
    const userId = currentUser ? currentUser.userId : null;
      if (userId) {
        const roomsRef = firebase.database().ref('rooms');
        const userRoomsRef = roomsRef.orderByChild(`user_ids/${userId}`).equalTo(true);
        userRoomsRef.on('value', (snapshot) => {
          const roomsData = snapshot.val();
          if (roomsData) {
            const roomsArray = Object.keys(roomsData).map((roomId) => ({
              id: roomId,
              ...roomsData[roomId],
            }));
            // Lưu danh sách phòng vào state hoặc context
            setRooms(roomsArray);
          } else {
            // Không có phòng nào chứa Id của người dùng hiện tại
            setRooms([]);
          }
        });
      } else {
        // Người dùng chưa đăng nhập
        setRooms([]);
      }
  }


  // Thêm phòng mới vào Firebase Firestore
  const addRoom = async (roomName) => {
    try {
      const db = firebase.database();
      const roomsRef = db.ref('rooms');

      // Lấy thông tin người dùng hiện tại từ Context API
      const currentUserId = currentUser ? currentUser.userId : '';
      // Tạo một khóa mới cho phòng
      const newRoomRef = roomsRef.push();
      // Thiết lập thông tin phòng
      const roomData = {
        name: roomName,
        messages: [],
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        members: [], // Empty array for now, can be populated later
        author: currentUserId,
      };
    // Thêm currentUserId vào user_ids của phòng
    roomData.user_ids = {
      [currentUserId]: true,
    };
    // Lưu thông tin phòng vào Firebase Realtime Database
    await newRoomRef.set(roomData);

    console.log('Thêm phòng chat thành công. ID:', newRoomRef.key);
    } catch (error) {
      console.error('Lỗi khi thêm phòng chat:', error);
    }
  };
  const handleAddRoom = () => {
    const roomName = prompt('Nhập tên phòng chat mới:');
    if (roomName) {
      console.log("Tên phòng mới là: " + roomName);
      addRoom(roomName);
    }
  };
  const deleteRoom = async (roomName) => {
    try {
      const db = firebase.database();
      const roomsRef = db.ref('rooms');

      // Find the room with the given name
      const snapshot = await roomsRef.orderByChild('name').equalTo(roomName).once('value');

      // If the room exists, delete it
      if (snapshot.exists()) {
        const roomId = Object.keys(snapshot.val())[0]; // Assuming there's only one room with the same name
        await roomsRef.child(roomId).remove();
        console.log(`Deleted room "${roomName}" with ID: ${roomId}`);
      } else {
        console.log(`Room "${roomName}" does not exist`);
      }
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };
  const handleDeleteRoom = (roomName) => {
    // const roomName = prompt('Enter chat room\'s name to delete:');
    if (roomName) {
      console.log("Tên phòng can xoa là: " + roomName);
      deleteRoom(roomName);
    }
  };
  const handleDeleteRoom2 = (roomId) => {
    // Prompt the user for confirmation
    const confirmed = window.confirm('Are you sure you want to delete this room?');

    if (confirmed) {
      const roomsRef = firebase.database().ref('rooms');
      const roomRef = roomsRef.child(roomId);

      // Retrieve the author value from Firebase
      roomRef.child('author').once('value')
        .then((snapshot) => {
          const author = snapshot.val();

          // Check if the author of the room matches the current user
          if (author === currentUser.userId) {
            // Perform the delete operation
            roomRef.remove()
              .then(() => {
                console.log('Room deleted successfully');
                alert('Room deleted successfully')
              })
              .catch((error) => {
                console.log('Error deleting room:', error);
                alert('Can not delete room now, try again later');
              });
          } else {
            // Display an error message indicating that the user does not have permission to delete the room
            console.log('You do not have permission to delete this room');
            alert('You do not have permission to delete this room')
          }
        })
        .catch((error) => {
          console.log('Error retrieving author value:', error);
        });
    }
  };

  const mockPersons = [
    { id: 1, name: "Person 1" },
    { id: 2, name: "Person 2" },
    { id: 3, name: "Person 3" },
  ];

  const handleAddPerson = () => {
    // setIsAddRoomVisible(true);
    console.log("add more room")
  };

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header='Group chat' key='1' onClick={() => handleFetchRooms()}>
        {rooms.map((room) => (
          <Row style={{color: 'white'}} key={room.id} onClick={() => setSelectedRoom(room)} >
            <Col span={14}> {room.name} </Col>
            <Col span={2}>
              <Button
                type='text'
                icon={<MinusSquareOutlined/>}
                className='delete-room'
                onClick={() => handleDeleteRoom2(room.id)}
                >
              </Button>
            </Col>
          </Row>
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}
        >
          Add new room &nbsp;&nbsp;
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
