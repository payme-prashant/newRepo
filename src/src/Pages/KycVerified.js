import React, { useEffect, useRef, useState } from 'react';
import process from "../Assets/process.gif";
import { UserMapping, customMixPanel } from '../Helper/regex';
import { Loader } from './Common/Loader';



const KycVerified = () => {
  const [loader, setLoader] = useState(false)
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
       UserMapping(localStorage.getItem("user_id"))
       customMixPanel("Application_Process", false)

      hasMounted.current = true;
    }

  }, [])

  return (
    <>
      {loader ? <Loader /> : null}
      <div className='kyc text-center'>
        <div className="container">
          <div className="image-wrapper text-center mt-60 mb-30">
            <img
              src={process}
              alt="panimg"
              width={316}
              height={317}
              className="pan-img"
            />
          </div>
          <h1 className='mb-25'>Your KYC is verified</h1>
         
          <div className="button-wrapper text-center mt-150">
            <button className="btn" data-testid="back_to_home" onClick={() => {
              customMixPanel("Interacted_Loan_Application_Process", "Back to home")
              window.location.href = "https://apiv2.paymeindia.in/close/"
            }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default KycVerified