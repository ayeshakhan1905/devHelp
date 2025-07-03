import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://devhelp-8q1x.onrender.com/api",
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
    const isAuthError = err.response?.status === 401 || err.response?.data?.message === "Token not found";
    const onLoginPage = window.location.pathname === "/login";

    if (isAuthError && !onLoginPage) {
      window.location.href = "/login";
    }
})

export default axiosInstance;