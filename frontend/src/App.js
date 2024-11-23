import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import NavRoute from './NavRoutes.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn ) {
      navigate('/login');
    } else if (isLoggedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // useEffect(() => {
  //   navigate('/chatroom');
  // }, [navigate]);

  return (
    <div className='App'>
        <NavRoute 
          login={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  );
}

export default App;
