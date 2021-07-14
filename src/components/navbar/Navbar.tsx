import { UserAvatar } from "./avatar/Avatar";
import { useAuth } from "../../store";
import { useHistory } from "react-router-dom";
import {
  HStack,
  Heading,
  useColorModeValue,
  useColorMode,
  Box,
  Button,
} from "@chakra-ui/react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const { token } = useAuth();
  const { push } = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      padding="2"
      position="fixed"
      top="0%"
      width="100%"
      bg={useColorModeValue("white", "gray.900")}
      zIndex="banner"
    >
      <Heading color="teal" fontSize="1.8rem" onClick={() => push("/")}>
        QuizEz
      </Heading>
      <HStack>
        <Button onClick={toggleColorMode} borderRadius="full">
          {" "}
          {colorMode === "light" ? (
            <FontAwesomeIcon icon={faMoon} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="2x" />
          )}
        </Button>
        {token ? <UserAvatar /> : <Box></Box>}
      </HStack>
    </HStack>
  );
};
