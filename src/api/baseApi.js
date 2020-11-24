import config from '../configs/keycloakconfig';
import axios from "axios";
import qs from 'query-string';
var token=null;
const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Bearer ${token.access_token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });
axiosApiInstance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken(token);  
      token= newToken.data;     
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken.data.access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  });
const authentication=()=>{
   return axios.post(config.issuer,qs.stringify({
    'grant_type':'client_credentials'
}),
    {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'Basic ' +Buffer.from(`${config.clientId}:${config.clientSecret}`, 'utf8').toString('base64')
        }
    });
}
const getCreditScoreByPhone=(phoneNumber)=>{
    return axiosApiInstance.get(`${config.apiData}/${phoneNumber}`);
}
const refreshToken=(token)=>{
    return axios.post(config.issuer,qs.stringify({
        'grant_type':'refresh_token',
        'refresh_token':token.refresh_token
    }),
        {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':'Basic ' +Buffer.from(`${config.clientId}:${config.clientSecret}`, 'utf8').toString('base64')
            }
        });
}
 const searchByPhoneNumber= async (phoneNumber)=>{
    if(!token){
        try {
            var tokenServer=await authentication();
            debugger;
            token=tokenServer.data;
            var creditScore= await getCreditScoreByPhone(phoneNumber);
            return creditScore.data;
        } catch (err) {
            debugger;
            if (err.response.status === 404) {
                throw "Phone number not found";
            }else{
                throw "Server is busy, please try again later";
            }           
        }
    }else{
        try{
            var creditScore= await getCreditScoreByPhone(phoneNumber);
            return creditScore.data;
        }catch(err){
            if (err.response.status === 404) {
                throw "Phone number not found";
            }else{
                throw "Server is busy, please try again later";
            }     
        }
    }
 }
export {
    authentication,
    getCreditScoreByPhone,
    refreshToken,
    searchByPhoneNumber
}