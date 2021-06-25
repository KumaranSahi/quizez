import classes from "../Singup.module.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  Checkbox,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SignupContainerProps } from "../Signup.types";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const SignupContainer = ({
  image,
  fileUpload,
  fileUploadInfo,
  email,
  emailValid,
  password,
  userName,
  userNameValid,
  signUpSubmit,
  authLoading,
  isAdmin,
  signupDispatch,
}: SignupContainerProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <h1>Sign Up:</h1>
      <form className={classes["signup-container"]} onSubmit={signUpSubmit}>
        {image ? (
          <img
            src={image}
            alt="Profile"
            className={classes["profile-picture"]}
          />
        ) : (
          <div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={(event) => fileUpload(event.target.files)}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              <span className={classes["upload-profile-picture"]}>
                Upload Profile picture
              </span>
            </label>
            {fileUploadInfo && (
              <p className={classes["file-upload-info"]}>{fileUploadInfo}</p>
            )}
          </div>
        )}
        <div>
          <TextField
            label="Username"
            required
            fullWidth
            value={userName}
            onChange={(event) =>
              signupDispatch({
                type: "ADD_USERNAME",
                payload: event.target.value,
              })
            }
          />
          {!userNameValid && (
            <p className={classes["error-text"]}>
              Please enter a valid user name
            </p>
          )}
        </div>
        <div>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(event) =>
              signupDispatch({
                type: "ADD_EMAIL",
                payload: event.target.value,
              })
            }
          />
          {!emailValid && (
            <p className={classes["error-text"]}>Please enter a valid email</p>
          )}
        </div>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            className={classes["edit-form-element"]}
            required={true}
            value={password}
            onChange={(event) =>
              signupDispatch({
                type: "ADD_PASSWORD",
                payload: event.target.value,
              })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((state) => !state)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <label>
          <Checkbox
            onClick={() =>
              signupDispatch({
                type: "SET_IS_ADMIN",
                payload: !isAdmin,
              })
            }
            checked={isAdmin}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          Quiz Creator Account
        </label>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={authLoading}
        >
          Sign up!
        </Button>
      </form>
    </>
  );
};
