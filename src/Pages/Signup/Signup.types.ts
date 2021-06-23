import { Dispatch, SyntheticEvent } from "react";

export type SignupInitialState = {
  userName: string;
  userNameValid: boolean;
  email: string;
  emailValid: boolean;
  password: string;
  confirmPassword: string;
  image: string;
  fileUploadInfo: string;
  isAdmin: boolean;
};

export type SignupAction =
  | { type: "ADD_EMAIL"; payload: string }
  | { type: "SET_EMAIL_VALID"; payload: boolean }
  | { type: "ADD_USERNAME"; payload: string }
  | { type: "SET_USERNAME_VALID"; payload: boolean }
  | { type: "ADD_PASSWORD"; payload: string }
  | { type: "ADD_CONFIRM_PASSWORD"; payload: string }
  | { type: "ADD_IMAGE"; payload: string }
  | { type: "SET_FILE_UPLOAD_INFO"; payload: string }
  | { type: "SET_IS_ADMIN"; payload: boolean };

export type SigninContainerProps = {
  signInSubmit: (event: SyntheticEvent) => void;
  signupDispatch: Dispatch<SignupAction>;
  email: string;
  emailValid: boolean;
  password: string;
  authLoading: boolean;
};

export type SignupContainerProps = {
  image: string;
  fileUpload: (file: FileList | null) => void;
  fileUploadInfo: string;
  email: string;
  emailValid: boolean;
  password: string;
  userName: string;
  userNameValid: boolean;
  signUpSubmit: (event: SyntheticEvent) => void;
  authLoading: boolean;
  isAdmin: boolean;
  signupDispatch: Dispatch<SignupAction>;
};

export type ConfirmPasswordContainerProps = {
  email: string;
  password: string;
  confirmPassword: string;
  authLoading: boolean;
  changePasswordSubmit: (event: SyntheticEvent) => void;
  signupDispatch: Dispatch<SignupAction>;
};
