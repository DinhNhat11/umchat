import { useState } from "react";
import { ChatArea, EmptyChatArea} from "../../components/Chatarea"
import { Profile } from "../../components/Profile";
import ChatroomMain from "./ChatroomMain";
import "./chatroom.css";

export default function Chatroom() {
  const [name, setName] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="chatroom desktop dark">
      <ChatroomMain 
        setName={
          (value) => {
            setName(value);
            setShowProfile(false);
          }
        }
      />
      {
        name ?
          (
            !showProfile ? 
              <ChatArea 
                name={name} 
                setName={setName} 
                mode="chatroom"
                setShowProfile={setShowProfile}
              />
              :
              <Profile />
          )
        :
          <EmptyChatArea />
      }
    </div>
  );
}