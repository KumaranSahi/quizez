import {
  useContext,
  createContext,
  useReducer,
  FC,
  useState,
  useEffect,
} from "react";
import { Props, State, SigninPages, AuthContextType } from "./auth.types";
import {
  signUpUser,
  signOutUser,
  changePassword,
  onReload,
  signInUser,
} from "./authMethods";
import { authReducer } from "./authReducer/authReducer";
import { setupAuthHeaderForServiceCalls } from "../../axiosUtils";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const initialState: State = {
  token: null,
  userName: null,
  expiresIn: null,
  image: null,
  isAdmin: null,
};

export const AuthContextProvider: FC = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<SigninPages>("SIGNIN_PAGE");

  const [state, dispatch] = useReducer(authReducer, initialState);

  const token = localStorage.getItem("token");
  setupAuthHeaderForServiceCalls(token!);

  useEffect(() => {
    onReload(dispatch, setLoading);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        userName: state.userName,
        image: state.image,
        signUpUser: signUpUser,
        signInUser: signInUser,
        signOutUser: signOutUser,
        currentPage: currentPage,
        changePassword: changePassword,
        setCurrentPage: setCurrentPage,
        authLoading: loading,
        setAuthLoading: setLoading,
        dispatch: dispatch,
        isAdmin: state.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
