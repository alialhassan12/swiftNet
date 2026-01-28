import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage'
import 'aos/dist/aos.css';
import AOS from "aos";
import { Toaster } from "react-hot-toast";

function App() {
  
  //intialize aos for the fade animation
  AOS.init({
    duration: 1000,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
