import classes from "./Singup.module.css";
import { SyntheticEvent } from "react";
import { useAuth } from "../../store";
import { SigninPages } from "../../store/authContext/auth.types";
import { successToast, warningToast } from "../../components/";
import { useSignupReducer } from "./SignupReducer";
import axios from "axios";
import {
  SigninContainer,
  SignupContainer,
  ConfirmPasswordContainer,
} from "./signupComponents";

export const Signup = () => {
  const {
    signUpUser,
    currentPage,
    setCurrentPage,
    setAuthLoading,
    authLoading,
  } = useAuth();

  const {
    dispatch: signupDispatch,
    state: {
      email,
      emailValid,
      fileUploadInfo,
      image,
      isAdmin,
      password,
      userName,
      userNameValid,
    },
  } = useSignupReducer();

  const validateUserName = () => {
    if (userName.length === 0)
      signupDispatch({ type: "SET_USERNAME_VALID", payload: false });
    else signupDispatch({ type: "SET_USERNAME_VALID", payload: true });
  };

  const validateEmail = () => {
    if (
      email.length > 0 &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)
    )
      signupDispatch({ type: "SET_EMAIL_VALID", payload: true });
    else signupDispatch({ type: "SET_EMAIL_VALID", payload: false });
  };

  const fileUpload = async (file: FileList | null) => {
    const allowedExtensions = new RegExp("^.*(.jpg|.jpeg|.png)");
    if (
      file &&
      allowedExtensions.test(file[0].name.toLowerCase()) &&
      file[0].size <= 4000000
    ) {
      try {
        setAuthLoading(true);
        const data = new FormData();
        data.append("file", file[0]);
        data.append("upload_preset", "conclave");
        data.append("cloud_name", "conclave");
        const { data: imageData } = await axios.post(
          "https://api.cloudinary.com/v1_1/conclave/image/upload",
          data
        );
        signupDispatch({
          type: "ADD_IMAGE",
          payload: imageData.url,
        });
        setAuthLoading(false);
        successToast("Image uploaded successfully");
      } catch (error) {
        console.log(error);
        warningToast("Unable to upload image");
      }
    } else {
      signupDispatch({
        type: "SET_FILE_UPLOAD_INFO",
        payload: "Please upload a .jpg or .png file under 4mb",
      });
    }
  };

  const signUpSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    validateUserName();
    validateEmail();
    if (userNameValid && emailValid) {
      signUpUser(
        {
          name: userName,
          email: email,
          password: password,
          image: image,
          isAdmin: isAdmin,
        },
        setAuthLoading,
        setCurrentPage
      );
    }
  };

  const pageToRender = (currentPage: SigninPages) => {
    switch (currentPage) {
      case "SIGNUP_PAGE":
        return (
          <SignupContainer
            image={image}
            fileUpload={fileUpload}
            fileUploadInfo={fileUploadInfo}
            signUpSubmit={signUpSubmit}
            authLoading={authLoading}
            isAdmin={isAdmin}
            signupDispatch={signupDispatch}
            email={email}
            emailValid={emailValid}
            password={password}
            userName={userName}
            userNameValid={userNameValid}
          />
        );
      case "SIGNIN_PAGE":
        return <SigninContainer />;
      case "CHANGE_PASSWORD":
        return <ConfirmPasswordContainer />;
      default:
        return (
          <SignupContainer
            image={image}
            fileUpload={fileUpload}
            fileUploadInfo={fileUploadInfo}
            signUpSubmit={signUpSubmit}
            authLoading={authLoading}
            isAdmin={isAdmin}
            signupDispatch={signupDispatch}
            email={email}
            emailValid={emailValid}
            password={password}
            userName={userName}
            userNameValid={userNameValid}
          />
        );
    }
  };

  return (
    <div className={classes["signup-page-container"]}>
      <div className={classes["signin-signup-container"]}>
        {pageToRender(currentPage)}
        {currentPage === "SIGNIN_PAGE" && (
          <p
            className={classes["switch-page"]}
            onClick={() => setCurrentPage("CHANGE_PASSWORD")}
          >
            Forgot Password
          </p>
        )}
        {currentPage === "SIGNIN_PAGE" ? (
          <p
            className={classes["switch-page"]}
            onClick={() => setCurrentPage("SIGNUP_PAGE")}
          >
            New to Quizez? Sign up!
          </p>
        ) : (
          <p
            className={classes["switch-page"]}
            onClick={() => setCurrentPage("SIGNIN_PAGE")}
          >
            Already have an Account? Sign In!
          </p>
        )}
      </div>
    </div>
  );
};
