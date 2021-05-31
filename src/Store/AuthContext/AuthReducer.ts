import {
  State,
  AuthAction,
  UserData,
  SigninPages,
  ChangePassword,
  SigninUser,
  SignedInUserInfo,
} from "./AuthContext.types";
import { Dispatch, SetStateAction } from "react";
import { ResponseTemplate } from "../../Generics.types";
import axios from "../../useAxios";
import { successToast, warningToast, infoToast } from "../../Components/";

export const authReducer = (state: State, action: AuthAction) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        expiresIn: action.payload.expiresIn,
        image: action.payload.image,
        isAdmin: action.payload.isAdmin,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        token: null,
        image: null,
        userName: null,
        expiresIn: null,
        isAdmin: null,
      };
    default:
      return state;
  }
};

export const signUpUser = async (
  userData: UserData,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>
) => {
  setLoading(true);
  try {
    const { data, status } = await axios.post<ResponseTemplate>(
      "/api/users/signup",
      userData
    );
    if (data.ok) {
      successToast("User Added Successfully");
      setCurrentPage("SIGNIN_PAGE");
      setLoading(false);
    } else {
      if (+status === 208) {
        infoToast("User already exists");
        infoToast("Please Try loging in");
      } else warningToast("Failed to add user");
      setLoading(false);
    }
  } catch (error) {
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
  }, expirationTime * 1000);
};

export const signOutUser = (
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  localStorage.clear();
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
      "/api/users/password",
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
      "/api/users/signin",
      emailAndPassword
    );
    if (ok) {
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
