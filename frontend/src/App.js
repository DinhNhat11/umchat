import { useEffect, useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from './contexts/UserContext.js';
import Logout from './pages/logout/Logout.js';
import './App.css';
import NavRoute from './NavRoutes.js';

function App() {
  const { isLoggedIn , showLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  let className = showLogout ? 'disabled' : ''; 

  // useEffect(() => {
  //   if (!isLoggedIn && location.pathname != '/server-down') {
  //     navigate('/login');
  //   } else if (isLoggedIn && location.pathname === '/login') {
  //     navigate('/chatroom')
  //   }
  // }, [isLoggedIn, navigate]);

  useEffect(() => {
    navigate('/add-friend');
  }, [navigate]);

  return (
    <>
      <div className={'App ' + className}>
        <NavRoute />
      </div>
      {
        showLogout && 
        <Logout />
      }
    </>
  );
}

export default App;
