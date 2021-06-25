import classes from "../Singup.module.css";
import { ConfirmPasswordContainerProps } from "../Signup.types";
import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const ConfirmPasswordContainer = ({
  email,
  password,
  confirmPassword,
  authLoading,
  changePasswordSubmit,
  signupDispatch,
}: ConfirmPasswordContainerProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <h1>Change Password:</h1>
      <form
        className={classes["signup-container"]}
        onSubmit={changePasswordSubmit}
      >
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
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            className={classes["edit-form-element"]}
            required={true}
            value={confirmPassword}
            onChange={(event) =>
              signupDispatch({
                type: "ADD_CONFIRM_PASSWORD",
                payload: event.target.value,
              })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword((state) => !state)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={authLoading}
        >
          Change Password
        </Button>
      </form>
    </>
  );
};
