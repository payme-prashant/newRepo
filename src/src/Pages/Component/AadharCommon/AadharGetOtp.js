import React, { useState } from 'react'
import { adharRegex } from '../../../Helper/regex'

const AadharGetOtp = ({handlegetAdharOtp}) => {
  const[adhar,setAdhar]=useState("")

  const handleAadhaarFromat = (value) => {
    let inputValue = value?.replace(/-/g, '').slice(0, 12).toUpperCase();

    let formattedValue = '';
    for (let i = 0; i < inputValue?.length; i++) {
        if (i === 4 || i === 8) {

            formattedValue += '             ';
        }
        formattedValue += inputValue[i];
    }
    return formattedValue
}
  
  return (
    <>
        <div className="mid-section">
            <h2>Your Aadhaar Number</h2>
            <div className="input-wrapper">
              <input id="ac" className='adhar' name="ac" data-testid="adharipnut" pattern="(\d{4}\s?){4}" type="text" placeholder='XXXX         XXXX         XXXX'  value={handleAadhaarFromat(adhar)} onWheel={(e) => e.target.blur()} onChange={(e)=>{
             
             setAdhar(e.target.value.replace(/[^0-9.]/g, '').slice(0, 12)
               )
              }} />   
            </div>            
          </div>
          <div className="mt-50">
            <p className="note">
            Please ensure your mobile number is linked with Aadhaar
            </p>
          </div>
          <div className="button-wrapper text-center">
            <button className="btn" data-testid="view-more" disabled={!adhar.match(adharRegex)} onClick={()=>{
              handlegetAdharOtp(adhar)
            }}>
              Get OTP
            </button>
          </div>
    </>
  )
}

export default AadharGetOtp