import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProvidePan from './Pages/ProvidePan';
import Aadhar from './Pages/Aadhar';
import Selfie from './Pages/Selfie';
import KycVerified from './Pages/KycVerified';
import CkycOtp from './Pages/CkycOtp';


function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProvidePan/>} />
         
          <Route path="/aadhar" element={<Aadhar/>} />
          <Route path="/selfie" element={<Selfie/>} />
        
          <Route path="/review" element={<KycVerified/>} />
          <Route path="/ckyc-otp" element={<CkycOtp/>} />
         
          <Route path="*" element={<ProvidePan/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
