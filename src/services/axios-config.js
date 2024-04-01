//MVC Industry Based Design
import axios from 'axios';

const baseURL="http://localhost:2007";                         //baseURL is case sensitive, hence don't change it else Error 404 will be encountered due to problem in finding route(path)

const publicAxios=axios.create({baseURL});

const privateReq = axios.create({ baseURL});                   //Inteceptors allows us to send a token automat within privateReq thus we don't hv to add it individually each time
privateReq.interceptors.request.use((config)=>{       

  const token = localStorage.getItem("token");                 
  
  if(token){                                                   //If token exists, user will be validated else it means token has been removed from localStorage
    config.headers.Authorization = `Bearer ${token}`;          //Bearer token
  }

  return config;
});

export {publicAxios,baseURL,privateReq};