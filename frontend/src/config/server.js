/* eslint-disable no-unused-vars */
import axios from "axios";


const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL,
})

export default axiosRequest;