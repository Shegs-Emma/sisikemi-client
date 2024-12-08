import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { QueryClient } from "@tanstack/react-query";
import Router from "next/router";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 25000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    let accessToken = getCookie("accessToken");

    if (!accessToken) {
      console.log("access token not found");
      const userStorageString = localStorage.getItem("user-storage");

      if (userStorageString) {
        const userStorage = JSON.parse(userStorageString);

        if (
          userStorage &&
          userStorage.state &&
          userStorage.state.user &&
          userStorage.state.user.token
        ) {
          accessToken = userStorage.state.user.token.accessToken || "";
          const refreshToken = userStorage.state.user.token.refreshToken || "";

          console.log("Setting cookies from local storage state...");

          // Set the cookies with the tokens from the state
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);
        }
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      console.log("401 error encountered. Attempting to refresh token...");
      try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          throw new Error("refresh token not found");
        }

        const refreshedResponse = await axios.post(
          `${API_URL}auth/refresh-token`,
          {
            refreshToken: refreshToken,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        console.log("Refreshed access token:", refreshedResponse);

        setCookie(
          "accessToken",
          refreshedResponse.data?.data?.accessToken || ""
        );

        setCookie(
          "refreshToken",
          refreshedResponse.data?.data?.refreshToken || ""
        );

        originalRequest.headers.Authorization = `JWT ${
          refreshedResponse.data?.data?.accessToken || ""
        }`;
        return api.request(originalRequest);
      } catch (err) {
        console.error("Error refreshing access token:", err);
        console.log("Clearing localStorage and redirecting to '/'...");
        clearAndRedirect();
      }
    } else {
      console.error("Non-401 error or failed retry:", error);
      console.log("Clearing localStorage and redirecting to '/'...");
      // clearAndRedirect();
    }

    return Promise.reject(error);
  }
);

const clearAndRedirect = () => {
  try {
    console.log("Clearing localStorage...");
    localStorage.clear();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    console.log("Redirecting to '/'...");
    Router.push("/");
  } catch (clearError) {
    console.error("Error during clear and redirect:", clearError);
  }
};

const queryClient = new QueryClient();
export { queryClient };
