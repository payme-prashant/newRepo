import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { customMixPanel } from '../../../Helper/regex';

const ValidateOtp = ({handleValidateAdharOtp,handlegetAdharOtp,otpType,phone_number}) => {
 
    const [otp, setOtp] = useState("");
    const[counter,setCounter]=useState(59)
    useEffect(() => {
      customMixPanel("Viewed_Adhaar_OTP",false)
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
  
  return (
    <>
        <div className="mid-section">
            {otpType===4?<h2 className='fs-18'>Enter OTP sent to mobile XXXXXX{phone_number?phone_number.slice(6,10):''}</h2>:<h2>Enter OTP from UIDAI</h2>}
            <OtpInput
              containerStyle={otpType===4?"otp-input-itr":"otp-input"}
              inputType="number"
              value={otp}
              onChange={setOtp}
              numInputs={otpType}
              renderInput={(props) => <input {...props} />
            }
            /> 
            <div className='text-center d-grid'>
              <br/>
              <br/>
              <span>
                Didn't receive OTP ?
              </span>
              <br/>
              <span className={counter>0?"":"resend"} onClick={()=>{
                if(counter<=0){
                  setOtp("")
                  setCounter(59)
                   handlegetAdharOtp()
                }
               }}>
                Re-send  {counter>0?("in " +counter):""}
              </span>

              </div>          
          </div>
          <div className="button-wrapper text-center">
            <button className="btn" data-testid="view-more" onClick={()=>handleValidateAdharOtp(otp)} disabled={otpType===6? otp.length!==6:otp.length!==4} >
              Validate your OTP
            </button>
        </div>
    </>
  )
}

export default ValidateOtp