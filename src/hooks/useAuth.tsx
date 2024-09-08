import { Configuration } from "../services/openapi";

const useAuth = () => {
  //access the accesstoken / refreshtoken here
  const setAccessTokenInAxios = (configuartion: Configuration) => {
    configuartion.accessToken = "test-accesstoken";
    return configuartion;
  };
  const setRefreshTokenInAxios = (configuartion: Configuration) => {
    configuartion.accessToken = "test-refresh-accesstoken";
    return configuartion;
  };
  return { setAccessTokenInAxios, setRefreshTokenInAxios };
};
export default useAuth;
