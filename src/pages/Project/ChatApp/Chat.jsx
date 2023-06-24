
import 'firebase/auth';
import { UserProvider } from './context/userContext';
import { ChatProvider } from './context/chatContext';
import ChatRoom from './ChatRoom/chatroom';
export default function Chat() {
  return(
    <UserProvider>
      <ChatProvider>
        <ChatRoom />
      </ChatProvider>
    </UserProvider>
  );
}

