import axios from "axios";

export const setupAuthHeaderForServiceCalls = (token: string | null) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = "Bearer " + token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const APP_URL = "https://quizez-api.herokuapp.com";

export const setupAuthExceptionHandler = (push: (arg1: string) => void) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        push("/signin");
      }
      return Promise.reject(error);
    }
  );
};
