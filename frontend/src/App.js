import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import NavRoute from './NavRoutes.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn ) {
      navigate('/login');
    }else {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

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
