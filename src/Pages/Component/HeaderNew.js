import React, { useState } from "react";
import questionMark from "../../Assets/questionsvg.svg";
import ModalBox from "../Help/modalBox";
import {
    payme_adhar_description,
    payme_adhar_list,
    payme_pan_description,
    payme_pan_list,
} from "../Help/modalConstant";

const HeaderNew = ({ heading, questionState = true }) => {
  const [modalState, setModalState] = useState(false);
  const link = window.location.pathname;
  console.log(link, "result");
  //   mixpanel.init("a2d443c0325cd9901372e3d0492e417b",{
  //     debug:true
  // })
  const fnCheck = () => {
    if (link === "/") {
      return payme_pan_list;
    } else {
      return payme_adhar_list;
    }
  };
  const headCheck = () => {
    if (link === "/") {
      return payme_pan_description;
    } else {
      return payme_adhar_description;
    }
  };
  return (
    <>
      <div className="header">
        <div className="head-container">
          <div className="heading-sc">
            <div
              className={
                link === "/adharnumber" || link === "/password"
                  ? "heading  headerDiv2"
                  : " heading  headerDiv justify-content-start"
              }
            >
              <h1 className="verifyfont">{heading}</h1>
              {link !== "/" && questionState && (
                <img
                  data-testid="crossButtonID1"
                  className={
                    link === "/adharnumber" || link === "/password"
                      ? "adharHead"
                      : ""
                  }
                  onClick={() => {
                    setModalState(true);
                  }}
                  src={questionMark}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalState && (
        <ModalBox
          open={modalState}
          List={fnCheck()}
          heading={headCheck()}
          onChange={(props) => {
            setModalState(props);
          }}
          imagesVisible={false}
        />
      )}
    </>
  );
};

export default HeaderNew;
