import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./components/Main";
import Profile from "./components/Profile";
import Camera from "./components/Camera";


export default function App() {
  return (
    <>
      <BrowserRouter>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<Main />} />
            <Route path= "/profile" element={<Profile />} />
            <Route path="/camera" element={<Camera />} />
          </Routes>

      
      </BrowserRouter>

    </>
  );
}

