import { useState } from "react";
import { ChatArea, EmptyChatArea} from "../../components/Chatarea"
import DirectMessageMain from "./DirectMessageMain";
import "./directmessage.css";

export default function DirectMessage() {
  const [name, setName] = useState(null);
  return (
    <div className="direct-message desktop dark">
      <DirectMessageMain setName={setName} />
      {
        name ?
          <ChatArea name={name} setName={setName} mode="dm"/>
        :
          <EmptyChatArea />
      }
    </div>
  );
}