import classes from "../Singup.module.css";
import { TextField, Button, IconButton, Checkbox } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SignupContainerProps } from "../Signup.types";

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
            variant="outlined"
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
            variant="outlined"
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
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          fullWidth
          value={password}
          onChange={(event) =>
            signupDispatch({
              type: "ADD_PASSWORD",
              payload: event.target.value,
            })
          }
        />
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
