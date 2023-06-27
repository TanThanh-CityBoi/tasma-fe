import React, { useContext, useRef } from 'react';
import { styled } from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';
import { SendOutlined, WechatOutlined } from '@ant-design/icons';
import MessageChatbot from './MessageChatBot';
// import { AppContext } from '../../../context/AppProvider';
import { useState } from 'react';
import { LoadingChatBot } from '../../../components/GlobalSetting/Loading/Loading';
import { SERVER_API_URL } from '../../../util/config/constants'

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: calc(100vh - 150px);
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
const IconStyled = {
  "paddingRight": "10px",
}

const ChatBot = () => {
  // const { userLogin, selectedRoom, members, setIsInviteMemberVisible } =
  //   useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = async () => {
    const newMessage = inputValue.trim(); // Lấy tin nhắn mới từ inputValue và loại bỏ khoảng trắng ở đầu và cuối
    if (newMessage !== '') {
      const updatedMessageList = [...messageList, newMessage]; // Thêm tin nhắn mới vào danh sách tin nhắn
      setMessageList(updatedMessageList); // Cập nhật state danh sách tin nhắn

      setInputValue(''); // Đặt lại giá trị của inputValue thành chuỗi rỗng

      try {
        // setLoading(true)
        const prompt =`Bạn là một AI chatbot có tên là Tasma, nhiệm vụ của bạn là hỗ trợ người dùng 
        trong việc quản lý công việc và quản lý dự án. Bên cạnh đó,bạn cũng có thể hỗ trợ người dùng 
        các vấn đề khác nếu người dùng có thắc mắc. Và sau đây là nội dung của người dùng cần giùm đỡ: `


        const response = await fetch(`${SERVER_API_URL}/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: prompt  + newMessage }],
          })
        })

        if (response.ok) {
          const data = await response.json();
          const answer = data.choices[0].message.content;
          console.log("Answer is:", answer)
          const updatedMessageListWithAnswer = [
            ...updatedMessageList,
            answer,
          ];
          // setLoading(false)
          setMessageList(updatedMessageListWithAnswer);
        } else {
          // Handle API error here
          console.error('API error:', response.status);
        }
      } catch (error) {
        // setLoading(false)
        // Handle fetch error here
        console.error('Fetch error:', error);
      }
    }

    form.resetFields(['message']);

    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header__info'>
          <p className='header__title'>{'Chat with GPT'}</p>
          <span className='header__description'>
            {'Hỗ trợ giải đáp mọi thắc mắc'}
          </span>
        </div>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled ref={messageListRef}>
          {loading ? <LoadingChatBot /> : messageList.map((message, index) => (
            <>
              <MessageChatbot
                text={message}
                index={index}
              />
            </>
          ))}
        </MessageListStyled>
        <FormStyled form={form}>
          <Form.Item name='message'>
            <Input
              ref={inputRef}
              onChange={handleInputChange}
              onPressEnter={handleOnSubmit}
              placeholder='Nhập tin nhắn...'
              bordered={false}
              autoComplete='off'
            />
          </Form.Item>
          <SendOutlined style={IconStyled} type='primary' onClick={handleOnSubmit}>
          </SendOutlined>
        </FormStyled>
      </ContentStyled>



    </WrapperStyled>
  )
}

export default ChatBot;