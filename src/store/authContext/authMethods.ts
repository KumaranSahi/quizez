import {
  AuthAction,
  UserData,
  SigninPages,
  ChangePassword,
  SigninUser,
  SignedInUserInfo,
} from "./auth.types";
import { Dispatch, SetStateAction } from "react";
import { ResponseTemplate } from "../../Generics.types";
import axios from "axios";
import { APP_URL, setupAuthHeaderForServiceCalls } from "../../axiosUtils";
import { successToast, warningToast, infoToast } from "../../components";

export const signUpUser = async (
  userData: UserData,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>
) => {
  setLoading(true);
  try {
    const { data } = await axios.post<ResponseTemplate>(
      `${APP_URL}/api/users/signup`,
      userData
    );
    if (data.ok) {
      successToast("User Added Successfully");
      setCurrentPage("SIGNIN_PAGE");
      setLoading(false);
    }
  } catch (error: any) {
    if (+error.response.status === 409) {
      infoToast("User already exists in quizez");
      infoToast("Please Try loging in");
      setLoading(false);
      return;
    }
    warningToast("Failed to add user");
    console.log(error);
    setLoading(false);
  }
};

export const checkAuthTimeout = (
  expirationTime: number,
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setTimeout(() => {
    signOutUser(dispatch, setLoading);
  }, expirationTime * (24 * 1000));
};

export const signOutUser = (
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  localStorage.clear();
  setupAuthHeaderForServiceCalls(null);
  dispatch({
    type: "SIGNOUT_USER",
  });
  setLoading(false);
};

export const changePassword = async (
  userData: ChangePassword,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>
) => {
  setLoading(true);
  try {
    const { data } = await axios.post<ResponseTemplate>(
      `${APP_URL}/api/users/password`,
      userData
    );
    if (data.ok) {
      successToast("Password changed successfully");
      setCurrentPage("SIGNIN_PAGE");
    }
    setLoading(false);
  } catch (error) {
    warningToast("Unable to change password please try again later");
    console.log(error);
    setLoading(false);
  }
};

export const onReload = (
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const token = localStorage.getItem("token");
  let date = localStorage.getItem("expiresIn");
  let expiresIn: Date = new Date();
  if (date) expiresIn = new Date(date);
  if (expiresIn <= new Date()) {
    signOutUser(dispatch, setLoading);
  } else {
    const userName = localStorage.getItem("userName");
    const image = localStorage.getItem("image");
    const isAdmin = localStorage.getItem("isAdmin");
    checkAuthTimeout(
      (expiresIn.getTime() - new Date().getTime()) / 1000,
      dispatch,
      setLoading
    );
    setupAuthHeaderForServiceCalls(token!);
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: token,
        userName: userName,
        expiresIn: expiresIn,
        image: image,
        isAdmin: isAdmin,
      },
    });
  }
};

export const signInUser = async (
  emailAndPassword: SigninUser,
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const {
      data: { data, ok },
    } = await axios.post<ResponseTemplate<SignedInUserInfo>>(
      `${APP_URL}/api/users/signin`,
      emailAndPassword
    );
    if (ok) {
      setupAuthHeaderForServiceCalls(data!.token);
      localStorage.setItem("token", data!.token);
      localStorage.setItem("userName", data!.userName);
      data?.isAdmin && localStorage.setItem("isAdmin", data.isAdmin);
      data?.image && localStorage.setItem("image", data.image);
      const expiresIn = new Date(new Date().getTime() + 3600000);
      localStorage.setItem("expiresIn", "" + expiresIn);
      checkAuthTimeout(3600, dispatch, setLoading);
      dispatch({
        type: "SIGNIN_USER",
        payload: {
          token: data!.token,
          userName: data!.userName,
          expiresIn: new Date(expiresIn),
          isAdmin: data?.isAdmin,
          image: data?.image,
        },
      });
      successToast("User Logged in Successfully");
      setLoading(false);
    }
  } catch (error) {
    warningToast("Invalid username or password");
    console.log(error);
    setLoading(false);
  }
};
