import { useContext, useState } from "react";
import {
  handleApiError,
  rootContext,
  showToast,
} from "../context/root.context";
import {
  EmailAuthDto,
  TokenResponse,
  UserAuthApi,
} from "../services/openapi";
import { decodeToken } from "react-jwt";
import useAxiosConfiguration from "./useAxiosConfiguration";

const useUserAuthApi = () => {
  const root = useContext(rootContext);
  const { getAxiosConfiguration } = useAxiosConfiguration();

  const api = new UserAuthApi(getAxiosConfiguration());

  const setAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = decodeToken(token);
      //need to check if valid token
      console.trace(decodeToken);
      return decodedToken.sub;
    }
  };

  const setTokenResponse = (tokenResponse: TokenResponse) => {
    localStorage.setItem("token", tokenResponse.accessToken);
    localStorage.setItem("refresh-token", tokenResponse.refreshToken);
    console.trace(tokenResponse);
    if (root) {
      const decodedToken: any = decodeToken(tokenResponse.accessToken);
      console.trace(decodeToken);
      root.setUserId(decodedToken.sub);
    }
  };

  const clearTokens = () => {
    localStorage.clear();
    if (root) {
      root.setUserId("");
    }
  };

  const handleLoginUsingEmail = async (data: EmailAuthDto) => {
    try {
      const resp = (
        await api.userAuthControllerSigninUsingEmailAndPassword(data)
      ).data;
      setTokenResponse(resp);
      showToast("Login Successful");
      return resp;
    } catch (e) {
      handleApiError(e);
    }
  };

  const handleRefreshToken = async () => {
    try {
      const config = getAxiosConfiguration();
      const refreshToken = localStorage.getItem("refresh-token");
      if (refreshToken) {
        config.accessToken = refreshToken;
      }
      const authApi = new UserAuthApi(config);
      const resp = (await authApi.userAuthControllerRefreshToken()).data;
      setTokenResponse(resp);
      showToast("token refreshed Successfully.");
      return resp;
    } catch (e) {
      handleApiError(e);
    }
  };

  const handleLogout = async () => {
    try {
      const config = getAxiosConfiguration();
      const authApi = new UserAuthApi(config);
      const resp = (await authApi.userAuthControllerLogoutUser()).data;
      clearTokens();
      showToast("Logout Successfully.");
    } catch (e) {
      handleApiError(e);
    }
  };

  return { handleLoginUsingEmail, handleRefreshToken, handleLogout, setAuthentication };
};

export default useUserAuthApi;
