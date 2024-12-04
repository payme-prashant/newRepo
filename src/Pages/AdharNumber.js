import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Loader } from "../../src/Pages/Common/Loader";
import adhar from "../Assets/adhar.png";
import sslImage from "../Assets/sslCertificate.png";
import { aadhaarSendOtp } from "../service/service";
import HeaderNew from "./Component/HeaderNew";
const AadhaarNumber = (props) => {
  const [aadhaar_no, setaadhaar_no] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [adharNoData, setadharNoData] = useState("");

  //const navigate =  useNavigate()
  const [state, setState] = useState({
    aadhaarNumber: "",
    confirmAadhaarNumber: "",
    error_message: "",
  });

  const formatAndSetaadhaar_no = (e) => {
    const inputVal = e.target.value.replace(/ /g, "");
    var inputNumbersOnly = inputVal.replace(/\D/g, "");
    if (inputNumbersOnly.length > 12) {
      inputNumbersOnly = inputNumbersOnly.substr(0, 12);
    }
    const splits = inputNumbersOnly.match(/.{1,4}/g);
    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" ");
    }
    setadharNoData(inputNumbersOnly);
    setaadhaar_no(spacedNumber.trim());
  };

  const onFinish = () => {
    let { aadhaarNumber, adhar_number } = state;
    var data = {
      aadhaar_no: adharNoData,
    };
    if (adharNoData) {
      setLoading(true);
     aadhaarSendOtp(data)
        .then((res) => {
          let detail = {
            aadhaarNumber: adhar_number,
            client_id: res.data.data.client_id,
          };
          console.log(aadhaarNumber, "3adhar_number");
          setLoading(false);
          props.history.push("/aadhar", { otpDetail: detail });
        })
        .catch((err) => {
            alert(err.data.error)
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="custom-ui">
                  <h1>Error</h1>
                  <div style={{ color: "#152745" }} className="errMessage">
                    {err.data.error}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#FC6603",
                        color: "#FFFFFF",
                        border: "none",
                        outline: "none",
                        borderRadius: 5,
                      }}
                      onClick={onClose}
                    >
                      OK
                    </button>
                  </div>
                </div>
              );
            },
          });
          setLoading(false);
        });
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          let { adhar_number } = state;
          return (
            <div className="custom-ui">
              <h1>Error</h1>
              <div style={{ color: "#152745" }} className="errMessage">
                Aadhar number not correct
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#FC6603",
                    color: "#FFFFFF",
                    border: "none",
                    outline: "none",
                    borderRadius: 5,
                  }}
                  onClick={onClose}
                >
                  OK
                </button>
              </div>
            </div>
          );
        },
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="react_loading">
          <Loader />
        </div>
      ) : null}
      <HeaderNew heading="Verify your Aadhaar" />
      <div className="container">
        <div className="pb-4">
          {/* <div className="page-title d-flex align-items-center gap-25 col-sm-10 imageCard">
              <img src={side} onClick={()=>{props.history.push('/')}}/>
             <span className="fontVerify">Verify your Aadhaar</span>
            </div> */}

          <div className="">
            <div className="card-height adharCardHeight w-100 text-center mx-auto bg-gray rounded-40 ">
              {/* <StepProgressBar status="create" />  */}
              <div class="h-70 d-flex flex-column justify-content-between">
                <div className="pt-4">
                  <img
                    src={adhar}
                    className="res-img"
                    alt="PaymeIndia"
                    width={259}
                    height={280}
                    style={{ maxWidth: "259px" }}
                  />
                </div>
                <br />
                <br />
                <div className=" flex">
                  <h2 className="text-left margin-b">Your Aadhaar</h2>
                  <div class="did-floating-label-content rounded-lg">
                    <input
                      data-testid="inputBox"
                      className="did-floating-input input rounded-lg"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      value={aadhaar_no}
                      name="aadhaarNumber"
                      onChange={formatAndSetaadhaar_no}
                    />
                  </div>
                </div>
                <br />
                <p className="ant-form-item-extra px-3 pt-3">
                  Please ensure your number is registered with Aadhaar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {aadhaar_no.length === 14 ? (
          <button
            type="submit"
            className="btn bg-orange btnContinue text-white rounded-lg px-5"
            onClick={onFinish}
          >
            Get OTP
          </button>
        ) : (
          <button className="btn bg-orange btnContinue text-white rounded-lg px-5 opacity-50">
            Get OTP
          </button>
        )}
      </div>
      <div className="imgDiv">
        <img src={sslImage} className="sslImage" />
      </div>
    </>
  );
};


export default AadhaarNumber;
