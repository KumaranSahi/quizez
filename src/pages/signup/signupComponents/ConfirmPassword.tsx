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
import {
  emailValidation,
  passwordValidation,
  passwordChangeValidation,
} from "./utils";
import { useAuth } from "../../../store";
import { warningToast } from "../../../components";

export const ConfirmPasswordContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { changePassword, setAuthLoading, authLoading, setCurrentPage } =
    useAuth();

  return (
    <>
      <Heading color="teal" fontWeight="300">
        Change Password:
      </Heading>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          if (
            passwordChangeValidation(values.password, values.confirmPassword)
          ) {
            changePassword(
              {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
              },
              setAuthLoading,
              setCurrentPage
            );
          } else {
            warningToast("Please verify the passwords");
          }
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
            <Field name="password" validate={passwordValidation}>
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
            <Field name="confirmPassword" validate={passwordValidation}>
              {({ field, form: { errors, touched } }: FieldProps) => (
                <FormControl
                  isInvalid={
                    (errors.confirmPassword &&
                      touched.confirmPassword) as boolean
                  }
                >
                  <FormLabel htmlFor="confirmPassword">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      id="confirmPassword"
                      placeholder="Confirm password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() =>
                          setShowConfirmPassword((state) => !state)
                        }
                      >
                        {showConfirmPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={authLoading}
              loadingText="Changing password"
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
