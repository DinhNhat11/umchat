import { useState } from "react";
import { ChatArea, EmptyChatArea} from "../../components/Chatarea"
import { UserProfile } from "../../components/Profile";
import DirectMessageMain from "./DirectMessageMain";
import "./directmessage.css";

export default function DirectMessage() {
  const [name, setName] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="direct-message desktop dark">
      <DirectMessageMain 
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
              <UserProfile />
          )
        :
          <EmptyChatArea />
      }
    </div>
  );
}