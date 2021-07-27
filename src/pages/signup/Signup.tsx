import { useAuth } from "../../store";
import { SigninPages } from "../../store/authContext/auth.types";
import {
  SigninContainer,
  SignupContainer,
  ConfirmPasswordContainer,
} from "./signupComponents";
import { VStack, Flex, Text } from "@chakra-ui/react";

export const Signup = () => {
  const { currentPage, setCurrentPage, signInUser, dispatch, setAuthLoading } =
    useAuth();

  const pageToRender = (currentPage: SigninPages) => {
    switch (currentPage) {
      case "SIGNUP_PAGE":
        return <SignupContainer />;
      case "SIGNIN_PAGE":
        return <SigninContainer />;
      case "CHANGE_PASSWORD":
        return <ConfirmPasswordContainer />;
      default:
        return <SignupContainer />;
    }
  };

  const signinAsGuest = () => {
    signInUser(
      {
        email: "testuser@test.com",
        password: "testuser1",
      },
      dispatch,
      setAuthLoading
    );
  };

  return (
    <Flex width="100%" height="100%" justifyContent="center">
      <VStack boxShadow="dark-lg" borderRadius="2xl" padding="4">
        {pageToRender(currentPage)}
        <Text color="teal" onClick={signinAsGuest} cursor="pointer">
          Sign-in as guest
        </Text>
        {currentPage === "SIGNIN_PAGE" && (
          <Text
            color="teal"
            onClick={() => setCurrentPage("CHANGE_PASSWORD")}
            cursor="pointer"
          >
            Forgot Password
          </Text>
        )}
        {currentPage === "SIGNIN_PAGE" ? (
          <Text
            color="teal"
            onClick={() => setCurrentPage("SIGNUP_PAGE")}
            cursor="pointer"
          >
            New to Quizez? Sign up!
          </Text>
        ) : (
          <Text
            color="teal"
            onClick={() => setCurrentPage("SIGNIN_PAGE")}
            cursor="pointer"
          >
            Already have an Account? Sign In!
          </Text>
        )}
      </VStack>
    </Flex>
  );
};
