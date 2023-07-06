import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/vi'; // 


const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

const IconStyled = {
  "paddingRight":"10px",
}
const photoUserChatbot = 'https://res.cloudinary.com/fpt-food/image/upload/v1639680442/FPT%20FOOD/Jira_Bugs_Clone/ironman_tvda3m.jpg';
const photoGPT = '/images/avatar/ChatGPT_logo.png'

export default function MessageChatbot({ text, index }) {
  const currentTime = moment().format('DD/MM/YYYY HH:mm');
  const avatarSrc = index % 2 === 0 ? photoUserChatbot : photoGPT;
  const avatarName = index % 2 === 0 ? "User" : "Tasma";

  return (
    <WrapperStyled>
      <div>
        <Avatar size='small' src={avatarSrc}>
          {avatarSrc ? '' : avatarName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='author'>{avatarName}</Typography.Text>
        <Typography.Text className='date'>{currentTime}</Typography.Text>
      </div>
      <div>
        <Typography.Text className='content'>{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}