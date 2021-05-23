import { ReactNode, Dispatch, SetStateAction } from "react";

export type Props = {
  children?: ReactNode;
};

export type AuthContextType = {
  userId: string;
  token: string;
  userName: string;
  image: string;
  signUpUser: (
    userData: UserData,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setCurrentPage: Dispatch<SetStateAction<SigninPages>>
  ) => void;
  signInUser: (
    emailAndPassword: SigninUser,
    dispatch: Dispatch<AuthAction>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  signOutUser: (
    dispatch: Dispatch<AuthAction>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  currentPage: SigninPages;
  changePassword: (
    userData: ChangePassword,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>;
  authLoading: boolean;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<AuthAction>;
  isAdmin: string;
};

export type State = {
  userId: string | null;
  token: string | null;
  userName: string | null;
  expiresIn: Date | null;
  image?: string | null;
  isAdmin?: string | null;
};

export type AuthAction =
  | { type: "SIGNIN_USER"; payload: State }
  | { type: "SIGNOUT_USER" };

export type SigninPages = "SIGNIN_PAGE" | "SIGNUP_PAGE" | "CHANGE_PASSWORD";

export type UserData = {
  name: string;
  email: string;
  password: string;
  image?: string;
  isAdmin?: boolean;
};

export type SigninUser = {
  email: string;
  password: string;
};

export type ChangePassword = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignedInUserInfo = {
  token: string;
  userId: string;
  userName: string;
  expiresIn: Date;
  image?: string;
  isAdmin?: string;
};
