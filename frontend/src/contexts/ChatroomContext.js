import { useState, createContext } from 'react';
import { IPADDRESS } from '../Backend_Address';
import { handleFetch } from '../api/HandleFetch';

export const ChatroomContext = createContext(undefined);

export const ChatroomProvider = ({ children }) => {
    const [chatRoomList, setChatRoomList] = useState([]);
    const apiUrl = IPADDRESS + "chatrooms/";

    const fetchChatroomList = () => {
        handleFetch(apiUrl, setChatRoomList, false);
    }


    return <ChatroomContext.Provider 
        value={{
            chatrooms: chatRoomList,
            fetchChatrooms: fetchChatroomList
        }}
        >
            {children}
        </ChatroomContext.Provider>;
};