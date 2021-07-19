import { useAuth } from "../../store";
import { SigninPages } from "../../store/authContext/auth.types";
import {
  SigninContainer,
  SignupContainer,
  ConfirmPasswordContainer,
} from "./signupComponents";
import { VStack, Flex, Text } from "@chakra-ui/react";

export const Signup = () => {
  const { currentPage, setCurrentPage } = useAuth();

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

  return (
    <Flex width="100%" height="100%" justifyContent="center">
      <VStack boxShadow="dark-lg" borderRadius="2xl" padding="4">
        {pageToRender(currentPage)}
        {currentPage === "SIGNIN_PAGE" && (
          <Text color="teal" onClick={() => setCurrentPage("CHANGE_PASSWORD")}>
            Forgot Password
          </Text>
        )}
        {currentPage === "SIGNIN_PAGE" ? (
          <Text color="teal" onClick={() => setCurrentPage("SIGNUP_PAGE")}>
            New to Quizez? Sign up!
          </Text>
        ) : (
          <Text color="teal" onClick={() => setCurrentPage("SIGNIN_PAGE")}>
            Already have an Account? Sign In!
          </Text>
        )}
      </VStack>
    </Flex>
  );
};
