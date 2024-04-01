import { publicAxios, privateReq } from "./axios-config";

const doSignupMVC=(obj)=>{
    return publicAxios.post("/user/do-signup",obj)
}
const doLoginMVC=(obj)=>{
    return publicAxios.post("/user/do-login",obj)
}
const doSaveWithAxiosMVC=(obj)=>{
    return publicAxios.post("/grower/add-profile",obj);
}
const doUpdateWithAxiosMVC=(obj)=>{
    return publicAxios.post("/grower/update-profile",obj);
}
const doFetchProfileWithAxiosMVC=(email)=>{
    console.log(email);
    return publicAxios.get("/grower/one-profile?emailid="+email);
}
const doSaveCPWithAxiosMVC=(obj)=>{
    return publicAxios.post("/Consumer/add-profile",obj);
}
const doUpdateCPWithAxiosMVC=(obj)=>{
    return publicAxios.post("/consumer/update-profile",obj);
}
const doFetchCPWithAxiosMVC=(email)=>{
    //console.log(email);
    return publicAxios.get("/consumer/one-profile?emailid="+email);
}
//=============privateReq(ONLY FOR VALIDATING TOKEN)==============
const doValidateTokenWithAxios=()=>{
    return privateReq.get("/user/token-validation");
}
//=============IMPLEMENTING TOKEN VALIDATION ON FETCH API=========
const doFetchGPAndValidateToken=(email)=>
{
   return privateReq.get("/grower/one-profile-validatetoken?emailid="+email);
}
export {doSignupMVC,doLoginMVC,doSaveWithAxiosMVC,doUpdateWithAxiosMVC,doFetchProfileWithAxiosMVC,doValidateTokenWithAxios,doSaveCPWithAxiosMVC,doUpdateCPWithAxiosMVC,doFetchCPWithAxiosMVC,doFetchGPAndValidateToken}