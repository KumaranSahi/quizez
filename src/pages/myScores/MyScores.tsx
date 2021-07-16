import { useQuiz } from "../../store";
import {
  useMediaQuery,
  Button,
  HStack,
  useColorModeValue,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const MyScores = () => {
  const { myLeaderBoard } = useQuiz();
  const { push } = useHistory();
  const { getQuiz, setQuizLoading, dispatch: quizDispatch } = useQuiz();

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  const playQuiz = (quizId: string) => {
    getQuiz(quizId, quizDispatch, setQuizLoading, false);
    push("/rules");
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
        <Heading>My Top 10</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Quiz</Th>
              <Th align="right">Score</Th>
              <Th align="right">Play Again</Th>
            </Tr>
          </Thead>
          <Tbody>
            {myLeaderBoard.map(({ id, score, quizName, quizId }) => (
              <Tr key={id}>
                <Td>{quizName}</Td>
                <Td>{score}</Td>
                <Td>
                  <Button
                    color="teal"
                    variant="solid"
                    onClick={() => playQuiz(quizId!)}
                  >
                    Play Again
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </HStack>
  );
};
