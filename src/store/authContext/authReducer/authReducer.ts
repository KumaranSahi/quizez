import { State, AuthAction } from "../auth.types";

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
