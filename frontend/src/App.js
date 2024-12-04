import { useEffect, useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocationContext } from './contexts/locationContext.js';
import Logout from './pages/logout/Logout.js';
import './App.css';
import NavRoute from './NavRoutes.js';

function App() {
  const { isLoggedIn, showLogout } = useContext(LocationContext);
  const navigate = useNavigate();
  const location = useLocation();
  let className = showLogout ? 'disabled' : ''; 

  useEffect(() => {
    if (!isLoggedIn ) {
      navigate('/login');
    } else if (isLoggedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // useEffect(() => {
  //   navigate('/profile');
  // }, [navigate]);

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
