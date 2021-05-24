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