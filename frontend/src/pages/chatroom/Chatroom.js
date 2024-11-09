import ChatArea from "./Chatarea";
import ChatroomMain from "./ChatroomMain";
import "./chatroom.css";

export default function Chatroom() {
  return (
    <div className="chatroom desktop dark">
      <ChatroomMain />
      <ChatArea />
    </div>
  );
}