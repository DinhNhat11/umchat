import { useContext, useState } from "react";
import { ChatArea, EmptyChatArea} from "../../components/Chatarea"
import { UserProfile } from "../../components/Profile";
import { LocationContext } from "../../contexts/locationContext";
import DirectMessageMain from "./DirectMessageMain";
import { useLocation } from "react-router-dom";
import { profile } from "../../components/sampleProfile"
import "./directmessage.css";

export default function DirectMessage() {
  const [name, setName] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const { setPrevLocation } = useContext(LocationContext);
  const location = useLocation();

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
                setShowProfile={(value)=> {
                  setPrevLocation(location.pathname);
                  setShowProfile(value);
                }
              }
              />
              :
              <UserProfile 
                myProfile={false} 
                profile={profile}
                setShowProfile={setShowProfile}
              />
          )
        :
          <EmptyChatArea />
      }
    </div>
  );
}