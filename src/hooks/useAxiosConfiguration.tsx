import { isExpired } from "react-jwt";
import { JwtConstant } from "../constant/jwt.constant";
import { Configuration } from "../services/openapi";
import { showToast } from "../context/root.context";

const useAxiosConfiguration = () => {
  const config: Configuration = new Configuration();
  config.basePath = process.env.REACT_APP_BACKEND_URL;
  //access the accesstoken / refreshtoken here
  const getAxiosConfiguration = () => {
    const accessToken = localStorage.getItem(JwtConstant.ACCESSTOKENKEY);
    console.trace(accessToken);
    if (accessToken && !isExpired(accessToken)) {
      config.accessToken = accessToken;
    } else if (accessToken) {
      showToast("Token expired please reload to refresh it.");
    }
    return config;
  };
  return { getAxiosConfiguration };
};
export default useAxiosConfiguration;
