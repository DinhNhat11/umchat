import { Route, Routes, Outlet} from "react-router-dom";
import Chatroom from "./pages/chatroom/Chatroom";
import DirectMessage from "./pages/directmessage/DirectMessage";
import Navbar from "./navbar";

function NavbarLayout() {
  return (
    <div className="container">
      <Navbar />
      <Outlet /> {/* Render nested routes here */}
    </div>
  );
}

export default function NavRoute({login, setIsLoggedIn}) {
  return (
    <Routes>
      {/* Home, Chatroom, and Direct Message share the Navbar layout */}
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="chatroom" element={<Chatroom />} />
        <Route path="directmessage" element={<DirectMessage />} />
      </Route>

      {/* Separate routes without Navbar */}
      <Route path="profile" element={<div>Profile</div>} />
      <Route path="settings" element={<div>Settings</div>} />
      <Route path="logout" element={<div>Logout</div>} />
      <Route path="login" element={<div>
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
          <button onClick={() => setIsLoggedIn(true)}>Signup</button>
      </div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
