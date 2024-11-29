import mixpanel from 'mixpanel-browser';
import React, { useState } from "react";
import { Popup } from "reactjs-popup";
import imageCross from "../../Assets/corssSvg.svg";
import imageDownFille from "../../Assets/downfilledSvg.svg";
import imageDownNotFilled from "../../Assets/downnotfilledsvg.svg";
import imageUpNotFilled from "../../Assets/downsvg.svg";
import imageCap from "../../Assets/nocapSvg.svg";
import imageGlass from "../../Assets/noglassSvg.svg";
import imageMask from "../../Assets/nomaskSvg.svg";
import imageTick from "../../Assets/ticksvg.svg";
import imageUpFille from "../../Assets/upfilledSvg.svg";
mixpanel.init(process.env.REACT_APP_MIX_PANEL_TOKEN,{debug:true})

function ModalBox(props) {
  const link = window.location.pathname
  console.log('link_path',window.location)
  const fnCondition = () =>{
    if(link==='/'){
      return "PAN screen"
    }
    else if(link === '/selfie'){
          return "Selfie"
    }
    else{
      return "Aadhaar card";
    }
  }
  const {heading, fnClick, open, List, onChange, imagesVisible } = props;
  const [like, setLike] = useState(true);
  const [unlike, setUnlike] = useState(true);
  mixpanel.track("Viewed_Help_Screen", {"Screen Name":fnCondition(), "Platform" : window.screen.width <991 ?"App":"Web"})
 

  const eventOrganiser = (eventType) =>{
    if(eventType === 'close'){
      onChange(false)
      mixpanel.track("Interacted_Help_Screen", {"Screen Name":fnCondition(),"User Action":"Pop Up Closed",  "Platform" : window.screen.width <991 ?"App":"Web"})
    }
    else if(eventType === 'down') {
      setLike(false)
      setTimeout(()=>{onChange()}, 100)
      mixpanel.track("Interacted_Help_Screen", {"Screen Name":fnCondition(), "User Action":"Thumbs Down", "Platform" : window.screen.width <991 ?"App":"Web"}) 
    }
    else if(eventType === 'up' ) {
      setUnlike(false)
      setTimeout(()=>{onChange()}, 100)
      mixpanel.track("Interacted_Help_Screen", {"Screen Name":fnCondition(), "User Action":"Thumbs Up", "Platform" :window.screen.width <991 ?"App":"Web"}) 
    }
  }

  return (
    <>
      <Popup open={open} modal onClose={()=>{onChange()}} closeOnDocumentClick={true}  >
        <div className="popup-box-center">
          <div className="popup-div">
            <div className="modal-header">
              <div className="cross">
                <img data-testid="crossButtonID" onClick={()=>{eventOrganiser('close')}} src={imageCross} className="crossImage" />
              </div>
            </div>
            <div className="list-section">
              <span class="headSpan"> {heading} </span>
              <div className="pt-3">
                 {List?.map((word, index) => {
                return (
                  <div key={index} className="tickSection">
                    <img src={imageTick}  />
                    <span className="section-span">
                      {word}
                    </span>
                  </div>
                );
              })}
              </div>
      
            </div>

            { link==="/selfie" && <div class="no-images pt-4">
              <img className='image-popup' src={imageMask} />
              <img className='image-popup' src={imageGlass} />
              <img className='image-popup' src={imageCap} />
            </div>}
            <div>
              <p className="popup-p-text">Was this information helpful?</p>
              <div className="like-unlike-section">
                 {unlike ? (
                  <img data-testid="thumbsUpID" onClick={()=>{eventOrganiser('up')}} src={imageDownNotFilled} />
                ) : (
                  <img src={imageUpFille} />
                )}
                {like ? (
                  <img data-testid="thumbsDownID" onClick={()=>{eventOrganiser('down')}} src={imageUpNotFilled } />
                ) : (
                  <img src={imageDownFille} />
                )}
               
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default ModalBox;
