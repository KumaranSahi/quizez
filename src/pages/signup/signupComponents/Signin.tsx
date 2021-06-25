import classes from "../Singup.module.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
} from "@material-ui/core";
import { SigninContainerProps } from "../Signup.types";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const SigninContainer = ({
  signInSubmit,
  signupDispatch,
  email,
  emailValid,
  password,
  authLoading,
}: SigninContainerProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <h1>Sign In:</h1>
      <form className={classes["signup-container"]} onSubmit={signInSubmit}>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={authLoading}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};
