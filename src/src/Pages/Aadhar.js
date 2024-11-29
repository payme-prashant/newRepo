import React, { useEffect, useState } from "react";
import aadharImg from "../Assets/aadhar.png"
import Footer from './Component/Footer';
import Header from "./Component/Header";

import 'reactjs-popup/dist/index.css';

import AadharGetOtp from "./Component/AadharCommon/AadharGetOtp";
import ValidateOtp from "./Component/AadharCommon/ValidateOtp";
import {handleError, ToastMsg} from "./Common/ToastMsg";
import { sendAdharOtp, verifyAdharOtp } from "../service/service";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Common/Loader";
import { customMixPanel, UserMapping } from "../Helper/regex";

const Aadhar = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [otpPage, setOtpPage] = useState(true)
  const[client_id,setClient_id]=useState('')
  const[aadhar,setAadhar]=useState(false)


useEffect(()=>{
  
  UserMapping(localStorage.getItem("user_id"))
  customMixPanel("View_Location_screen",false)
  customMixPanel("Viewed_Adhaar_card_screen",false)
},[])

  const handlegetAdharOtp = (adhar) => {
    customMixPanel("Interacted_Adhaar_card_screen","Submit")
    
      if(adhar)
      {
         setAadhar(adhar)

      }
  
    let data ={
      aadhaar_no:adhar?adhar:aadhar
    }
    setLoader(true)
    sendAdharOtp(data).then((res) => {
      setClient_id(res.data.data.client_id)
      console.log('res.data.data.client_i',res.data.data)
      setLoader(false)
      if(res?.data?.data?.otp_sent){
        ToastMsg("OTP sent successfully","success")
        setOtpPage(true)
        customMixPanel("Viewed_Adhaar_OTP",false)
      }
      else{
        ToastMsg(res?.data?.message,"error")
      }  
    }).catch((err) => {
      setLoader(false);
      handleError(err)
    });
  }

  const handleValidateAdharOtp = (otp) => {
    customMixPanel("Interacted_Adhaar_OTP","Submit")
    let data = {
      otp: otp,
      client_id: client_id
    }
    setLoader(true);
    verifyAdharOtp(data).then((res) => {
      setLoader(false);

      if(res?.data?.status==="success"){
        navigate("/?type=pan")
      }
      else{
        ToastMsg(res?.data?.message,"error")
      }
     
    }).catch((err) => {
      setLoader(false);
     handleError(err)

      console.log(err);
    });
  }



  return (
    <>
    {loader?<Loader/>:null}
      <section className="provide-pan">
        <Header heading="Verify your Aadhaar" />
      
        <div className="container">
          
          <div className="image-wrapper text-center">
            <img
              src={aadharImg}
              alt="panimg"
              width={130}
              height={200}
              className="pan-img"
            />
          </div>
          {otpPage ?
            <ValidateOtp otpType={6} handleValidateAdharOtp={handleValidateAdharOtp} handlegetAdharOtp={handlegetAdharOtp} />
            : <AadharGetOtp  handlegetAdharOtp={handlegetAdharOtp} />
          }
        </div>
    
        <Footer />
      </section>
    </>
  );
}

export default Aadhar