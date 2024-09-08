import { isExpired } from "react-jwt";
import { Configuration } from "../services/openapi";
import { JwtConstant } from "../constant/jwt.constant";
import { showToast } from "../context/root.context";

export const getAxiosConfiguration = () => {
    const config: Configuration = new Configuration();
    config.basePath = process.env.REACT_APP_BACKEND_URL;
    const accessToken = localStorage.getItem(JwtConstant.ACCESSTOKENKEY);
    console.trace(accessToken);
    if (accessToken && !isExpired(accessToken)) {
      config.accessToken = accessToken;
    } else if(accessToken) {
        showToast('Token expired please reload to refresh it.');
    }
    return config;
}