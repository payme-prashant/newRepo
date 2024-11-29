import React, { useState } from 'react'
import ValidateOtp from './Component/AadharCommon/ValidateOtp'
import Header from './Component/Header'
import otpImg from "../Assets/otp.png"
import Footer from './Component/Footer'
import { ckycResendOtp, ckycVerifyOtp, CLOSING_ENDPOINT } from '../service/service'
import { handleError } from './Common/ToastMsg'
import { Loader } from './Common/Loader'
import { useLocation } from 'react-router-dom'

const CkycOtp = () => {
    const token = localStorage.getItem("token")
    const {state}= useLocation()
    const [loader, setLoader] = useState(false)


    const handleValidateCkycOtp = (otp) => {
        setLoader(true)
        const reqBody = {
            otp: otp
        }

        ckycVerifyOtp(reqBody,token).then((res) => {
            console.log(res)
            window.location.href = CLOSING_ENDPOINT
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