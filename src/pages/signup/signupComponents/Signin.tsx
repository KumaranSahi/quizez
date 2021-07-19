import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../store";
import { emailValidation } from "./utils";

export const SigninContainer = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser, dispatch, setAuthLoading, authLoading } = useAuth();

  return (
    <>
      <Heading color="teal" fontWeight="300">
        Sign In:
      </Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          signInUser(
            {
              email: values.email,
              password: values.password,
            },
            dispatch,
            setAuthLoading
          );
        }}
      >
        {(props) => (
          <Form>
            <Field name="email" validate={emailValidation}>
              {({ field, form: { errors, touched } }: FieldProps) => (
                <FormControl
                  isInvalid={(errors.email && touched.email) as boolean}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="email" />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form: { errors, touched } }: FieldProps) => (
                <FormControl
                  isInvalid={(errors.password && touched.password) as boolean}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      id="password"
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword((state) => !state)}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={authLoading}
              loadingText="Signing in"
              type="submit"
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
