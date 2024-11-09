import Chatroom from './pages/chatroom/Chatroom';
import Navbar from './navbar';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Chatroom />
      </div>
    </BrowserRouter>
  );
}

export default App;
