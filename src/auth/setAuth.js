import axiosInstance from '../axios-Instance';

const setAuthToken=(token)=>{
    if(token){
        axiosInstance.defaults.headers.common["Authorization"]=`${token}`
    }
}
export default setAuthToken;