import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatArea, EmptyChatArea} from "../../components/Chatarea"
import { GroupProfile } from "../../components/Profile";
import ChatroomMain from "./ChatroomMain";
import { LocationContext } from "../../contexts/locationContext";
import { groupProfile } from "../../components/sampleProfile"
import "./chatroom.css";
import { ChatroomProvider } from "../../contexts/ChatroomContext";

export default function Chatroom() {
  const [name, setName] = useState(null);
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const { setPrevLocation } = useContext(LocationContext);

  return (
    <div className="chatroom desktop dark">
      <ChatroomProvider>
        <ChatroomMain
          setName={
            (value) => {
              setName(value);
              setShowProfile(false);
            }
          }
        />
      </ChatroomProvider>
      {
        name ?
          (
            !showProfile ? 
              <ChatArea 
                name={name} 
                setName={setName} 
                mode="chatroom"
                setShowProfile={(value)=> {
                    setPrevLocation(location.pathname);
                    setShowProfile(value);
                  }
                }
              />
              :
              <GroupProfile 
                setShowProfile={setShowProfile}
                groupProfile={groupProfile}
              />
          )
        :
          <EmptyChatArea />
      }
    </div>
  );
}