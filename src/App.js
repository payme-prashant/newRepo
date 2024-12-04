import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Aadhar from './Pages/Aadhar';
import AadhaarNumber from "./Pages/AdharNumber";
import CkycOtp from './Pages/CkycOtp';
import KycVerified from './Pages/KycVerified';
import ProvidePan from './Pages/ProvidePan';
import Selfie from './Pages/Selfie';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProvidePan/>} />
          <Route path="/adharnumber" element={<AadhaarNumber/>} />
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
