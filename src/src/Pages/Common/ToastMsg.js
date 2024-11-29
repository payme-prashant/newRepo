import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CLOSING_ENDPOINT } from "../../service/service";


export  function handleError (err){
  switch (err?.response?.status) {
   
    case 401:
      window.location.href =  CLOSING_ENDPOINT;
      ToastMsg(err?.response?.data?.error?.detail,"error")
      //localStorage.removeItem("token");
      break;
    default:
      
      let error = err?.response?.data?.response_json?.message||err?.response?.data?.error||err?.response?.data?.error?.detail;
      ToastMsg(error, "error");
  }
}
export function ToastMsg(msg, msgType) {
  const message =msg?msg:"something went wrong";
   return msgType === "success"
    ? toast.success(`${message}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      })
    : toast.error(`${message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
}