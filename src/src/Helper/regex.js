import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.REACT_APP_MIX_PANEL_TOKEN, { debug: true });

export const alphaNumeric = "^[a-zA-Z0-9_]*$";
export const textOnly = "^[a-zA-Z  ]*$";
export const panCardRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export const ifscRegex = "^[A-Z]{4}0[A-Z0-9]{6}$";
export const adharRegex = /^([2-9]){1}([0-9]){11}?$/;


console.log("width", window.innerWidth)
let Platform = "Website";
if (window.innerWidth < 1000) {
    Platform = "App"
}

export const UserMapping = (user_id) => {
    
   
       return
    
    }


export const customMixPanel = (event, attribute) => {
  return

}
