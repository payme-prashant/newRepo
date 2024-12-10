import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import selfieIcon from "../Assets/selfie.png";
import { customMixPanel, UserMapping } from "../Helper/regex";
import { CLOSING_ENDPOINT, getPostSignedUrl, uploadDocsToS3, verifySelfie } from "../service/service";
import { Loader } from "./Common/Loader";
import { handleError, ToastMsg } from "./Common/ToastMsg";
import Header from "./Component/Header";

const Selfie = () => {
  const navigate = useNavigate()
  const user_id = localStorage.getItem("user_id")

  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 550,
    height: 550,
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    transform: "translateY(-50%)",
    margin: "0 auto",
    boxShadow: "0 0 0 9px #fff, 0 0 0 12px #ffc022, 0 0px 0px 0px rgb(0 0 0)"
  };

  const image_path = `user_image/${user_id}/user_profile_photo.jpg`;



  const [toggle, setToggle] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [selfieImg, SetSelfie] = useState(false)


  useEffect(() => {
     UserMapping(localStorage.getItem("user_id"))
     customMixPanel("Viewed_Selfie_screen", false)
  }, [])

  const handleUploadSelfie = async (selfie) => {

    let reqBody = new FormData()
    reqBody.append("image_path", image_path)

    setLoader(true)
    getPostSignedUrl(reqBody).then((res) => {
      console.log("resss", res)

      const payload = makeFormData(res.data.presigned_url, selfie)
      payload.append("key", image_path)
      handleUploadOnS3(res.data.presigned_url.url, payload)
      customMixPanel("Interacted_Selfie_screen", "Submit")
      setLoader(false)
      }).catch((err) => {
     
      handleError(err)
      console.log(err);

    });
  }

  async function handleSelfieImage(b64Data) {
    SetSelfie(b64Data)
    const base64Response = await fetch(b64Data);
    const blob = await base64Response.blob();
    handleUploadSelfie(blob)
  }

  const handleSelfieCamera = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      handleSelfieImage(imageSrc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);// eslint-disable-next-line react-hooks/exhaustive-deps

  const handleUploadOnS3 = (url, formData) => {
    uploadDocsToS3(url, formData).then((res) => {
      console.log('res from s3', res)
      if(res?.status===204){
      handleVerifySelfie()
      }

    }).catch((err) => {
      setLoader(false);
    handleError(err)
      console.log(err);
    })
  }

  const handleVerifySelfie = () => {
   
    const reqBody = { ckyc_image_path: image_path };


    verifySelfie(reqBody).then((res) => {
      console.log("response", res)
        if (res?.data?.result==="selfie_verified") {
          customMixPanel("Unity_KYC_Complete", false)
          window.location.href=CLOSING_ENDPOINT
        } else {
          setIsButtonDisabled(true)
          setTimeout(() => {
            setIsButtonDisabled(false)
          }, 4000)
          webcamRef.current =null;
          SetSelfie(null)
          setIsButtonDisabled(false)
          ToastMsg("Selfie Verification Failed Make sure your full face is visible", "error")
        }
       }).catch((err) => {
      handleError(err)
      console.log(err);
    });

  }

  const makeFormData = (result, imageValue) => {
    let formData = new FormData();
    Object.keys(result.fields).forEach((key) => {
      let value = result.fields[key];
      formData.append(key, value);
    });
    formData.append("file", imageValue);
    return formData;
  };

  return (
    <>
      {loader ? <Loader /> : null}
      <section className="provide-pan">
        <Header heading="Click a live selfie for more security" />
        <div className="selfie_c">
          {!selfieImg ?
            <div className="image-wrapper text-center selfie">
              {!toggle ?
                <img
                  src={selfieIcon}
                  alt="selfie"
                  width={286}
                  height={324}
                  className="selfie-img"
                />
                :
                selfieImg ?
                  <img
                    src={selfieImg}
                    alt="selfie"

                    className='selfie-img selfie_img'
                  /> :
                  <Webcam
                    className="camera"
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    screenshotQuality={1}
                    forceScreenshotSourceSize="true"
                    disablePictureInPicture={selfieImg}


                  />
              }
            </div> :
            <div className="image-wrapper text-center mt-232">
              <img
                src={selfieImg}
                alt="selfie"

                className='selfie-img selfie_img'
              />
            </div>}
          <div className="button-wrapper text-center">
            <button className="btn " data-testid="view-more" disabled={isButtonDisabled} onClick={() => {
              if (toggle) {
                handleSelfieCamera()


              }
              else {

                setToggle(true)
                setIsButtonDisabled(true)
                setTimeout(() => {
                  setIsButtonDisabled(false)
                }, 3000)
              }
            }}>
              Continue
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Selfie
