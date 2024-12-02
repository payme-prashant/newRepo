import axios from "axios";
const API_ENDPOINT = "https://paplu.paymeindia.in";
const PAYME_API_ENDPOINT = "https://ekyc-apiv2.paymeindia.in";
export const CLOSING_ENDPOINT = process.env.REACT_APP_CLOSING_URL

const token = localStorage.getItem("token");


const headersApplicationJson = {
  "Content-Type": "application/json",

};
if (token) {
  axios.defaults.headers.common["Authorization"] = `${token}`;
}

export const createCkyc = (params, tokenValue) => {
  const url = `https://ekyc-apiv2.paymeindia.in/api/ekyc/ckyc/verify/`;
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": tokenValue ? tokenValue : token
    }
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
export const getStatusData = (tokenValue) => {
  let token_first = tokenValue ? tokenValue : token;
  let url = `${PAYME_API_ENDPOINT}/api/jwt-auth/get-basic-info-by-token1/`
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token_first || token
    }
  });
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

export const uploadDocsToS3 = (url, formData) => {
  const instance = axios.create();
  delete instance.defaults.headers.common['Authorization'];
  return instance.post(url, formData)

};

