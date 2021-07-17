import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useMediaQuery,
  Heading,
  Image,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuiz, useAuth } from "../../store";
import { successToast, warningToast, Spinner } from "../../components";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { nameValidation } from "./utils";

export const CreateQuiz = () => {
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const { userName } = useAuth();
  const { setQuizLoading, quizLoading, createQuiz, dispatch } = useQuiz();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const { push } = useHistory();

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
        const someData = await fetch(
          "https://api.cloudinary.com/v1_1/conclave/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const imageData = await someData.json();
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

  const quizNameEntered = ({
    name,
    setValue,
  }: {
    name: string;
    setValue: any;
  }) => {
    setValue("quizName", name);
    setValue("quizDescription", `${userName}'s quiz on ${name}`);
  };

  return (
    <HStack
      width="100%"
      height="100%"
      justifyContent="center"
      bg={useColorModeValue("lightgray", "gray.800")}
    >
      <Box
        width={isLargerThan700 ? "40rem" : "100%"}
        minHeight="90vh"
        textAlign="center"
        padding="1rem"
        bg={useColorModeValue("white", "gray.900")}
      >
        <Heading marginBottom="1rem" color="teal">Create your quiz!</Heading>
        <Formik
          initialValues={{
            quizName: "",
            quizDescription: "",
            image: "",
          }}
          onSubmit={async (values) => {
            const id = await createQuiz(
              {
                name: values.quizName,
                description: values.quizDescription,
                image: values.image,
              },
              setQuizLoading,
              dispatch
            );
            if (id) {
              push({ pathname: "/edit-quiz", search: id });
            }
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
              <Field name="quizName" validate={nameValidation}>
                {({ field, form: { errors, touched } }: FieldProps) => (
                  <FormControl
                    isInvalid={(errors.email && touched.email) as boolean}
                  >
                    <FormLabel htmlFor="quizName">Quiz name</FormLabel>
                    <Input
                      {...field}
                      onChange={(event) =>
                        quizNameEntered({
                          name: event.target.value,
                          setValue: setFieldValue,
                        })
                      }
                      id="quizName"
                      placeholder="Quiz name"
                    />
                    <FormErrorMessage>{errors.quizName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="quizDescription">
                {({ field, form: { errors, touched } }: FieldProps) => (
                  <FormControl
                    isInvalid={(errors.email && touched.email) as boolean}
                  >
                    <FormLabel htmlFor="quizDescription">
                      Quiz Description
                    </FormLabel>
                    <Textarea
                      {...field}
                      id="quizDescription"
                      placeholder="Quiz Description"
                    />
                    <FormErrorMessage>
                      {errors.quizDescription}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                size="lg"
                width="100%"
                marginTop="1rem"
                variant="solid"
                color="teal"
                isLoading={quizLoading}
                loadingText="Creating Quiz"
              >
                Create Quiz
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      {imageUploadLoading && <Spinner />}
    </HStack>
  );
};
