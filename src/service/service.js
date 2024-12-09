import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const PAYME_API_ENDPOINT = process.env.REACT_APP_PAYME_API_ENDPOINT
export const CLOSING_ENDPOINT = process.env.REACT_APP_CLOSING_URL




const urlParams = new URLSearchParams(window.location.search);
const tokenS = urlParams.get("token");
let token = ""
if (tokenS) {
  localStorage.setItem("token", tokenS);
  const token = tokenS;
}
else{
  const token = localStorage.getItem("token");
}


token = localStorage.getItem("token")? localStorage.getItem("token") : tokenS;
  
const headersApplicationJson = {
  "Content-Type": "application/json",

};
if (token) {
  axios.defaults.headers.common["Authorization"] = `${token}`;
}

export const createCkyc = (params, tokenValue) => {
  const url = `${API_ENDPOINT}/api/ekyc/ckyc/verify/`;
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue ? tokenValue : token
    }
  });
};
export const createCkycVeri = (params, tokenValue) => {
  const url = `${API_ENDPOINT}/api/ekyc/ckyc/verification/`;
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue ? tokenValue : token,
    },
  });
};

export const ckycVerifyOtp = (data, token) => {
  let url =
    `${API_ENDPOINT}/api/ekyc/ckyc/otp_verify/`;
  let config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  return axios.post(url, data, config)
};
export const ckycResendOtp = (token) => {
  let url =
    `${API_ENDPOINT}/api/ekyc/ckyc/resend_otp/`;
  let config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  return axios.post(url, {}, config)
};


export const sendAdharOtp = (params) => {
  const url = `${API_ENDPOINT}/api/ekyc/aadhaar_send_otp/`;
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
};

export const verifyAdharOtp = (params) => {
  const url = `${API_ENDPOINT}/api/ekyc/aadhaar_verify_otp/`;
  return axios.post(url, params, {
    headers: headersApplicationJson,
  });
};


export const getPostSignedUrl = (params) => {
  const url = `${API_ENDPOINT}/api/ekyc/v2/selfie/get-post-signed-url/`
  return axios.post(url, params, {
    headers: headersApplicationJson,
  });
};



export const verifySelfie = (params) => {
  const url = `${API_ENDPOINT}/api/ekyc/selfie/verify/`
  return axios.post(url, params, {
    headers: headersApplicationJson,
  });
};


export const panVerify = (reqBody) => {
  let url =
    `${API_ENDPOINT}/api/ekyc/pan/verify/`;

  return axios.post(url, reqBody, {
    headers: headersApplicationJson,
  })

};
export const getStatusData1 = (tokenValue) => {
  let token_first = tokenValue ? tokenValue : token;
  const url = `${PAYME_API_ENDPOINT}/api/jwt-auth/get-basic-info-by-token/`
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
};
export const getStatusData = (tokenvalue) => {
  let url = `${PAYME_API_ENDPOINT}/api/jwt-auth/get-basic-info-by-token/`;
  return axios
      .get(url, {
        headers: {
          Authorization: "Token " + token,
        },
      })

};

export const checkFatherName = (tokenValue) => {
  const url = `${API_ENDPOINT}/api/ekyc/pan/check_father_name/`
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue ? tokenValue : token
    }
  });
};


export const aadhaarSendOtp = ( data ) => {
  let url =
    `${API_ENDPOINT}/api/ekyc/aadhaar_send_otp/`;
    let config = {
      headers: {
          Authorization :  token,
          'Content-Type': 'application/json'
  
        }
    }
  return new Promise((resolve, reject) => {
      axios.post(url, data, config
      )
      .then((res) => {
          return resolve(res)
      })
      .catch((err) => {
          return reject(err.response)
      })
    });
};

export const uploadDocsToS3 = (url, formData) => {
  const instance = axios.create();
  delete instance.defaults.headers.common['Authorization'];
  return instance.post(url, formData)

};

