import React from 'react';
import footerimg from "../../Assets/footer.png"

const Footer = () => {
  return (
    <>
        <div className='footer'>
            <img src={footerimg} alt='footer' width={85} height={23} className='footer-img'/>
        </div>
    </>
  )
}

export default Footer