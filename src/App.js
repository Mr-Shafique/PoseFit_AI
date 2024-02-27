import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Redalert from "./components/Redalert";
import Hero from "./components/Hero";


export default function App() {
  return (
    <>
      <BrowserRouter>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/nav" element={<Nav />} />
            <Route path="/redalert" element={<Redalert />} />
            <Route path="/hero" element={<Hero />} />
          </Routes>

      
      </BrowserRouter>
    </>
  );
}

