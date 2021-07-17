import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Heading,
  Checkbox,
  Image,
  Box,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../../../store";
import { emailValidation, passwordValidation, nameValidation } from "./utils";
import axios from "axios";
import { warningToast, successToast, Spinner } from "../../../components";

export const SignupContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const { signUpUser, setCurrentPage, authLoading, setAuthLoading } = useAuth();

  const fileUpload = async ({
    file,
    setImage,
  }: {
    file: FileList | null;
    setImage: any;
  }) => {
    const allowedExtensions = new RegExp("^.*(.jpg|.jpeg|.png)");
    if (
      file &&
      allowedExtensions.test(file[0].name.toLowerCase()) &&
      file[0].size <= 4000000
    ) {
      try {
        setImageUploadLoading(true);
        const data = new FormData();
        data.append("file", file[0]);
        data.append("upload_preset", "conclave");
        data.append("cloud_name", "conclave");
        const { data: imageData } = await axios.post(
          "https://api.cloudinary.com/v1_1/conclave/image/upload",
          data
        );
        setImage("image", imageData.url);
        setImageUploadLoading(false);
        successToast("Image uploaded successfully");
      } catch (error) {
        console.log(error);
        warningToast("Unable to upload image");
      }
    } else {
      warningToast("Please upload a .jpg or .png file under 4mb");
    }
  };

  return (
    <>
      <Heading color="teal" fontWeight="300" marginBottom="1rem">
        Sign Up:
      </Heading>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          image: "",
          isAdmin: false,
        }}
        onSubmit={(values) => {
          signUpUser(
            {
              name: values.name,
              email: values.email,
              password: values.password,
              image: values.image.length > 0 ? values.image : undefined,
              isAdmin: values.isAdmin,
            },
            setAuthLoading,
            setCurrentPage
          );
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field name="image">
              {({ form: { errors, touched } }: FieldProps) =>
                values.image ? (
                  <Image
                    src={values.image}
                    alt="Profile"
                    height="5rem"
                    width="5rem"
                    borderRadius="full"
                    margin="auto"
                  />
                ) : (
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      onChange={(event) => {
                        fileUpload({
                          file: event.target.files,
                          setImage: setFieldValue,
                        });
                      }}
                    />
                    <label
                      htmlFor="icon-button-file"
                      style={{
                        color: "teal",
                        marginTop: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCamera}
                        style={{ fontSize: "larger" }}
                      />
                      Upload Profile picture
                    </label>
                  </Box>
                )
              }
            </Field>
            <Field name="name" validate={nameValidation}>
              {({ field, form: { errors, touched } }: FieldProps) => (
                <FormControl
                  isInvalid={(errors.email && touched.email) as boolean}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
            <Field name="isAdmin">
              {({ form: { errors, touched } }: FieldProps) => (
                <FormControl
                  isInvalid={(errors.isAdmin && touched.isAdmin) as boolean}
                >
                  <Checkbox
                    colorScheme="teal"
                    onClick={() => setFieldValue("isAdmin", !values.isAdmin)}
                    checked={values.isAdmin}
                    marginTop="1rem"
                  >
                    Quiz Creator Account
                  </Checkbox>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={authLoading}
              type="submit"
              disabled={imageUploadLoading}
              loadingText="Signing up"
            >
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
      {imageUploadLoading && <Spinner />}
    </>
  );
};
