import mixpanel from 'mixpanel-browser';
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import panimage from "../Assets/panimg.png";
import { alphaNumeric, panCardRegex, textOnly } from "../Helper/regex";
import { checkFatherName, CLOSING_ENDPOINT, createCkyc, getStatusData, panVerify } from "../service/service";
import { Loader } from "./Common/Loader";
import { handleError } from "./Common/ToastMsg";
import Footer from './Component/Footer';
import Header from "./Component/Header";


mixpanel.init(process.env.REACT_APP_MIX_PANEL_TOKEN,{debug:true})

const ProvidePan = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate()
  const token = urlParams.get("token");
  const type = urlParams.get("type");
  
  if (token) {
    localStorage.setItem("token", token)
  }
  const [loader, setLoader] = useState()
  const [startDate, setStartDate] = useState();
  const[dob,setDob]=useState(null)
  const [dateValue, setDateValue] = useState(false);
  const [pan, setPan] = useState("")
  const [ckyc, setCkyc] = useState("")
  const [isRequiredFatherName, setIsRequiredFatherName] = useState(false)
  const [fatheName, setfatherName] = useState("")


  const openDatePicker = () => {
    setDateValue(true);
    setStartDate(moment().subtract(18, "years")._d)
  };
  const handleDate = (e) => {
    setStartDate(moment(e).format("YYYY-MM-DD"));
  };

  const handleCancle = () => {
    setDateValue(false);
   
  };
  const handleSetDate = () => {
    setDateValue(false);
    setDob(moment(startDate).format("YYYY-MM-DD"))
  };
  const handleSubmitPanDetails = () => {

    setLoader(true)
    let data = {
      pan_no: pan,
      dob: dob,
    }
    createCkyc(data, token).then((res) => {

  
      if (res.data.phone_verification) {
        window.location.href = CLOSING_ENDPOINT;
      }
      else {
        setLoader(false)
        //navigate("/ckyc-otp",{state:{phone_number:res.data.phone_number}})
        //window.location.href = "/ckyc-otp";
        
        navigate("/selfie?type=kyc", {
          state: { phone_number: res.data.phone_number },
        });
      }

    }).catch((err) => {
      if(err?.response?.status===412){
        handleError(err)
      }
      else{
        //window.location.href = "/aadhar";
      }

      setLoader(false)
      console.log(err);
    });
  }

  const handlePanVerify = () => {

    setLoader(true)
    let data = isRequiredFatherName ? {
      pan_no: pan,
      dob: dob,
      father_name: fatheName
    } : {
      pan_no: pan,
      dob: dob,
    }
    panVerify(data).then((res) => {
      window.location.href = "/selfie?type=kyc";
      setLoader(false)
    }).catch((err) => {
      handleError(err)
      console.log(err);
      setLoader(false)
    });
  }



  useEffect(() => {
    if (type !== "pan") {
      handleStatus()
    } else {
      handleCheckfatherName()
    }

  }, [])
  const handleStatus = () => {
    setLoader(true)
    getStatusData().then((res) => {
      console.log("ppppppp", res.data)
      console.log(res?.data?.pan_card_number, "card number");
      localStorage.setItem("user_id", res?.data?.user_id || false)
      localStorage.setItem("user", res?.data || false);
      localStorage.getItem("adhar", res?.data?.adhar_no)
        setDob(res.data.dob);
        setPan(res?.data?.pan_card_number);
    
    
      

      let status_data = res?.data;
  
      setLoader(false)
      if(status_data.kyc_verified!=="VERIFIED"){
        
        if(!status_data?.adhar_status){
         return;
        }
        else if(!status_data.pan_status){
           window.location.href="/?type=pan"
        }
        else if(!status_data?.selfie){
          window.location.href="/selfie"
        }
       else{
        window.location.href=CLOSING_ENDPOINT;
       }
      }
      else{
        window.location.href=CLOSING_ENDPOINT;
      } 
  mixpanel.identify(res?.data?.user_id);
  mixpanel.people.set({ $name: res?.data?.user_id });
    }).catch((err) => {
      //handleError(err)
      setLoader(false)
    });
  }


  const handleCheckfatherName = () => {
    checkFatherName(token).then((res) => {
      setPan(res?.data?.pan_no)
      setDob(moment(res?.data?.dob).format("YYYY-MM-DD"))
      if (res?.data?.father_name === "not_required") {
        setIsRequiredFatherName(false)
      }
      else {
        setIsRequiredFatherName(true)
      }
    }).catch((err) => {
      handleError(err)
      console.log(err);
    });
  }


  return (
    <>
      {loader ? <Loader /> : null}
      <section className="provide-pan">
        <Header heading="Provide your PAN" />
        <div className="container">
          <div className="image-wrapper text-center">
            <img
              src={panimage}
              alt="panimg"
              width={130}
              height={200}
              className="pan-img"
            />
          </div>
          <div className="mid-section">
            <h2>Your PAN</h2>
            <div className="input-wrapper">
              <input
                className="input"
                name="pan"
                type="text"
                data-testid="pan"
                placeholder=" "
                value={pan}
                onChange={(e) => {
                  if (e.target.value?.match(alphaNumeric)) {
                    setPan(e.target.value.toUpperCase().slice(0, 10));
                  }
                }}
                disabled
              />
              <label className="label">Enter your PAN</label>
            </div>
            <h2>Your date of birth</h2>
            <div onClick={openDatePicker} className="input-wrapper">
              <input
                data-testid="open-date-picker"
                className="input"
                type=""
                placeholder=" "
                value={dob ? moment(dob).format("DD-MM-YYYY") : ""}
              />
              <label className="label">Enter your DOB</label>
              <FaCalendar />
            </div>
            <h2>
              CKYC Number{" "}
              <span class="optional" >(optional)</span>
            </h2>
            <div className="input-wrapper">
              <input
                className="input"
                name="ckyc"
                type="number"
                data-testid="ckyc"
                placeholder=" "
                value={ckyc}
                onChange={(e) => {
                  if (
                    e.target.value.match(/^[0-9]+$/) ||
                    e.target.value === ""
                  ) {
                    setCkyc(e.target.value.slice(0, 14));
                  }
                }}
              />
              <label className="label">Enter CKYC Number</label>
            </div>

            {isRequiredFatherName && type === "pan" && (
              <>
                <h2>Father Name</h2>
                <div className="input-wrapper">
                  <input
                    className="input"
                    name="pan"
                    type="text"
                    data-testid="pan"
                    placeholder=" "
                    value={fatheName}
                    onChange={(e) => {
                      if (e.target.value?.match(textOnly)) {
                        setfatherName(e.target.value.slice(0, 70));
                      }
                    }}
                  />
                  <label className="label">Enter your Father Name</label>
                </div>
              </>
            )}
          </div>
          <div className="text-center">
            {type !== "pan" && (
              <button
                className="facingLink"
                onClick={() => (window.location.href = "/adharnumber")}
              >
                Facing Issue ?
              </button>
            )}
          </div>

          <div className="button-wrapper text-center">
            <button
              className="btn"
              data-testid="view-more"
              onClick={(e) => {
                if (type === "pan") {
                  handlePanVerify();
                } else {
                  handleSubmitPanDetails();
                }
              }}
              disabled={
                !(
                  pan?.match(panCardRegex) &&
                  dob &&
                  (isRequiredFatherName ? fatheName.length > 2 : true)
                )
              }
            >
              Continue
            </button>
          </div>
        </div>
        {dateValue ? (
          <div className="datepickercover">
            <DatePicker
              className="datePickerClass"
              placeholder="Enter your date of birth"
              selected={new Date(startDate)}
              onChange={handleDate}
              dateFormat="dd-MM-yyyy"
              inline
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="DD-MM-YYYY"
              maxDate={moment().subtract(18, "years")._d}
            >
              <div className="small-btn-wrapper flex space-between">
                <button
                  className="small-btn white-small-btn"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
                <button
                  className="small-btn "
                  onClick={handleSetDate}
                  disabled={
                    startDate === undefined || startDate === "" ? true : false
                  }
                >
                  Set
                </button>
              </div>
            </DatePicker>
          </div>
        ) : null}

        <Footer />
      </section>
    </>
  );
}

export default ProvidePan
