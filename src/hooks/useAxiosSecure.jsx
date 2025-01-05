import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
export const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
})
// https://bistro-boss-server-jet-eta.vercel.app
const useAxiosSecure = () => {

  const navigate = useNavigate();
  const { logOut } = useAuth();

  // interceptors request
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // interseptors responce
  axiosSecure.interceptors.response.use(function (responce) {
    return responce;
  }, async (error) => {
    const status = error.responce.status;
    if (status === 401 || status === 403) {
      await logOut();
      navigate('/login');
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;

// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });