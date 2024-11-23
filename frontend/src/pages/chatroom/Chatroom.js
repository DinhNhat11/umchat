import { useState } from "react";
import { ChatArea, EmptyChatArea} from "../../components/Chatarea"
import ChatroomMain from "./ChatroomMain";
import "./chatroom.css";

export default function Chatroom() {
  const [name, setName] = useState(null);
  return (
    <div className="chatroom desktop dark">
      <ChatroomMain setName={setName} />
      {
        name ?
          <ChatArea name={name} setName={setName} mode="chatroom"/>
        :
          <EmptyChatArea />
      }
    </div>
  );
}