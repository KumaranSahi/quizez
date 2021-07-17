import { CreateQuizAndLeaderBoard } from "../../components";
import {
  useMediaQuery,
  HStack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

export const CreateQuizAndLeaderBoardPage = () => {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

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
        <CreateQuizAndLeaderBoard />
      </Box>
    </HStack>
  );
};
