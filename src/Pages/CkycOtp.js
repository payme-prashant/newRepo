import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import otpImg from "../Assets/otp.png"
import { ckycResendOtp, ckycVerifyOtp } from '../service/service'
import { Loader } from './Common/Loader'
import { handleError } from './Common/ToastMsg'
import ValidateOtp from './Component/AadharCommon/ValidateOtp'
import Footer from './Component/Footer'
import Header from './Component/Header'

const CkycOtp = () => {
    const token = localStorage.getItem("token")
    const {state}= useLocation()
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleValidateCkycOtp = (otp) => {
        setLoader(true)
        const reqBody = {
            otp: otp
        }

        ckycVerifyOtp(reqBody,token).then((res) => {
            console.log(res)
             navigate("/selfie?type=kyc");
            //window.location.href = CLOSING_ENDPOINT
            setLoader(false)
        }).catch((err) => {
            setLoader(false);
            handleError(err)
        })



    }
    const handlegeResendOtp = () => {
        ckycResendOtp(token).then((res) => {
           
        }).catch((err) => {
            setLoader(false);
            handleError(err)
        })

    }
    return (
        <>
        {loader?<Loader/>:
            <section className="provide-pan">
                <Header heading="Verify your Ckyc" />

                <div className="container">

                    <div className="image-wrapper text-center">
                        <img
                            src={otpImg}
                            alt="panimg"
                            width={176}
                            height={200}
                            className="pan-img"
                        />
                    </div>
                    <ValidateOtp phone_number={state?.phone_number} otpType={4} handleValidateAdharOtp={handleValidateCkycOtp} handlegetAdharOtp={handlegeResendOtp} />
                </div>

                <Footer />
            </section>

        }

        </>
    )
}

export default CkycOtp