import { Route, Routes, Outlet, Navigate} from "react-router-dom";
import Chatroom from "./pages/chatroom/Chatroom";
import DirectMessage from "./pages/directmessage/DirectMessage";
import Navbar from "./navbar";
import ProfilePage from "./pages/myprofile/ProfilePage";
import LoginSignUp from "./pages/login/Login";
import CreateChatroom from "./pages/createchatroom/CreateChatroom";
import AddFriend from "./pages/addfriend/AddFriend";

function NavbarLayout() {

  return (
    <div className="container">
      <Navbar />
      <Outlet /> {/* Render nested routes here */}
    </div>
  );
}

export default function NavRoute() {


  return (
    <Routes>
      {/* Home, Chatroom, and Direct Message share the Navbar layout */}
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Navigate to="/direct-message" />} />
        <Route path="chatroom" element={<Chatroom />} />
        <Route path="direct-message" element={<DirectMessage />} />
        <Route path="create-chatroom" element={<CreateChatroom />} />
        <Route path="add-friend" element={<AddFriend />} />
      </Route>

      {/* Separate routes without Navbar */}
      <Route path="profile" element={<ProfilePage />}/>
      <Route path="settings" element={<div>404 Not Found</div>} />
      <Route path="login" element={<LoginSignUp />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
