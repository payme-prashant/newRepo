import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { customMixPanel } from '../../Helper/regex';
import ModalBox from '../Help/modalBox';
import { payme_adhar_description,payme_selfie_heading, payme_adhar_list,payme_selfie_list, payme_pan_description, payme_pan_list } from '../Help/modalConstant'

const Header = ({heading}) => {
  
  const path_name = window.location.pathname;
  console.log("path",path_name)
  const [modalState, setModalState] = useState(false);
  const [openDecl, setOpenDecl] = useState(false)
  const fnCheck = () =>{
    if(path_name === '/aadhar'){
      return payme_adhar_list
    }
    else{
      return payme_selfie_list
    }
  }
  const headCheck = () =>{
    if(path_name === '/aadhar'){
      return payme_adhar_description
    }
    else{
      return payme_selfie_heading
    }
  }
  return (
    <>
        <div className="header">
          <div className="head-container">
            <div className="heading-sc space-between ">
              <div className="heading ">
                <h1>{heading}</h1>
              </div>
             
                <div className='quesionmrk'>
              {(path_name === "/aadhar" || path_name === "/selfie") ? 
              <svg onClick={() => {
                
                setModalState(true)
              }} className='mt-5' width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="12.125" stroke="#152745" stroke-width="0.75" />
                <path d="M11.2 15.12C11.12 14.4933 11.16 13.9333 11.32 13.44C11.48 12.9467 11.7 12.5 11.98 12.1C12.2733 11.7 12.5733 11.32 12.88 10.96C13.1867 10.5867 13.4467 10.2133 13.66 9.84C13.8733 9.46667 13.98 9.06 13.98 8.62C13.98 8.24667 13.9067 7.90667 13.76 7.6C13.6133 7.29333 13.3867 7.04667 13.08 6.86C12.7867 6.67333 12.4133 6.58 11.96 6.58C11.52 6.58 11.0933 6.68667 10.68 6.9C10.28 7.1 9.92 7.38667 9.6 7.76L8.76 6.98C9.17333 6.51333 9.66 6.12667 10.22 5.82C10.78 5.51333 11.4133 5.36 12.12 5.36C12.8 5.36 13.38 5.49333 13.86 5.76C14.3533 6.01333 14.7333 6.38 15 6.86C15.28 7.32667 15.42 7.88 15.42 8.52C15.42 9.04 15.3067 9.52 15.08 9.96C14.8667 10.3867 14.6 10.7933 14.28 11.18C13.9733 11.5533 13.6733 11.94 13.38 12.34C13.0867 12.7267 12.8467 13.1467 12.66 13.6C12.4867 14.0533 12.4333 14.56 12.5 15.12H11.2ZM11.9 19.24C11.6067 19.24 11.3467 19.1333 11.12 18.92C10.9067 18.7067 10.8 18.4267 10.8 18.08C10.8 17.72 10.9067 17.4333 11.12 17.22C11.3467 17.0067 11.6067 16.9 11.9 16.9C12.2067 16.9 12.4667 17.0067 12.68 17.22C12.8933 17.4333 13 17.72 13 18.08C13 18.4267 12.8933 18.7067 12.68 18.92C12.4667 19.1333 12.2067 19.24 11.9 19.24Z" fill="#152745" />
              </svg> : null}
              </div>

           
            </div>
          </div>
        </div>
        <Popup open={openDecl && path_name === "salaried"} closeOnDocumentClick onClose={() => setOpenDecl(false)} className="declairation" position="bottom center">
        <div className='declairation text-center'>
           <h1>Why ?</h1>
          <p className=" mb-25">
            To accelerate the process of evaluating your credit limit, providing your UAN number along with your office address, pin code, city, and other relevant details, will enable us to retrieve your employment information efficiently.
          </p>
          <button onClick={() => {
             customMixPanel("Interacted_Help_Salaried_Customer_Details",localStorage.getItem('Platform'),localStorage.getItem('userType'),"Okay")
            setOpenDecl(false)
          }} className='btnPopUp'>Okay</button>

        </div>
      </Popup>
      {modalState  && <ModalBox open={modalState}   List={fnCheck()} heading={headCheck()} onChange={(props)=>{setModalState(props)}}   />}
    </>
  )
}

export default Header