import { useState, createContext, useEffect } from 'react';
import { IPADDRESS } from '../Backend_Address';
import { handleFetch, handleFetchAxios } from '../api/HandleFetch';

export const ChatroomContext = createContext(undefined);

export const ChatroomProvider = ({ children }) => {
    const [chatRoomList, setChatRoomList] = useState([]);
    const [response, setResponse] = useState();
    const apiUrl = IPADDRESS + "chatrooms/";

    const fetchChatroomList = () => {
        handleFetchAxios(apiUrl, setResponse, false);
    }

    useEffect(() => {
        if (response && response.code == 200) {
            setChatRoomList(response.message);
        }
    }, [response])

    return <ChatroomContext.Provider 
        value={{
            chatrooms: chatRoomList,
            fetchChatrooms: fetchChatroomList
        }}
        >
            {children}
        </ChatroomContext.Provider>;
};